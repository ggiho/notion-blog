import Detail from "@containers/Detail"
import { filterPosts } from "@/src/libs/utils/notion"
import Layout from "@components/Layout"
import CONFIG from "@/site.config"
import { NextPageWithLayout } from "@pages/_app"
import { TPost } from "../types"
import CustomError from "@containers/CustomError"
import { getPostBlocks, getPosts } from "@libs/apis"

export async function getStaticPaths() {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, {
    acceptStatus: ["Public", "PublicOnDetail"],
    acceptType: ["Paper", "Post", "Page"],
  })

  return {
    paths: filteredPost.map((row) => `/${row.slug}`),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    //includePages: true
    const posts = await getPosts()
    const post = posts.find((t) => t.slug === slug)
    if (!post?.id) {
      return {
        notFound: true,
      }
    }
    const blockMap = await getPostBlocks(post.id)

    return {
      props: { post, blockMap },
      revalidate: 3600, // 1시간마다 자동 재검증
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 60, // 60초마다 자동 재검증
    }
  }
}

type Props = {
  post: TPost
  blockMap: any
}

const DetailPage: NextPageWithLayout<Props> = ({ post, blockMap }) => {
  if (!post) return <CustomError />
  return <Detail blockMap={blockMap} data={post} />
}

DetailPage.getLayout = function getlayout(page: any) {
  const getImage = () => {
    if (page.props?.post?.thumbnail) return page.props?.post.thumbnail
    if (CONFIG.ogImageGenerateURL && page.props?.post?.title)
      return `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(
        page.props?.post.title
      )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnotion_blog.vercel.app%2Flogo-for-dark-bg.svg`
  }

  const getMetaConfig = () => {
    if (!page.props?.post) {
      return {
        title: CONFIG.blog.title,
        description: CONFIG.blog.description,
        type: "website",
        url: CONFIG.link,
      }
    }
    return {
      title: page.props?.post?.title || CONFIG.blog.title,
      date: new Date(
        page.props?.post?.date?.start_date || page.props?.post?.createdTime || ""
      ).toISOString(),
      image: getImage(),
      description: page.props?.post?.summary,
      type: page.props?.post?.type?.[0] || "website",
      url: `${CONFIG.link}/${page.props?.post?.slug || ""}`,
    }
  }
  return (
    <Layout metaConfig={getMetaConfig()} fullWidth={true}>
      {page}
    </Layout>
  )
}

export default DetailPage

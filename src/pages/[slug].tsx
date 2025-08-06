import Detail from "@containers/Detail"
import { filterPosts } from "@/src/libs/utils/notion"
import Layout from "@components/Layout"
import CONFIG from "@/site.config"
import { NextPageWithLayout } from "@pages/_app"
import { TPost } from "../types"
import CustomError from "@containers/CustomError"
import { getPostBlocks, getPosts } from "@libs/apis"
import { useRouter } from "next/router"

export async function getStaticPaths() {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, {
    acceptStatus: ["Public", "PublicOnDetail"],
    acceptType: ["Paper", "Post", "Page"],
  })

  return {
    paths: filteredPost.map((row) => `/${row.slug}`),
    fallback: true, // 'blocking'에서 true로 변경
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
      revalidate: 60, // 1분마다 재검증으로 변경 (더 자주 업데이트)
    }
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error)
    return {
      notFound: true, // 에러 시 404 페이지로 리다이렉트
      revalidate: 10, // 10초 후 재시도
    }
  }
}

type Props = {
  post: TPost
  blockMap: any
}

const DetailPage: NextPageWithLayout<Props> = ({ post, blockMap }) => {
  // fallback 상태 처리
  const router = useRouter()
  
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!post || !blockMap) return <CustomError />
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

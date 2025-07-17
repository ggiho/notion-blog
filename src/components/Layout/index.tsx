import Header from "./Header"
import MetaConfig, { MetaConfigProps } from "./MetaConfig"

type Props = {
  children: React.ReactNode
  metaConfig: MetaConfigProps
  fullWidth?: boolean
}

const Layout: React.FC<Props> = ({
  children,
  metaConfig,
  fullWidth = false,
}) => {
  return (
    <div>
      <MetaConfig {...metaConfig} />
      <div className={`wrapper`}>
        {metaConfig.type !== "Paper" && <Header fullWidth={fullWidth} />}
        <main
          className={`flex-grow w-full transition-all ${
            metaConfig.type !== "Paper" ? "pt-16" : "py-10"
          } ${fullWidth ? "" : "container"}`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

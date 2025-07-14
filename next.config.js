module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        http2: false,
        stream: false,
        crypto: false,
        path: false,
        os: false,
        zlib: false,
        querystring: false,
      }
    }
    return config
  },
}

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
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
        http: false,
        https: false,
        url: false,
        assert: false,
        buffer: false,
        util: false,
        events: false,
      }
      
      // Replace problematic modules with empty modules on client side
      config.resolve.alias = {
        ...config.resolve.alias,
        '@szmarczak/http-timer': false,
        'cacheable-request': false,
        'got': false,
      }
    }
    return config
  },
}

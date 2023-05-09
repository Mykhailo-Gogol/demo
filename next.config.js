/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.ctfassets.net",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
  },
};

module.exports = nextConfig;

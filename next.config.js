/** @type {import('next').NextConfig} */

require('dotenv').config(); 
const path = require('path')

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Defina como "false" para redirecionamento temporário
      },
    ];
  },
  env: {
    API: process.env.API
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig

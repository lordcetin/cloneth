/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  scope: '/',
  sw: 'sw.js',
  // dynamicStartUrl: false,
  // runtimeCaching: [
  //   {
  //     urlPattern: /^https?.*/,
  //     handler: 'NetworkFirst',
  //     options: {
  //       cacheName: 'offlineCache',
  //       expiration: {
  //         maxEntries: 200,
  //       },
  //     },
  //   },
  // ],

})

module.exports = withPWA({
  reactStrictMode: true

})
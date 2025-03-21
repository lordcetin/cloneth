/* eslint-disable @typescript-eslint/no-require-imports */

const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',  // Service worker ve manifest dosyasının bu dizine yerleştirileceği yer
    disable: process.env.NODE_ENV === 'development',  // Geliştirme ortamında devre dışı bırakmak
  },
  reactStrictMode: true, // React Strict mode'u etkinleştirmek
});

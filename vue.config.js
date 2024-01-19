const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'localhost',
      'istrac.nextbrave.net',
      'www.rutazz.com',
    ],
  },
})

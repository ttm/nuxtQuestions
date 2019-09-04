export default {
  // server : {
  //   port: 80
  // },
  modules: [
    '@nuxtjs/vuetify'
  ],
  build: {
  },
  plugins: [
    {
      src: '~/plugins/pixiPlug',
      ssr: false
      // mode: 'client'
    }
  ]
}

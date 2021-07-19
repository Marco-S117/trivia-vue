export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Live server config
  server: {
    port: 8080,
    host: '0.0.0.0'
  },

  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Trivia Vue',
    title: 'Trivia Vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A simple PWA trivia made with Nuxt Js.' },
      { hid: 'author', property: 'author', name: 'author', content: 'Marco Polino' },
      { hid: 'og:type', property: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', name: 'og:site_name', content: 'Marco Polino Portfolio' },
      { hid: 'og:title', property: 'og:title', name: 'og:title', content: 'Marco Polino Portfolio' },
      { hid: 'og:description', property: 'og:description', name: 'og:description', content: 'A simple PWA trivia made with Nuxt Js.' },
      { hid: 'og:url', property: 'og:url', name: 'og:url', content: 'https://trivia-vue-js.web.app' },
      { hid: 'og:image', property: 'og:image', name: 'og:image', content: 'https://trivia-vue-js.web.app/trivia-og-image.jpg' },
      { hid: 'ogimagetype', property: 'og:image:type', content: 'image/jpeg' },
      { hid: 'ogimageheight', property: 'og:image:width', content: '1200' },
      { hid: 'ogimagewidth', property: 'og:image:height', content: '675' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/firebase.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      /* icon options */
      source: 'static/icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      targetDir: 'icons',
      purpose: ['any', 'maskable']
    },
    manifest: {
      name: 'Trivia Vue',
      short_name: 'Trivia Vue',
      description: 'A simple PWA trivia made with Nuxt Js.',
      display: 'standalone',
      background_color: '#8bc34a',
      theme_color: '#8bc34a',
      lang: 'en',
      useWebmanifestExtension: false,
    },
    meta: {
      /* meta options */
      nativeUI: true,
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: '#dc2626',
      favicon: 'favicon.ico',
      name: 'Trivia Vue',
      author: 'Marco Polino',
      description: 'A simple PWA trivia made with Nuxt Js.',
      lang: 'it',
      ogType: 'website',
      ogSiteName: 'Trivia Vue',
      ogTitle: 'Trivia Vue',
      ogDescription: 'A simple PWA trivia made with Nuxt Js.',
      ogHost: 'https://trivia-vue-js.web.app/',
      ogUrl: 'https://trivia-vue-js.web.app/',
      ogImage: 'https://trivia-vue-js.web.app/trivia-og-image.jpg'
    },
    workbox: {
      // /* workbox options */
      // enabled: false // enable to test PWA on localhost, disable for prod
    }
  },

  apollo: {
    clientConfigs: {
      default: '~/confs/apollo/apollo.conf.js'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    defaultAssets: {
      icons: "mdi",
    },
    customVariables: ['~/assets/scss/variables.scss'],
    optionsPath: '~/confs/vuetify/vuetify.conf.js',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  },

  // Page transition
  pageTransition: {
    name: 'fade-transition',
    mode: 'out-in'
  },

  // Preloader and page loading
  loadingIndicator: {
    name: 'three-bounce',
    color: '#cddc39',
    background: '#333'
  },

  loading: '~/components/Loading.vue'
}

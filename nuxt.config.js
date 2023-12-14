export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'thitructuyen(user)',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/ExamByTeacher/DetailExam/Question.vue',
    '~/components/ExamByTeacher/DetailExam/List/ListQuestions.vue',
    '~/components/ExerciseByTeacher/DetailExercise/Question.vue',
    '~/components/ExerciseByTeacher/DetailExercise/List/ListQuestions.vue',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  layout: ['authLayout', 'error'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api/web',
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_UPLOAD: process.env.BASE_URL_UPLOAD,
  },

  router: {
    middleware: 'authentication',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 4000, // Cổng lắng nghe cho dự án này
  },
}

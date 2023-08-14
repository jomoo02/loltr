// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'loltr',
      meta: [
        { name: 'description', content: "lol관련 정보를 보여줍니다." },
        { name:  'viewport', content: "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" },
      ]
    }
  },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    API_KEY: process.env.API_KEY,
    URL_SUMMONER: process.env.URL_SUMMONER,
    URL_MATCHS_PUUID: process.env.URL_MATCHS_PUUID,
    URL_MATCHS: process.env.URL_MATCHS,
    URL_LEAGUE: process.env.URL_LEAGUE,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],

})

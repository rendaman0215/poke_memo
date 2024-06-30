import { publicRuntimeConfig } from "./nuxt.runtime.config";
import { viteCssConfig } from "./nuxt.css.config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "ポケメモ | 忘れやすいあなたのためのポケモン対戦のメモ帳",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "忘れやすいあなたのためのポケモン対戦のメモ帳",
        },
        {
          property: "og:title",
          content: "ポケメモ | 忘れやすいあなたのためのポケモン対戦のメモ帳",
        },
        {
          property: "og:description",
          content: "忘れやすいあなたのためのポケモン対戦のメモ帳",
        },
        { property: "og:image", content: "/ogp.png" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  devtools: { enabled: true },
  srcDir: "src/",
  vite: {
    css: viteCssConfig,
    server: {
      proxy: {
        "/api/": {
          target:
            "https://api.battle.pokemon-home.com/cbd/competition/rankmatch",
          secure: false,
        },
      },
    },
  },
  css: [
    "/assets/styles/base.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ["@nuxtjs/google-fonts", "nuxt-gtag"],
  googleFonts: {
    families: {
      "Noto Sans JP": [100, 400, 500, 700, 900],
      "M PLUS 1": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  gtag: {
    id: "G-MGG0ZKW5YB",
  },
  imports: {
    dirs: ["models/**", "composables/**", "utils/**"],
  },
  runtimeConfig: {
    public: publicRuntimeConfig,
  },
});

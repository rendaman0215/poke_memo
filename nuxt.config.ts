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
      ],
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
  plugins: ["~/plugins/pokenode.ts"],
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
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Noto Sans JP": [100, 400, 500, 700, 900],
    },
  },
  imports: {
    dirs: ["models/**", "composables/**", "utils/**"],
  },
  runtimeConfig: {
    public: publicRuntimeConfig,
  },
});

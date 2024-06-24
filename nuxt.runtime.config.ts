const appEnv = process.env.NUXT_APP_ENV || "development";

const APIURL = "https://resource.pokemon-home.com/battledata";

export const publicRuntimeConfig = {
  appEnv,
  APIURL,
};

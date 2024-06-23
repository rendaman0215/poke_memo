const appEnv = process.env.NUXT_APP_ENV || "development";

const APIURL =
  appEnv === "production"
    ? "https://asia-northeast1-ryuzu-d489b.cloudfunctions.net"
    : "http://localhost:5001/ryuzu-d489b/asia-northeast1";

export const publicRuntimeConfig = {
  appEnv,
  APIURL,
};

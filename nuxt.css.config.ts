import type { ViteConfig } from "nuxt/schema";

export const viteCssConfig: NonNullable<ViteConfig["css"]> = {
  preprocessorOptions: {
    scss: {
      additionalData: `
          @import "@/assets/styles/main.scss";
        `,
    },
  },
};

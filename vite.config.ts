import netlify from "@netlify/vite-plugin-tanstack-start";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  plugins: [netlify()],

  // Netlify's plugin wraps the plain Vite SSR bundle in `dist/server` as a
  // Netlify function, so the Cloudflare/nitro deploy build must stay off.
  nitro: false,

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});

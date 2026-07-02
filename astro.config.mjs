import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  adapter: vercel(),
  env: {
    schema: {
      KV_REST_API_READ_ONLY_TOKEN: envField.string({
        access: "secret",
        context: "server",
        mode: "required",
      }),
      KV_REST_API_TOKEN: envField.string({
        access: "secret",
        context: "server",
        mode: "required",
      }),
      KV_REST_API_URL: envField.string({
        access: "secret",
        context: "server",
        mode: "required",
      }),
    },
  },
  image: {
    layout: "constrained",
  },
  integrations: [react()],
  output: "server",
  vite: {
    build: {
      sourcemap: false,
    },
    plugins: [tailwindcss()],
  },
});

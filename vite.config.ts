import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const client = defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "src/render.client.ts",
    },
  },
});

const server = defineConfig(async () => {
  return {
    plugins: [react()],
    ssr: {
      noExternal: true,
      target: "webworker",
    },
    build: {
      ssr: true,
      minify: false,
      emptyOutDir: false,
      outDir: "netlify/edge-functions",
      rollupOptions: {
        input: "src/page.tsx",
        output: {
          inlineDynamicImports: true,
          entryFileNames: "page.js",
        },
      },
    },
  };
});

export default Boolean(process.env.SSR) ? server : client;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glob from "fast-glob";

const handlers = await glob("./src/handlers/**/*.(ts|tsx)");

console.log(handlers);

const client = defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "src/render.client.ts",
    },
  },
});

const server = defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: true,
    target: "webworker",
  },
  build: {
    ssr: true,
    outDir: "netlify/dist",
    rollupOptions: {
      input: handlers,
      output: {
        entryFileNames: "edge-functions/[name].js",
        chunkFileNames: "assets/[name].js",
      },
    },
  },
});

export default Boolean(process.env.SSR) ? server : client;

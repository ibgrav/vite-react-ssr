import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SSR = Boolean(process.env.SSR);

export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: true,
    target: "webworker",
  },
  build: {
    ssr: SSR,
    manifest: !SSR,
    outDir: SSR ? "netlify/edge-functions" : "dist",
    rollupOptions: {
      input: SSR ? "src/handler.tsx" : "src/render.client.tsx",
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});

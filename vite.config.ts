import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SSR = Boolean(process.env.SSR);

export default defineConfig({
  plugins: [react()],
  // ssr: {
  //   noExternal: true,
  //   target: "webworker",
  // },
  build: {
    // ssr: SSR,
    manifest: !SSR,
    outDir: SSR ? "netlify/dist" : "dist",
    rollupOptions: {
      input: SSR ? "src/Render.tsx" : "src/render.client.tsx",
      external: SSR ? ["react", "react/jsx-runtime"] : [],
    },
  },
});

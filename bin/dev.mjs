//@ts-check

import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";

const root = process.cwd();
const port = Number(process.env.PORT || "4000");

const vite = await createViteServer({
  appType: "custom",
  server: { middlewareMode: true },
});

const server = createHttpServer((req, res) => {
  vite.middlewares(req, res, async () => {
    try {
      let template = await readFile(resolve(root, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(req.url || "/", template);

      /** @type {import('../src/render.server')['renderServer']} */
      const renderServer = (await vite.ssrLoadModule("/src/render.server.tsx")).renderServer;

      renderServer(res, template);
    } catch (e) {
      console.error(e);
    }
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`\nhttp://localhost:${port}/\n`);
});

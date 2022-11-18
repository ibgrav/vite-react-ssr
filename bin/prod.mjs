//@ts-check

import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { default as sirv } from "sirv";
import { renderServer } from "../dist/server/render.server.js";

const root = process.cwd();
const dist = resolve(root, "dist/client");
const port = Number(process.env.PORT || "4000");

const template = await readFile(resolve(dist, "index.html"), "utf-8");

const assets = sirv(dist, {
  maxAge: 31536000,
  immutable: true,
  extensions: [],
});

const server = createServer((req, res) => {
  assets(req, res, async () => {
    try {
      await renderServer(res, template);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end("server error");
    }
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`\nhttp://localhost:${port}/\n`);
});

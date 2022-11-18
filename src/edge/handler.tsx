import React from "react";
import { Context } from "netlify:edge";
import { renderToReadableStream } from "react-dom/server";
import { Render } from "./Render.tsx";

import manifest from "../../dist/manifest.json" assert { type: "json" };

const entry = "src/render.client.tsx";
const script = manifest?.[entry]?.file || entry;
const styles = manifest?.[entry]?.css?.[0];

const props: Record<string, unknown> = {
  site: { title: "Next.js Site! Change 2" },
  page: {
    components: [
      {
        title: "Accordion",
        props: {
          title: "Optional Title",
          link: { title: "More like this", href: "#more" },
          items: [
            {
              title: "Accordion Item 1",
              children: "accordion child",
            },
            {
              title: "Accordion Item 2",
              children: "accordion child",
            },
            {
              title: "Accordion Item 3",
              children: "accordion child",
            },
            {
              title: "Accordion Item 4",
              children: "accordion child",
            },
          ],
        },
      },
    ],
  },
};

export default async function handler(req: Request, context: Context) {
  const stream = await renderToReadableStream(
    <html lang="en">
      <head>
        <title>Hello 1</title>
        {styles && <link rel="stylesheet" href={`/${styles}`} />}
      </head>
      <body>
        <div id="root">
          <Render {...props} />
        </div>

        <script dangerouslySetInnerHTML={{ __html: `window.DS_PROPS=${JSON.stringify(props)};` }}></script>
        <script type="module" src={`/${script}`}></script>
      </body>
    </html>
  );

  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

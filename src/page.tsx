import type { Context } from "@netlify/edge-functions";
import type { DesignSystemServerProps } from "@harvard-hbs/webdev-design-system/dist/components/system/design-system/use-design-system-context";
import { renderToReadableStream } from "react-dom/server";

import { Document } from "./Document"; //@ts-ignore
import manifest from "../dist/manifest.json";

const props: DesignSystemServerProps = {
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
  if (["js", "css", "woff"].some((ext) => req.url.includes(`.${ext}`))) {
    return;
  }

  const stream = await renderToReadableStream(<Document manifest={manifest} props={props} />);

  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/html" },
  });
}

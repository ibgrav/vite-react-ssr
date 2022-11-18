import type { DesignSystemServerProps } from "@harvard-hbs/webdev-design-system/dist/components/system/design-system/use-design-system-context";
import type { Manifest } from "vite";
import { Render } from "./Render";

interface DocumentProps {
  manifest: Manifest;
  props: DesignSystemServerProps;
}

export function Document({ manifest, props }: DocumentProps) {
  const entry = "src/render.client.tsx";
  const script = manifest?.[entry]?.file || entry;
  const styles = manifest?.[entry]?.css?.[0];

  return (
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
}

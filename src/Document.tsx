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
  const assets = manifest?.[entry]?.assets;

  const fonts = assets?.filter((path) => {
    return ["graphik-regular", "graphik-semibold", "graphik-bold"].some((name) => path.startsWith(`assets/${name}.`));
  });

  return (
    <html lang="en">
      <head>
        <title>Hello 1</title>
        {styles && (
          <>
            <link rel="preload" href={`/${styles}`} as="style" crossOrigin="anonymous" />

            {fonts?.map((font) => (
              <link rel="preload" href={`/${font}`} as="font" type="font/woff" crossOrigin="anonymous" />
            ))}

            <link rel="stylesheet" href={`/${styles}`} crossOrigin="anonymous" />
          </>
        )}
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

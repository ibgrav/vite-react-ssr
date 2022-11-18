import type { DesignSystemServerProps } from "@harvard-hbs/webdev-design-system/dist/components/system/design-system/use-design-system-context";
import "@harvard-hbs/webdev-design-system/style.css";

const element = document.querySelector<HTMLElement>("#root");

declare global {
  interface Window {
    DS_PROPS: DesignSystemServerProps;
  }
}

if (element) {
  import("react-dom/client").then(async ({ hydrateRoot }) => {
    const { Render } = await import("./Render");
    hydrateRoot(element, Render(window.DS_PROPS));
  });
}

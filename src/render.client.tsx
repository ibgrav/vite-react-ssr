import { hydrateRoot } from "react-dom/client";
import type { DesignSystemServerProps } from "@harvard-hbs/webdev-design-system/dist/components/system/design-system/use-design-system-context";
import "@harvard-hbs/webdev-design-system/style.css";
import { Render } from "./Render";

const element = document.querySelector<HTMLElement>("#root");

declare global {
  interface Window {
    DS_PROPS: DesignSystemServerProps;
  }
}

if (element) {
  hydrateRoot(element, <Render {...window.DS_PROPS} />);
}

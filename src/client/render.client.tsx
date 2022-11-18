import { hydrateRoot } from "react-dom/client";
import { StrictMode, Suspense } from "react";
import type { DesignSystemServerProps } from "@harvard-hbs/webdev-design-system/dist/components/system/design-system/use-design-system-context";
import { DesignSystem } from "@harvard-hbs/webdev-design-system";
import "@harvard-hbs/webdev-design-system/style.css";

const element = document.querySelector<HTMLElement>("#root");

declare global {
  interface Window {
    DS_PROPS: DesignSystemServerProps;
  }
}

if (element) {
  hydrateRoot(
    element,
    <StrictMode>
      <Suspense>
        <DesignSystem framework={{}} children={null} {...window.DS_PROPS} />
      </Suspense>
    </StrictMode>
  );
}

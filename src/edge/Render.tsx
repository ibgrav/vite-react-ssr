import React, { StrictMode, Suspense } from "react";
import { DesignSystem } from "@harvard-hbs/webdev-design-system/dist/index.mjs";

export function Render(props: Record<string, unknown>) {
  return (
    <StrictMode>
      <Suspense>
        <DesignSystem framework={{}} children={null} {...props} />
      </Suspense>
    </StrictMode>
  );
}

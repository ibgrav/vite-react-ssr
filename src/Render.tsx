import { StrictMode, Suspense } from "react";
import { DesignSystem } from "@harvard-hbs/webdev-design-system";
import { DesignSystemServerProps } from "@harvard-hbs/webdev-design-system/dist/components/system/design-system/use-design-system-context";

export function Render(props: DesignSystemServerProps) {
  return (
    <StrictMode>
      <Suspense>
        <DesignSystem framework={{}} children={null} {...props} />
      </Suspense>
    </StrictMode>
  );
}

import { ComponentPropsWithoutRef } from "react";

export type TemplateProps = {
  // Props here
} & ComponentPropsWithoutRef<"div">;

export function Template({ children, className, ...props }: TemplateProps) {
  return (
    <div
      className={[
        className, //External classes passed to the component
        "", // Add global classes here
      ]
        .filter(Boolean) // Remove Empty strings
        .join(" ")}
      {...props}>
      {children}
    </div>
  );
}

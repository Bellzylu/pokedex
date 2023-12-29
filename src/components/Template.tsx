import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/styles/utils";

export type TemplateProps = {
  // <- Props here
} & ComponentPropsWithoutRef<"div">;

export function Template({ children, className, ...props }: TemplateProps) {
  return (
    <div
      className={cn(
        "", // <- Base style here
        className
      )}
      {...props}>
      {children}
    </div>
  );
}

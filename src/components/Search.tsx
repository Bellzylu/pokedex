import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/styles/utils";

export type SearchProps = {
  inputProps?: ComponentPropsWithoutRef<"input">;
  onSubmit?: (value: string) => void;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export const Search = forwardRef<HTMLFormElement, SearchProps>(function Search(
  { children, className, inputProps, onSubmit, ...props },
  ref
) {
  return (
    <form
      ref={ref}
      className={cn("flex justify-center relative max-w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const inputElement = e.currentTarget.querySelector("input");
        onSubmit?.(inputElement?.value ?? "");
      }}
      {...props}>
      <input
        type="search"
        className="border-none outline-none bg-[#FEF3EC] w-[105%] p-1 m-0 shadow-lg "
        placeholder=" Search Pokémon..."
        {...inputProps}>
        {children}
      </input>
    </form>
  );
});

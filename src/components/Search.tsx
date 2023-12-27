import { ComponentPropsWithoutRef, forwardRef } from "react";

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
      className={[className, "flex justify-center relative max-w-full"]
        .filter(Boolean)
        .join(" ")}
      onSubmit={(e) => {
        e.preventDefault();
        const inputElement = e.currentTarget.querySelector("input");
        onSubmit?.(inputElement?.value ?? "");
      }}
      {...props}>
      <input
        type="search"
        className="border-none bg-transparent w-full p-3"
        placeholder="Search Pokemons"
        {...inputProps}>
        {children}
      </input>
    </form>
  );
});

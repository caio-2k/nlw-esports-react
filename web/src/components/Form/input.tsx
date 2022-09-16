import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <>
      <input
        {...props}
        className={`${
          props.type === "checkbox"
            ? "accent-green-600 text-white w-4 h-4"
            : "bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        }`}
      />
    </>
  );
}

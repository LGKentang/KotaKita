import Link from "next/link";
import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-white transition-all ease-in font-semibold border-solid border-2 border-white py-1 px-5 rounded-full hover:bg-black hover:border-black hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };

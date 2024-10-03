import Link from "next/link";
import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className="bg-white transition-all ease-in font-semibold border-solid border-2 border-white py-1 px-5 rounded-full hover:bg-black hover:border-black hover:text-white">
      {children}
    </button>
  );
};

export { Button };

import { cn } from '@/libs/utils/util';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-full border-2 border-solid border-white bg-white px-5 py-1 font-semibold transition-all ease-in',
        'hover:border-black hover:bg-black hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };

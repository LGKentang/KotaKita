import { cn } from '@/libs/utils/util';

interface InputProps extends React.ComponentProps<'input'> {}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'rounded-lg border-2 border-black px-2 py-1 text-base focus:outline-none',
        className,
      )}
      {...props}
    />
  );
};

export { Input };

import { cn } from '@/libs/utils/utils';

export interface BadgeProp extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className, ...props }: BadgeProp) => {
  return (
    <div
      className={cn('p-5 font-semibold text-black shadow-md', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Badge };

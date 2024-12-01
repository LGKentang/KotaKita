import { Post } from '@/libs/types/post.type';
import { Project } from '@/libs/types/project.type';
import { cn } from '@/libs/utils';
import Image from 'next/image';

export interface CardProp extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  item: Post | Project;
}

export const Card = ({ item, className, ...props }: CardProp) => {
  return (
    <div
      className={cn(
        'flex items-center gap-5 rounded-3xl bg-white px-6 py-3',
        className,
      )}
      {...props}
    >
      <Image
        src={item.img}
        width="100"
        height="100"
        alt={item.desc}
        className="rounded-full"
      />
      <div>
        <h4 className="text-lg font-semibold">{item.title}</h4>
        <p>{item.desc}</p>
        <p>{item.upvotes}</p>
      </div>
    </div>
  );
};

import { Post } from '@/libs/types/post.type';
import { Project } from '@/libs/types/project.type';
import { cn } from '@/libs/utils';
import Image from 'next/image';

export interface CardProp extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  item: Post | Project;
}

export const Card = ({ item, className, ...props }: CardProp) => {
  const color =
    item.status == 'Closed'
      ? 'border-red-300 text-red-500 bg-red-100'
      : 'border-green-300 text-green-500 bg-green-100';
  const designStatus = `rounded-2xl border-2 px-2 text-sm ${color}`;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 bg-white pb-3 shadow-lg duration-100 hover:scale-105',
        className,
      )}
      {...props}
    >
      <div className="relative h-60 w-full shrink-0">
        <Image
          src={item.img}
          fill
          alt={item.desc}
          className="object-cover shadow-lg"
        />
      </div>
      <div className="flex max-w-[80%] flex-col justify-center gap-2">
        <div>
          <span className={designStatus}>{item.status}</span>
          <h4 className="text-md font-semibold">{item.title}</h4>
        </div>
        <p>{item.desc}</p>
        <div className="flex w-full items-center justify-evenly pt-10">
          <div className="flex items-center gap-1">
            <Image
              src="https://www.svgrepo.com/show/509193/people.svg"
              width={13}
              height={13}
              alt={item.desc}
              className="size-4"
            />
            <p className="text-sm">{item.upvotes.length}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="https://www.svgrepo.com/show/501544/email.svg"
              width={13}
              height={13}
              alt={item.desc}
              className="size-4"
            />
            <p className="text-sm">{item.submissionDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

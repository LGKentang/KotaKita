import { Post } from '@/libs/types/post.type';
import Image from 'next/image';
import { Button } from './Button';

type postProps = {
  post: Post;
};

const Postcard = ({ post }: postProps) => {
  return (
    <div className="flex items-center justify-center p-5">
      <div className="flex justify-evenly duration-75 hover:scale-110">
        <Image
          src={post.img}
          alt={post.title}
          height={260}
          width={236}
          className="rounder-r-none rounded-l-lg"
        />
        <div
          style={{ width: '50vw' }}
          className="flex flex-col justify-between rounded-r-lg border border-l-0 border-black p-5"
        >
          <div className="flex flex-col justify-between">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.desc}</p>
            <div className="flex gap-1.5">
              <Image
                src={'https://www.svgrepo.com/show/509193/people.svg'}
                height={20}
                width={20}
                alt="population-icon"
              ></Image>
              <p>{post.upvotes.length}</p>
              <p>Pendukung</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const func = () => {
  return 3;
};
export { Postcard };

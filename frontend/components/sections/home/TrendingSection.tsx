import Link from 'next/link';
import { Carousel } from '@/components/shared/Carousel';
import { IPetition } from '@/libs/types/petition.type';

export interface TrendingSectionProps {
  items: IPetition[];
  trending: Trending;
}

export enum Trending {
  POSTS = 'posts',
  PROJECTS = 'projects',
}

export default function TrendingSection({
  items,
  trending,
}: TrendingSectionProps) {
  function showingPosts(): boolean {
    return trending === Trending.POSTS;
  }
  return (
    <section className="py-8">
      <div className="relative mx-auto max-w-4xl">
        <Carousel post={items} />
      </div>
      <div className="flex justify-center">
        <Link
          href={{
            pathname: '/home',
            query: {
              trending: showingPosts() ? Trending.PROJECTS : Trending.POSTS,
            },
          }}
          scroll={false}
        ></Link>
      </div>
    </section>
  );
}

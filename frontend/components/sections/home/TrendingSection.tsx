import Link from 'next/link';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { Carousel } from '@/components/shared/Carousel';
import type { Post } from '@/libs/types/post.type';
import type { Project } from '@/libs/types/project.type';

export interface TrendingSectionProps {
  items: Project[] | Post[];
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
        {/* Badge */}
        <Badge className="absolute -left-2 -top-1 z-10 rounded bg-black px-3 py-1 text-sm text-white shadow-md">
          Trending now
        </Badge>
        {/* Carousel */}
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
        >
          <Button className="border-2 border-black p-3 capitalize">
            show {trending}
          </Button>
        </Link>
      </div>
    </section>
  );
}

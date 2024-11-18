import React from 'react';
import Image from 'next/image';
import { Post } from '@/libs/types/post.type';
import { User } from '@/libs/types/user.type';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { Carousel } from '@/components/shared/Carousel';

const users: User[] = [
  { id: 1, email: 'alice@example.com' },
  { id: 2, email: 'bob@example.com' },
  { id: 3, email: 'charlie@example.com' },
];

// Sample data for ongoing petitions and projects
const posts: Post[] = [
  {
    id: 1,
    slug: 'clean-water-initiative',
    title: 'Clean Water Initiative',
    userId: 1,
    img: 'https://img.freepik.com/free-photo/lifestyle-scene-anime-style-with-person-doing-daily-tasks_23-2151002612.jpg',
    desc: 'A project aiming to provide clean water to underserved communities.',
    user: users[0],
    upvotes: [1, 2, 3, 4, 5], // Array of upvotes
  },
  {
    id: 2,
    slug: 'environmental-awareness-campaign', // Added slug
    title: 'Environmental Awareness Campaign',
    userId: 2,
    img: 'https://img.freepik.com/free-photo/autumn-night-illuminated-lantern-tree-yellow-leaf-generated-by-ai_188544-15642.jpg?t=st=1731905905~exp=1731909505~hmac=56e4a5478dd34616a972b90721f841c81428ee452d9df0cb333d29ebce70d6b0&w=1380',
    desc: 'Educating people about the importance of protecting the environment.',
    user: users[1], // Linking user by userId
    upvotes: [1, 3, 5, 7], // Array of upvotes
  },
  {
    id: 3,
    slug: 'education-for-all', // Added slug
    title: 'Education for All',
    userId: 3,
    img: 'https://img.freepik.com/free-photo/autumn-forest-acrylic-painting-spooky-mystery-dusk-generated-by-ai_188544-15640.jpg?t=st=1731905963~exp=1731909563~hmac=451ded3d1a30629cbb02e1f06d7f9a77ce67be188ff4624d9581423b049a119a&w=1380',
    desc: 'A project to provide education to children in remote areas.',
    user: users[2], // Linking user by userId
    upvotes: [1, 2, 4], // Array of upvotes
  },
];

const Home = () => {
  return (
    <main>
      <div className="left-0 top-0 -z-10 flex w-full flex-col items-center justify-center bg-map bg-cover bg-center bg-no-repeat py-32 shadow-md">
        <h1
          className="relative animate-typing overflow-hidden whitespace-nowrap border-r-4 p-5 text-center text-4xl font-bold text-black"
          style={{ fontSize: 40 }}
        >
          Bersama Kita Wujudkan Perubahan Nyata
        </h1>
        <Link href={'/createpetition'}>
          <Button className="mt-6 text-lg">Create Petition</Button>
        </Link>
      </div>
      <div>
        <Carousel post={posts} />
      </div>
    </main>
  );
};

export default Home;

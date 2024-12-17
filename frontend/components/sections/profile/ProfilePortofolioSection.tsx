'use client';
import { Project } from '@/libs/types/project.type';
import { Post } from '@/libs/types/post.type';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Pagination from '@/components/shared/Pagination';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Link from 'next/link';

export default function ProfilePortofolioSection() {
  const [content, setContent] = useState<Post[] | Project[]>(posts);
  const [showPosts, setShowPosts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const [containerRef] = useAutoAnimate();

  function togglePosts() {
    setShowPosts((state) => !state);
  }

  useEffect(() => {
    setContent(posts);
    setCurrentPage(1);
  }, [showPosts]);

  const paginatedContent = content.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const button = showPosts ? 'Petitions' : 'Projects';

  return (
    <section>
      <Link href={'#'}>
        {paginatedContent.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="my-5 flex gap-4 shadow-lg duration-100 hover:-translate-y-3 hover:shadow-2xl"
          >
            <Image
              src={item.img}
              width={200}
              height={200}
              alt=""
              className="size-40 object-cover"
            />
            <div className="flex flex-col justify-evenly">
              <span className="font-semibold">{item.title}</span>
              <p>{item.desc}</p>
              <div className="flex justify-between">
                <span
                  className={clsx(
                    'rounded-full p-[0.15rem] px-2 text-sm font-medium',
                    {
                      'border-2 border-green-500 bg-green-100 text-green-700':
                        item.status === 'Active',
                      'border-2 border-yellow-500 bg-yellow-100 text-yellow-700':
                        item.status === 'Pending Review',
                      'border-2 border-red-500 bg-red-300 text-red-700':
                        item.status === 'Closed',
                    },
                  )}
                >
                  {item.status}
                </span>
                <span className="mr-4 text-blue-400">Read more...</span>
              </div>
            </div>
          </div>
        ))}
      </Link>
      <div className="flex items-center gap-5">
        <button
          className="rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-500"
          onClick={togglePosts}
        >
          {button}
        </button>
        <Pagination
          items={content.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onChangePage={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}

const posts: Post[] = [
  {
    id: 1,
    slug: 'clean-water-initiative',
    title: 'Clean Water Initiative',
    userId: 1,
    img: 'https://img.freepik.com/free-photo/lifestyle-scene-anime-style-with-person-doing-daily-tasks_23-2151002612.jpg',
    desc: 'A project aiming to provide clean water to underserved communities.',
    status: 'Active',
    submissionDate: '2023-11-15', // ISO string for date
    user: {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
    upvotes: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    slug: 'environmental-awareness-campaign',
    title: 'Environmental Awareness Campaign',
    userId: 2,
    img: 'https://img.freepik.com/free-photo/autumn-night-illuminated-lantern-tree-yellow-leaf-generated-by-ai_188544-15642.jpg',
    desc: 'Educating people about the importance of protecting the environment.',
    status: 'Pending Review',
    submissionDate: '2023-11-20',
    user: {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    },
    upvotes: [1, 3, 5],
  },
  {
    id: 3,
    slug: 'education-for-all',
    title: 'Education for All',
    userId: 3,
    img: 'https://img.freepik.com/free-photo/autumn-forest-acrylic-painting-spooky-mystery-dusk-generated-by-ai_188544-15640.jpg',
    desc: 'A project to provide education to children in remote areas.',
    status: 'Closed',
    submissionDate: '2023-10-10',
    user: {
      id: 3,
      email: 'samuel.lee@example.com',
      name: 'Samuel Lee',
    },
    upvotes: [2, 4],
  },
  {
    id: 4,
    slug: 'education-for-all',
    title: 'Education for All',
    userId: 3,
    img: 'https://img.freepik.com/free-photo/autumn-forest-acrylic-painting-spooky-mystery-dusk-generated-by-ai_188544-15640.jpg',
    desc: 'A project to provide education to children in remote areas.',
    status: 'Closed',
    submissionDate: '2023-10-10',
    user: {
      id: 3,
      email: 'samuel.lee@example.com',
      name: 'Samuel Lee',
    },
    upvotes: [2, 4],
  },
];

// const projects: Project[] = [
//   {
//     id: 1,
//     slug: 'ai-image-generator',
//     title: 'AI Image Generator',
//     img: 'https://img.freepik.com/free-photo/digital-art-concept-showing-abstract-ai-robot_188544-12345.jpg',
//     desc: 'A tool that generates stunning images using AI technology.',
//     status: 'Active',
//     submissionDate: '2023-11-30',
//     upvotes: [101, 102, 103],
//   },
//   {
//     id: 2,
//     slug: 'personal-budget-planner',
//     title: 'Personal Budget Planner',
//     img: 'https://img.freepik.com/free-photo/flat-lay-financial-concept-with-calculator_23-2148944456.jpg',
//     desc: 'An app to help you manage your personal finances effectively.',
//     status: 'Pending Review',
//     submissionDate: '2023-12-01',
//     upvotes: [103, 104],
//   },
//   {
//     id: 3,
//     slug: 'weather-forecast-app',
//     title: 'Weather Forecast App',
//     img: 'https://img.freepik.com/free-photo/digital-weather-forecast-interface-with-cloudy-background_188544-23123.jpg',
//     desc: 'Get accurate weather updates for your location instantly.',
//     status: 'Closed',
//     submissionDate: '2023-11-15',
//     upvotes: [101, 102, 103, 104],
//   },
// ];

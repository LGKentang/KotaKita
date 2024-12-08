'use client';

import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Post } from '@/libs/types/post.type';
import { Project } from '@/libs/types/project.type';
import { Card } from '@/components/shared/Card';
import Pagination from '@/components/shared/Pagination';

export default function UserPortfolioSection() {
  const [content, setContent] = useState<Post[] | Project[]>(posts);
  const [showPosts, setShowPosts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const [containerRef] = useAutoAnimate();

  function togglePosts() {
    setShowPosts((state) => !state);
  }

  useEffect(() => {
    setContent(showPosts ? posts : projects);
    setCurrentPage(1);
  }, [showPosts]);

  const paginatedContent = content.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section
      id="user-projects"
      className="flex flex-col items-center justify-between bg-gradient-to-r from-sky-900 to-indigo-900 py-10"
    >
      <div className="flex w-full max-w-[75%] px-5">
        <div className="mb-8 flex w-full items-center justify-center gap-2">
          <span className="text-center text-2xl font-semibold text-white">
            Your
          </span>
          <button
            className="group border-b-2 border-white text-2xl font-semibold text-white hover:border-blue-600 hover:bg-transparent hover:text-blue-600"
            onClick={() => togglePosts()}
          >
            <span className="inline-block group-hover:animate-bounce">
              {showPosts ? 'Projects' : 'Posts'}
            </span>
          </button>
        </div>
      </div>
      <div className="flex max-w-[75%] gap-5 px-5" ref={containerRef}>
        {paginatedContent.map((item) => (
          <Card item={item} key={item.id} className="w-full" />
        ))}
      </div>
      <div>
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
    submissionDate: '2023-11-15',
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

const projects: Project[] = [
  {
    id: 1,
    slug: 'ai-image-generator',
    title: 'AI Image Generator',
    userId: 1,
    img: 'https://img.freepik.com/free-photo/digital-art-concept-showing-abstract-ai-robot_188544-12345.jpg',
    desc: 'A tool that generates stunning images using AI technology.',
    status: 'Active',
    submissionDate: '2023-11-30',
    user: {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
    upvotes: [101, 102, 103],
  },
  {
    id: 2,
    slug: 'personal-budget-planner',
    title: 'Personal Budget Planner',
    userId: 2,
    img: 'https://img.freepik.com/free-photo/flat-lay-financial-concept-with-calculator_23-2148944456.jpg',
    desc: 'An app to help you manage your personal finances effectively.',
    status: 'Pending Review',
    submissionDate: '2023-12-01',
    user: {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    },
    upvotes: [103, 104],
  },
  {
    id: 3,
    slug: 'weather-forecast-app',
    title: 'Weather Forecast App',
    userId: 3,
    img: 'https://img.freepik.com/free-photo/digital-weather-forecast-interface-with-cloudy-background_188544-23123.jpg',
    desc: 'Get accurate weather updates for your location instantly.',
    status: 'Closed',
    submissionDate: '2023-11-15',
    user: {
      id: 3,
      email: 'samuel.lee@example.com',
      name: 'Samuel Lee',
    },
    upvotes: [101, 102, 103, 104],
  },
];

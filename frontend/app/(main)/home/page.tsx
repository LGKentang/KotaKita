import { Post } from '@/libs/types/post.type';
import { User } from '@/libs/types/user.type';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { Project } from '@/libs/types/project.type';
import TrendingSection, {
  Trending,
} from '@/components/sections/home/TrendingSection';
import UserPortfolioSection from '@/components/sections/home/UserPortfolioSection';
import { PageParams } from '@/libs/types/common.type';

const Home = ({ searchParams }: PageParams) => {
  const trending =
    (searchParams['trending'] as Trending | undefined) ?? Trending.POSTS;

  const items = getTrendings(trending);

  return (
    <main className="bg-white">
      <div className="flex w-full flex-col items-center justify-center bg-map bg-cover bg-center bg-no-repeat py-32 shadow-md">
        <h1
          className="relative animate-typing overflow-hidden whitespace-nowrap border-r-4 p-5 text-center text-4xl font-bold text-black"
          style={{ fontSize: 40 }}
        >
          Bersama Kita Wujudkan Perubahan Nyata
        </h1>
        <Link href={'/createpetition'}>
          <Button className="mt-6 border-2 border-black text-lg">
            Create Petition
          </Button>
        </Link>
      </div>
      <TrendingSection trending={trending} items={items} />
      <UserPortfolioSection />
    </main>
  );
};

function getTrendings(param: Trending) {
  return { [Trending.POSTS]: posts, [Trending.PROJECTS]: projects }[param];
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
];

const projects: Project[] = [
  {
    id: 1,
    slug: 'ai-image-generator',
    title: 'AI Image Generator',
    img: 'https://img.freepik.com/free-photo/digital-art-concept-showing-abstract-ai-robot_188544-12345.jpg',
    desc: 'A tool that generates stunning images using AI technology.',
    status: 'Active',
    submissionDate: '2023-11-30',
    upvotes: [101, 102, 103],
  },
  {
    id: 2,
    slug: 'personal-budget-planner',
    title: 'Personal Budget Planner',
    img: 'https://img.freepik.com/free-photo/flat-lay-financial-concept-with-calculator_23-2148944456.jpg',
    desc: 'An app to help you manage your personal finances effectively.',
    status: 'Pending Review',
    submissionDate: '2023-12-01',
    upvotes: [103, 104],
  },
  {
    id: 3,
    slug: 'weather-forecast-app',
    title: 'Weather Forecast App',
    img: 'https://img.freepik.com/free-photo/digital-weather-forecast-interface-with-cloudy-background_188544-23123.jpg',
    desc: 'Get accurate weather updates for your location instantly.',
    status: 'Closed',
    submissionDate: '2023-11-15',
    upvotes: [101, 102, 103, 104],
  },
];

export default Home;

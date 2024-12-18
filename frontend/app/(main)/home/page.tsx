'use client';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import TrendingSection, {
  Trending,
} from '@/components/sections/home/TrendingSection';
import { PageParams } from '@/libs/types/common.type';
import { useEffect, useState } from 'react';
import { GetAllPetitions } from '@/libs/actions/petitions.action';
import { IPetition } from '@/libs/types/petition.type';

const Home = ({}: PageParams) => {
  const [petitions, setPetitions] = useState<IPetition[]>([]); // Adjust type based on the shape of data from your backend
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlogan, setCurrentSlogan] = useState('');

  useEffect(() => {
    // Randomize the slogan on component mount
    const randomIndex = Math.floor(Math.random() * slogans.length);
    setCurrentSlogan(slogans[randomIndex]);
  }, []); // Empty dependency array ensures this runs only once

  const slogans = [
    'Bersama Kita Wujudkan Perubahan Nyata',
    'Ayo Bergerak Demi Masa Depan Bangsa',
    'Satu Langkah Kecil untuk Perubahan Besar',
    'Suara Anda Adalah Kekuatan Kita',
    'Mari Berkolaborasi Membangun Negeri',
  ];

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        setLoading(true);
        const data = await GetAllPetitions();
        console.log(data);
        setPetitions(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching petitions:', err);
        setError('Failed to load petitions');
        setLoading(false);
      }
    };

    fetchPetitions();
  }, []);

  return (
    <main className="bg-white">
      <div className="flex w-full flex-col items-center justify-center bg-map bg-cover bg-center bg-no-repeat py-32 shadow-md">
        <h1
          className="relative animate-typing overflow-hidden whitespace-nowrap border-r-4 p-5 text-center text-4xl font-bold text-black"
          style={{ fontSize: 40 }}
        >
          {currentSlogan}
        </h1>
        <h1
          className="relative animate-typing overflow-hidden whitespace-nowrap border-r-4 p-5 text-center text-4xl font-bold text-black"
          style={{ fontSize: 40 }}
        >
          {currentSlogan}
        </h1>
        <Link href={'/createpetition'}>
          <Button className="mt-6 border-2 border-black text-lg">
            Create Petition
          </Button>
        </Link>
      </div>

      {/* Trending Section */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <TrendingSection trending={Trending.POSTS} items={petitions} />
      )}
    </main>
  );
};

export default Home;

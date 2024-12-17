'use client';

import { useEffect, useState } from 'react';
import { IPetition } from '@/libs/types/petition.type';
import { GetPetitionsByUser } from '@/libs/actions/petitions.action';
import parseImageUrl from '@/libs/utils/parse';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

export default function UserPetitionSection() {
  const [petitions, setPetitions] = useState<IPetition[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPetitions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const data = await GetPetitionsByUser(token);
        setPetitions(data);
      } catch (error) {
        console.error('Error fetching user petitions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPetitions();
  }, []);

  const renderPetitions = () => {
    if (petitions?.length === 0) {
      return <div>No petitions found.</div>;
    }

    return (
      <div className="space-y-4">
        {petitions?.map((petition) => (
          <div key={petition.id} className="border p-4 rounded-md flex gap-4 items-center">
            <img
              src={parseImageUrl(petition.thumbnail_url)}
              alt={petition.title}
              className="w-120 h-40 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{petition.title}</h3>
              <p className="text-sm text-gray-600">{petition.description}</p>
              <p className="text-xs text-gray-400">
                Submitted on: {new Date(petition.submissionDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold">{petition.status}</p>
            </div>
              <div className="flex flex-row gap-2 text-sm items-center">
                <span className="text-green-500">{petition.upvotes}</span> 
                <p className="text-green-500">{<FaRegThumbsUp/>}</p>
                 
                <span className="text-red-500">{petition.downvotes} </span>
                <p className="text-red-500"><FaRegThumbsDown/></p>

              </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="p-6 md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Petitions</h2>
      {loading ? <div>Loading petitions...</div> : renderPetitions()}
    </section>
  );
}

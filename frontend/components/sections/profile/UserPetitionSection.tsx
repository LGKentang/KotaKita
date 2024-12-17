'use client';

import { useEffect, useState } from 'react';
import { IPetition } from '@/libs/types/petition.type';
import { GetPetitionsByUser, UpdatePetitionStatus } from '@/libs/actions/petitions.action';
import parseImageUrl from '@/libs/utils/parse';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

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

  const handleStatusToggle = async (petitionId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Open' ? 'Closed' : 'Open';
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      await UpdatePetitionStatus(petitionId.toString(), newStatus, token);
  
      setPetitions((prevPetitions) => {
        if (!prevPetitions) return null; 
  
        return prevPetitions.map((petition) =>
          petition.id === petitionId ? { ...petition, status: newStatus } : petition
        );
      });
    } catch (error) {
      console.error('Error updating petition status:', error);
    }
  };
  

  const renderPetitions = () => {
    if (petitions?.length === 0) {
      return <div>No petitions found.</div>;
    }

    return (
      <div className="space-y-4">
        {petitions?.map((petition) => (
          <div
            key={petition.id}
            className="flex items-center gap-4 p-4 bg-white rounded-md shadow-md border"
          >
            {/* Image on the Left */}
            <img
              src={parseImageUrl(petition.thumbnail_url)}
              alt={petition.title}
              className="w-32 h-24 object-cover rounded-md flex-shrink-0"
            />

            {/* Content */}
            <div className="flex-1 space-y-2 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 truncate" title={petition.title}>
                {petition.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2" title={petition.description}>
                {petition.description}
              </p>
              <div className="text-xs text-gray-400">
                Submitted on: {new Date(petition.submissionDate).toLocaleDateString()}
              </div>
              <div className="text-sm font-semibold text-blue-600">
                {petition.status}
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0 w-32">
              <Switch
                checked={petition.status === 'Closed'}
                onChange={() => handleStatusToggle(petition.id, petition.status)}
                className={`${
                  petition.status === 'Closed' ? 'bg-red-500' : 'bg-green-500'
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    petition.status === 'Closed' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <span
                className={`text-xs ${
                  petition.status === 'Closed' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {petition.status}
              </span>
            </div>

            {/* Upvotes and Downvotes */}
            <div className="flex flex-col items-center gap-2 text-gray-700 flex-shrink-0 w-16">
              <div className="flex items-center gap-1 text-green-500">
                <FaRegThumbsUp />
                <span>{petition.upvotes}</span>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                <FaRegThumbsDown />
                <span>{petition.downvotes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="p-2 mx-auto max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Your Petitions</h2>
      {loading ? <div>Loading petitions...</div> : renderPetitions()}
    </section>
  );
}

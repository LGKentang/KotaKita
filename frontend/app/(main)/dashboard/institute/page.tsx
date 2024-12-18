'use client';
import { Post } from '@/libs/types/post.type';
import { GetPetition, GetAllPetitions } from '@/libs/actions/petitions.action';
import OfferList from '@/components/sections/dashboard/OfferList';
import { GetInstitute } from '@/libs/actions/institute.action';
import { GetProjects } from '@/libs/actions/projects.action';
import { useAppContext } from '@/app/context';
import { useEffect, useState } from 'react';
import { GetOffers, UpdateOfferStatus } from '@/libs/actions/offer.action';
import { Project } from '@/libs/types/project.type';
import { Institute } from '@/libs/types/institute.type';

export default function InstituteDashboard() {
  const { user } = useAppContext();

  const [institute, setInstitute] = useState<Institute | null>(null);
  const [petitions, setPetitions] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchData = async () => {
    if (user) {
      try {
        const fetchInstitute = await GetInstitute(user.institute_id!);
        const fetchOffers = await GetOffers(localStorage.getItem('token'));
        const fetchProjects = await GetProjects();

        if (Array.isArray(fetchOffers.data)) {
          const petitionIds = fetchOffers.data.map(
            (item: { petition_id: string }) => item.petition_id
          );

          const fetchedPetitions = await Promise.all(
            petitionIds.map((id: string) => GetPetition(id))
          );

          setPetitions(fetchedPetitions);
        } else {
          console.error('Invalid response format or no data available');
        }

        setInstitute(fetchInstitute);
        setProjects(fetchProjects);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleAction = async (petitionId: number, status: 'Accepted' | 'Decline') => {
    try {
      const token = localStorage.getItem('token');
      const response = await UpdateOfferStatus(token, petitionId, status);
    
        await fetchData();
    } catch (err) {
      console.error('Error in handleAction:', err);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-between gap-5 bg-gray-50 p-6">
      {/* Institute Profile */}
      {institute && (
        <section className="mb-8 flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">
          <img
            src={institute.logo_url || '/assets/missing_image.avif'} // Fallback image if logo is undefined
            alt="Institute Logo"
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{institute.name}</h1>
            <p className="text-gray-600">{institute.slogan}</p>
            <p className="text-sm text-gray-500">Founded on: {institute.founded_on}</p>
            <p className="text-sm text-gray-500">Contact: {institute.contact_number}</p>
            <p className="text-sm text-gray-500">Impact: {institute.impact_description}</p>
          </div>
        </section>
      )}

      <OfferList offerList={petitions} onAction={handleAction} />
    </div>
  );
}

'use client';
import { Post } from '@/libs/types/post.type';
import { GetAllPetitions } from '@/libs/actions/petitions.action';
import OfferList from '@/components/sections/dashboard/OfferList';
import InstituteProjects from '@/components/sections/dashboard/InstituteProjects';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { GetInstitute } from '@/libs/actions/institute.action';
import { GetProjects } from '@/libs/actions/projects.action';
import { Project } from '@/libs/types/project.type';
import { useAppContext } from '@/app/context';
import { useEffect, useState } from 'react';
import { Institute } from '@/libs/types/institute.type';

export default function InstituteDashboard() {
  const { user } = useAppContext();

  const [institute, setInstitute] = useState<Institute | null>(null);
  const [petitions, setPetitions] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredPetitions, setFilteredPetition] = useState<Post[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        console.log(user);
        try {
          console.log(user.institute_id);
          console.log(user.id)
          const fetchInstitute = await GetInstitute(user.institute_id!);
          const fetchPetitions = await GetAllPetitions();
          const fetchProjects = await GetProjects();

          setInstitute(fetchInstitute);
          setPetitions(fetchPetitions);
          setProjects(fetchProjects);

          const filteredProjects = fetchProjects.filter(
            (project: Project) => project.instituteId === fetchInstitute.id
          );
          const offerList = fetchPetitions.filter(
            (petition: Post) => petition.upvotes.length >= 5
          );

          setFilteredProjects(filteredProjects);
          setFilteredPetition(offerList);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };

      fetchData();
    }
  }, [user]);


  // useEffect(() => {
  //   if (!user || !user.institute_id) {
  //     setError('User or instituteId is missing.');
  //     setLoading(false);
  //     return;
  //   }

  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const fetchInstitute = await GetInstitute(user.institute_id!);
  //       const fetchPetitions = await GetAllPetitions();
  //       const fetchProjects = await GetProjects();

  //       setInstitute(fetchInstitute);
  //       setPetitions(fetchPetitions);
  //       setProjects(fetchProjects);

  //       // Filter data after fetching
  //       const filteredProjects = fetchProjects.filter(
  //         (project: Project) => project.instituteId === fetchInstitute.id
  //       );
  //       const offerList = fetchPetitions.filter(
  //         (petition: Post) => petition.upvotes.length >= 5
  //       );

  //       setFilteredProjects(filteredProjects);
  //       setFilteredPetition(offerList);
  //       setLoading(false);
  //     } catch (err) {
  //       setError('Error fetching data');
  //       setLoading(false);
  //       console.error('Error fetching data:', err);
  //     }
  //   };

  //   fetchData();
  // }, [user]);


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
            <p className="text-sm text-gray-500">
              Founded on: {institute.founded_on}
            </p>
            <p className="text-sm text-gray-500">
              Contact: {institute.contact_number}
            </p>
          </div>
        </section>
      )}

      {/* Offer List */}
      <OfferList offerList={filteredPetitions} />
      {/* Pending Projects */}
      <InstituteProjects instituteProjects={filteredProjects} />

      <div>
        <Link href="/dashboard/institute/createproject">
          <Button className="bg-green-500 text-white hover:border-0 hover:border-none hover:bg-green-300">
            Create a new project
          </Button>
        </Link>
      </div>
    </div>
  );
}

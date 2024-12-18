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
  console.log(user);
  const [institute, setInstitute] = useState<Institute>({
    id: 0,
    name: '',
    contact_number: '',
    slogan: '',
    founded_on: '',
    impact_description: '',
    logo_url: '',
    thumbnail_url: '',
  });
  const [petitions, setPetitions] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredPetitions, setFilteredPetition] = useState<Post[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.instituteId) throw new Error(`User not found`);
        const fetchInstitute = await GetInstitute(user.instituteId);
        const fetchPetitions = await GetAllPetitions();
        const fetchProjects = await GetProjects();

        setInstitute(fetchInstitute);
        setPetitions(fetchPetitions);
        setProjects(fetchProjects);
        const filteredProjects = projects.filter(
          (project: Project) => project.instituteId == institute?.id,
        );

        const offerList = petitions.filter(
          (petition: Post) => petition.upvotes.length >= 5,
        );
        setFilteredProjects(filteredProjects);
        setFilteredPetition(offerList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Filter projects and petitions only if institute is not null

  return (
    <div className="flex min-h-full flex-col justify-between gap-5 bg-gray-50 p-6">
      {/* Institute Profile */}
      <section className="mb-8 flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">
        <img
          src={institute?.logo_url || '/assets/missing_image.avif'} // Fallback image if logo is undefined
          alt="Institute Logo"
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {institute?.name}
          </h1>
          <p className="text-gray-600">{institute?.slogan}</p>
          <p className="text-sm text-gray-500">
            Founded on: {institute?.founded_on}
          </p>
          <p className="text-sm text-gray-500">
            Contact: {institute?.contact_number}
          </p>
        </div>
      </section>
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

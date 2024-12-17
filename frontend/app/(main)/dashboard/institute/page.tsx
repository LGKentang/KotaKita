import { Institute } from '@/libs/types/institute.type';
import { Post } from '@/libs/types/post.type';
import { GetAllPetitions } from '@/libs/actions/petitions.action';
import { Project } from '@/libs/types/project.type';
import OfferList from '@/components/sections/dashboard/OfferList';
import InstituteProjects from '@/components/sections/dashboard/InstituteProjects';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

const mockInstitute: Institute = {
  id: 1,
  name: 'Global Education Initiative',
  contact_number: '123-456-7890',
  slogan: 'Empowering Future Leaders',
  founded_on: '2000-05-15',
  impact_description:
    'The institute has been a leader in improving educational opportunities globally, with over 1 million students impacted.',
  logo_url: '../assets/missing_image.avif',
  thumbnail_url: 'https://example.com/images/thumbnail.png',
};

export default async function InstituteDashboard({
  searchParams,
}: {
  searchParams: { modal?: string };
}) {
  const petitions = await GetAllPetitions();
  const projects = await GetAllPetitions();

  // Filtered Projects and Petitions
  const instituteProjects = projects.filter(
    (project: Project) =>
      project.instituteId === mockInstitute.id &&
      project.status === 'Pending Review',
  );

  const offerList = petitions.filter(
    (petition: Post) => petition.upvotes.length >= 5,
  );

  return (
    <div className="flex min-h-full flex-col justify-between gap-5 bg-gray-50 p-6">
      {/* Institute Profile */}
      <section className="mb-8 flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">
        <img
          src={mockInstitute.logo_url}
          alt="Institute Logo"
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {mockInstitute.name}
          </h1>
          <p className="text-gray-600">{mockInstitute.slogan}</p>
          <p className="text-sm text-gray-500">
            Founded on: {mockInstitute.founded_on}
          </p>
          <p className="text-sm text-gray-500">
            Contact: {mockInstitute.contact_number}
          </p>
        </div>
      </section>
      {/* Offer List */}
      <OfferList offerList={offerList} />
      {/* Pending Projects */}
      <InstituteProjects instituteProjects={instituteProjects} />

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

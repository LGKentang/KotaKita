import { Post } from '@/libs/types/post.type';
import { GetAllPetitions } from '@/libs/actions/petitions.action';
import OfferList from '@/components/sections/dashboard/OfferList';
import InstituteProjects from '@/components/sections/dashboard/InstituteProjects';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { GetInstitute } from '@/libs/actions/institute.action';
import { GetProjects } from '@/libs/actions/projects.action';
import { Project } from '@/libs/types/project.type';

export default async function InstituteDashboard({
  searchParams,
}: {
  searchParams: { tab: string };
}) {
  const tab = searchParams.tab || null;

  if (!tab) {
    throw new Error('Institute ID is missing');
  }
  const instituteId = parseInt(tab);

  const institute = await GetInstitute(instituteId);
  const petitions = await GetAllPetitions();
  const projects = await GetProjects();

  const filteredProjects = projects.filter(
    (project: Project) => project.instituteId == instituteId,
  );

  const offerList = petitions.filter(
    (petition: Post) => petition.upvotes.length >= 5,
  );

  return (
    <div className="flex min-h-full flex-col justify-between gap-5 bg-gray-50 p-6">
      {/* Institute Profile */}
      <section className="mb-8 flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">
        <img
          src={institute.logo}
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
      {/* Offer List */}
      <OfferList offerList={offerList} />
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

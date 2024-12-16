import { Project } from '@/libs/types/project.type';

type Props = {
  instituteProjects: Project[];
};

export default function ({ instituteProjects }: Props) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Pending Projects
      </h2>
      <div className="space-y-4">
        {instituteProjects.length > 0 ? (
          instituteProjects.map((project: Project) => (
            <div key={project.id} className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">
                {project.title}
              </h3>
              <p className="mt-1 text-gray-600">{project.desc}</p>
              <p className="mt-2 text-sm text-gray-500">
                Status: {project.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No pending projects available for this institute.
          </p>
        )}
      </div>
    </section>
  );
}

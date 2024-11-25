'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
    id: number;
    name: string;
    description: string;
    instituteName: string;
    imageUrl: string;
    progress: number; // New property to track progress
}

const ProjectsPage: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const projects: Project[] = [
        {
            id: 1,
            name: "Rumah Belajar",
            description: "Pusat-pusat yang menyediakan pendidikan alternatif dan pelatihan keterampilan vokasi untuk kaum muda kurang mampu.",
            instituteName: "Yayasan Cinta Anak Bangsa (YCAB Foundation)",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm6aRWTCS4iKzmvwqDkNW0s2UXEqc3kVougw&s",
            progress: 60, // Example progress value
        },
        {
            id: 2,
            name: "Bantuan Pinjaman untuk UMKM",
            description: "Pembiayaan mikro untuk keluarga dalam rangka meningkatkan kondisi ekonomi mereka.",
            instituteName: "Yayasan Cinta Anak Bangsa (YCAB Foundation)",
            imageUrl: "https://propseva.com/wp-content/uploads/2023/02/Home-Loan.jpg",
            progress: 75, // Example progress value
        },
        {
            id: 3,
            name: "Pelatihan Keterampilan Digital",
            description: "Kursus yang bertujuan untuk mengajarkan literasi digital dan keterampilan untuk mempersiapkan kaum muda masuk ke dunia kerja.",
            instituteName: "Yayasan Cinta Anak Bangsa (YCAB Foundation)",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPZCOVAFaVX4Q2q2iH5ZPrr9ZjFEwKuqj-A&s",
            progress: 40, // Example progress value
        },
        {
            id: 4,
            name: "Program Makanan Bergizi",
            description: "Kampanye yang menyediakan makanan bergizi dan mempromosikan pendidikan kesehatan untuk mengurangi malnutrisi pada anak.",
            instituteName: "Wahana Visi Indonesia",
            imageUrl: "https://gizi.uad.ac.id/wp-content/uploads/2024/05/AA1i17d7-620x321.jpeg",
            progress: 50, // Example progress value
        },
        {
            id: 5,
            name: "Proyek Akses Air Bersih",
            description: "Membangun dan memelihara fasilitas air bersih di daerah pedesaan.",
            instituteName: "Wahana Visi Indonesia",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ6lxZPgX_bhscDKeuorRMOsKuyvJqFlVkYg&s",
            progress: 85, // Example progress value
        },
        {
            id: 6,
            name: "Bantuan dan Kesiapsiagaan Bencana",
            description: "Bantuan untuk komunitas yang terkena bencana alam seperti banjir dan gempa bumi.",
            instituteName: "Wahana Visi Indonesia",
            imageUrl: "https://publichealth.tulane.edu/wp-content/uploads/sites/3/2021/09/what-is-disaster-management.jpg",
            progress: 20, // Example progress value
        },
    ];

    const handleProjectClick = (id: number) => {
        const project = projects.find((project) => project.id === id);
        if (project) {
            setSelectedProject(project);
        }
    };

    const truncateDescription = (description: string, maxWords: number) => {
        const words = description.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return description;
    };

    // Filter projects based on the search query
    const filteredProjects = projects.filter(
        (project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-8 shadow-md"
            style={{
                backgroundImage:
                    "url('https://lp-cms-production.imgix.net/image_browser/Jakarta_city_S.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <h1 className="text-3xl font-bold text-white mb-8 z-10">Projects</h1>

            {/* Search Input */}
            <div className="w-full max-w-4xl z-10 mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search Projects..."
                />
            </div>


            <div className="w-full max-w-4xl z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 py-8 bg-white bg-opacity-90 rounded-lg max-h-[75vh] overflow-y-auto">
    {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
            <div
                key={project.id}
                className="p-4 border rounded-md cursor-pointer bg-white transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-100"
                onClick={() => handleProjectClick(project.id)}
            >
                <div>
                    <div className="mb-4">
                        <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-48 object-cover rounded-md shadow-md"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
                    <p className="text-lg text-gray-700">{truncateDescription(project.description, 6)}</p>

                    <p className="italic text-gray-500 mt-2">Managed by: {project.instituteName}</p>
                </div>

                <div>
                    {/* Progress bar */}
                    <div className="mt-4">
                        <p className="text-gray-700">Progress: {project.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p className="text-center text-gray-500">No projects found.</p>
    )}
</div>

        </div>
    );
};

export default ProjectsPage;

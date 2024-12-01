'use client'
import React, { useState } from "react";
import { FaGlobe, FaCity, FaRocket, FaLeaf, FaHandsHelping } from 'react-icons/fa';
import InstituteCard from "./InstituteCard";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface Institute {
  id: number;
  name: string;
  description: string;
  logo: string;
  foundingYear: number;
  impact: string;
  projects: Project[];
}

const InstituteComponent: React.FC = () => {
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);

  const institutes: Institute[] = [
    {
      id: 1,
      name: "YCAB Foundation",
      description: "Empowering youth with education, economic support, and welfare programs.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjN8Fi61Qh17zv_PQWNfxnK7YAVCHAu-Vgvw&s",
      foundingYear: 1999,
      impact: "Impact: 50,000+ youth reached",
      projects: [
        { id: 1, name: "Learning Homes", description: "Educational centers for underprivileged youth." },
        { id: 2, name: "Micro-loans for Families", description: "Loans to boost family economic stability." },
        { id: 3, name: "Digital Literacy Programs", description: "Training youth in essential digital skills." },
      ],
    },
    {
      id: 2,
      name: "Wahana Visi Indonesia",
      description: "Supporting underserved communities with essentials for a healthy life.",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEXzbCHzah/zbiP2h0r0cyzzaBvzbCP3n2z0ejfzZhb5tIz1gULyYxD81L32jlXxWQD0fDz/9e/2pHbxVQD4p37////6y7LyXAvyYgfyYAD3mmr+7+f/+PX4sIz6xKn949X//fv5tpT2lWD6vp/82MX2ilH6u5f/IJGnAAAAsUlEQVR4Aa3QRQICMQwAwKbGurv7/3+IO6RorhMnfwpQIVXVMS5QlCtNx1BIw7Qkhtx2XGQstTw/COmTUgChh1GcuKkAuL0KhJXlelHGVQ15bulbATgScFbUTdvF2yjtfuVoBK5xiMZpj21TF/MWrybq57Zy1/bhFaC7dWzn6fP/Smvu+hB7r76908VQaO2wRfx9OY7NnKFIF2bhaJgoAg00XWIoCwUShwuChqdCTt6PDYnJCiCBXAYSAAAAAElFTkSuQmCC",
      foundingYear: 2002,
      impact: "Impact: 100,000+ families supported",
      projects: [
        { id: 4, name: "Meal Programs", description: "Providing nutritious meals to reduce child malnutrition." },
        { id: 5, name: "Clean Water Access", description: "Building water facilities for rural communities." },
        { id: 6, name: "Disaster Preparedness", description: "Disaster relief and preparedness training." },
      ],
    },
    {
      id: 3,
      name: "Green Earth Foundation",
      description: "Promotes environmental awareness and conservation initiatives.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHHg8FVlt_mvGfLwHxk4cXMtKmUSA7wO0d0A&s",
       foundingYear: 2010,
      impact: "Impact: 20,000 trees planted",
      projects: [
        { id: 7, name: "Tree Planting Drives", description: "Organizing events to plant trees in deforested areas." },
        { id: 8, name: "Community Cleanups", description: "Bringing communities together to clean local areas." },
        { id: 9, name: "Waste Recycling Programs", description: "Educating about and promoting waste recycling." },
      ],
    },
    {
      id: 4,
      name: "Global Health Initiative",
      description: "Focusing on improving health outcomes in underserved regions.",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_nAgNsHMyXMD30UOrKR5lmRJtDZJfHStZg85-1Rn2S8sw=s900-c-k-c0x00ffffff-no-rj",
      foundingYear: 2005,
      impact: "Impact: 5,000+ patients treated",
      projects: [
        { id: 10, name: "Mobile Health Clinics", description: "Providing health services in remote areas." },
        { id: 11, name: "Vaccination Campaigns", description: "Promoting vaccination in low-coverage regions." },
        { id: 12, name: "Hygiene Education", description: "Teaching basic hygiene and sanitation practices." },
      ],
    }
  ];

  const router = useRouter();

  const handleInstituteClick = (id: number) => {
    router.push(`/institutes/${id}`);
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-8 shadow-md"
      style={{
        backgroundImage: "url('https://www.differencebetween.net/wp-content/uploads/2018/03/Difference-Between-Institute-and-University-.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <h1 className="text-3xl font-bold text-white mb-8 z-10">Institutes</h1>

      <div
        className="w-full max-w-4xl z-10 space-y-8 overflow-y-auto px-4 py-4 bg-white bg-opacity-0 rounded-lg max-h-[75vh]"
        style={{
          scrollbarWidth: 'thin', 
          scrollbarColor: '#ffffff transparent', 
        }}
      >
        {institutes.map((institute) => (
          <div key={institute.id} className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:cursor-pointer"
           onClick={()=>handleInstituteClick(institute.id)}
          >
            <div className="flex items-center space-x-4">
              <img src={institute.logo} alt={`${institute.name} logo`} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{institute.name}</h2>
                <p className="text-sm text-gray-600">{institute.foundingYear} - {institute.impact}</p>
                <p className="text-gray-600">{institute.description}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {institute.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleInstituteClick(institute.id)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full shadow hover:bg-blue-600 transition"
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstituteComponent;

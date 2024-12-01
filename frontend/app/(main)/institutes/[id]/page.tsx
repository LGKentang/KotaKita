'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaGlobe, FaCity, FaRocket } from 'react-icons/fa';

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
    createdAt: string;  
    banner : string | null;
    projects: Project[];
}

const InstituteDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Explicitly type `id` as a string
    const [institute, setInstitute] = useState<Institute | null>(null);

    const institutes: Institute[] = [
        {
          id: 1,
          name: "Yayasan Cinta Anak Bangsa (YCAB Foundation)",
          description: "Focused on youth empowerment through education, economic empowerment, and welfare programs.",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjN8Fi61Qh17zv_PQWNfxnK7YAVCHAu-Vgvw&s",
          createdAt:"23 November 2024",
          banner:"https://www.marketeers.com/_next/image/?url=https%3A%2F%2Froom.marketeers.com%2Fwp-content%2Fuploads%2F2016%2F05%2FO1aTps_ycab.png&w=1920&q=75",
          projects: [
            {
              id: 1,
              name: "Rumah Belajar (Learning Homes)",
              description: "Centers providing alternative education and vocational training for underprivileged youth.",
            },
            {
              id: 2,
              name: "Loan Assistance for Small Businesses",
              description: "Micro-financing for families to improve their economic conditions.",
            },
            {
              id: 3,
              name: "Digital Skills Training",
              description: "Courses aimed at teaching digital literacy and skills to prepare young people for the workforce.",
            },
          ],
        },
        {
          id: 2,
          name: "Wahana Visi Indonesia",
          description: "Improving the quality of life for children and families in underserved communities across Indonesia.",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEXzbCHzah/zbiP2h0r0cyzzaBvzbCP3n2z0ejfzZhb5tIz1gULyYxD81L32jlXxWQD0fDz/9e/2pHbxVQD4p37////6y7LyXAvyYgfyYAD3mmr+7+f/+PX4sIz6xKn949X//fv5tpT2lWD6vp/82MX2ilH6u5f/IJGnAAAAsUlEQVR4Aa3QRQICMQwAwKbGurv7/3+IO6RorhMnfwpQIVXVMS5QlCtNx1BIw7Qkhtx2XGQstTw/COmTUgChh1GcuKkAuL0KhJXlelHGVQ15bulbATgScFbUTdvF2yjtfuVoBK5xiMZpj21TF/MWrybq57Zy1/bhFaC7dWzn6fP/Smvu+hB7r76908VQaO2wRfx9OY7NnKFIF2bhaJgoAg00XWIoCwUShwuChqdCTt6PDYnJCiCBXAYSAAAAAElFTkSuQmCC",
          createdAt:"23 November 2024",
          banner:"https://v1.kopernik.info/pictures/partner/1565145929497_3335.png",
          projects: [
            {
              id: 4,
              name: "Nutritious Meal Programs",
              description: "Campaigns providing nutritious meals and promoting health education to reduce child malnutrition.",
            },
            {
              id: 5,
              name: "Clean Water Access Project",
              description: "Building and maintaining clean water facilities in rural areas.",
            },
            {
              id: 6,
              name: "Disaster Relief and Preparedness",
              description: "Assistance for communities affected by natural disasters like floods and earthquakes.",
            },
          ],
        },
        {
          id: 3,
          name: "Kopernik",
          description: "Identifying, testing, and distributing technology-based solutions that address poverty-related issues.",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHHg8FVlt_mvGfLwHxk4cXMtKmUSA7wO0d0A&s",
          createdAt:"23 November 2024",
          banner:"https://v1.kopernik.info/pictures/website/thumbnails/medium_854118971528794129334_9176.png",
          projects: [
            {
              id: 7,
              name: "Tech for Fishers",
              description: "Programs that help local fishers improve their catch through sustainable practices and tech support.",
            },
            {
              id: 8,
              name: "Clean Cookstoves",
              description: "Providing rural communities with eco-friendly stoves to reduce indoor air pollution.",
            },
            {
              id: 9,
              name: "Waste Recycling Initiatives",
              description: "Promoting recycling and sustainable waste management in rural areas.",
            },
          ],
        },
        {
          id: 4,
          name: "Indonesia Mengajar",
          description: "Improving education in remote areas by deploying young professionals as volunteer teachers.",
          logo: "https://yt3.googleusercontent.com/ytc/AIdro_nAgNsHMyXMD30UOrKR5lmRJtDZJfHStZg85-1Rn2S8sw=s900-c-k-c0x00ffffff-no-rj",
          createdAt:"23 November 2024",
          banner:"https://aniesbaswedan.com/storage/2023/11/anies-legacy-in-indonesia-mengajar-movement-1.webp",
          projects: [
            {
              id: 10,
              name: "Volunteer Teaching Program",
              description: "Sending young volunteers to remote villages to serve as teachers for a year.",
            },
            {
              id: 11,
              name: "School Supplies and Infrastructure Support",
              description: "Providing learning materials and improving school facilities in remote areas.",
            },
            {
              id: 12,
              name: "Community Teacher Training",
              description: "Training community members to become teachers and mentors.",
            },
          ],
        },
    ];

    useEffect(() => {
        if (id) {
            const foundInstitute = institutes.find((institute) => institute.id === parseInt(id as string));
            setInstitute(foundInstitute || null);
        }
    }, [id]);

    if (!institute) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="">
            <div
                className="relative w-full h-48 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('${institute.banner}')`,
                }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            <div className='p-5 px-10'>
                <div className="mt-8">
                    <div className="flex items-center mb-6">
                        <div className="w-16 h-16 mr-4">
                            <img src={institute.logo} alt="" />
                            
                            </div>
                        <div>
                            <h1 className="text-4xl font-bold">{institute.name}</h1>
                            <p className="text-xl text-gray-600 mt-2">{institute.description}</p>
                            <p className="text-sm text-gray-500 mt-2">Created on: {institute.createdAt}</p>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-300" />

                <div>
                    <h3 className="text-2xl font-semibold mb-4">Projects / Activities:</h3>

                    <div className="flex space-x-6 overflow-x-auto py-4">
                        {institute.projects.map((project) => (
                            <div key={project.id} className="min-w-max bg-white p-6 rounded-lg shadow-md flex-shrink-0 w-72">
                                <h4 className="text-lg font-semibold mb-2">{project.name}</h4>
                                <p className="text-gray-600">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstituteDetail;

'use client'
import React, { useState } from "react";
import { FaGlobe, FaCity, FaRocket } from 'react-icons/fa'; // import icons from react-icons

const Institute = () => {
  const [selectedInstitute, setSelectedInstitute] = useState(null);

  const institutes = [
    {
      id: 1,
      name: "Global Health Institute",
      description: "An institute focused on improving health worldwide through technology and research.",
      logo: <FaGlobe className="text-blue-500 text-3xl mr-4" />,
      projects: [
        {
          id: 1,
          name: "AI-based Medical Diagnosis",
          description: "A comprehensive project aimed at improving medical diagnoses through AI.",
        },
        {
          id: 2,
          name: "Water Purification for All",
          description: "A project focused on bringing clean water to communities in need.",
        },
      ],
    },
    {
      id: 2,
      name: "Smart Cities Institute",
      description: "An institute dedicated to advancing technology for the development of smart cities.",
      logo: <FaCity className="text-green-500 text-3xl mr-4" />,
      projects: [
        {
          id: 3,
          name: "Smart City Development",
          description: "A project aiming to develop smart cities with IoT and sustainable technologies.",
        },
      ],
    },
    {
      id: 3,
      name: "Space Exploration Institute",
      description: "An institute pushing the boundaries of space exploration with cutting-edge technology.",
      logo: <FaRocket className="text-red-500 text-3xl mr-4" />,
      projects: [
        {
          id: 4,
          name: "Space Exploration Initiative",
          description: "A project focused on advancing space exploration and technology.",
        },
      ],
    },
  ];

  const handleInstituteClick = (institute) => {
    setSelectedInstitute(institute);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Institutes</h1>

      {selectedInstitute ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedInstitute.logo}
            {selectedInstitute.name}
          </h2>
          <p className="text-gray-700 mb-6">{selectedInstitute.description}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Projects</h3>
          <ul className="space-y-4">
            {selectedInstitute.projects.map((project) => (
              <li key={project.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-800">{project.name}</h4>
                <p className="text-gray-600">{project.description}</p>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setSelectedInstitute(null)}
            className="mt-6 text-blue-500 hover:underline"
          >
            Back to Institutes
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          {institutes.map((institute) => (
            <div
              key={institute.id}
              onClick={() => handleInstituteClick(institute)}
              className="bg-white p-6 mb-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center">
                {institute.logo}
                <h2 className="text-2xl font-semibold text-gray-800">{institute.name}</h2>
              </div>
              <p className="text-gray-600">{institute.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Institute;

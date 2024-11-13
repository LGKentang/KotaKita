"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Sample data for project details, budget allocation, and funding logs
const projectDetails = {
  1: { 
    name: "AI-based Medical Diagnosis",
    description: "A comprehensive project aimed at improving medical diagnoses through AI.",
    details: "The project will focus on developing algorithms to detect early signs of diseases.",
    budgetAllocation: {
      taxes: 5000000,
      governmentGrant: 3000000,
      privateFunding: 7000000,
      donations: 2000000,
    },
    fundingLogs: {
      taxes: "Funded by the government to support medical research.",
      governmentGrant: "Government grant received for AI-based healthcare solutions.",
      privateFunding: "Private companies funding the project for its potential applications.",
      donations: "Donations from medical organizations and philanthropists.",
    }
  },
  2: {
    name: "Smart City Development",
    description: "A project aiming to develop smart cities with IoT and sustainable technologies.",
    details: "This project focuses on creating urban areas that leverage technology to improve infrastructure, transportation, and energy efficiency.",
    budgetAllocation: {
      taxes: 10000000,
      governmentGrant: 15000000,
      privateFunding: 20000000,
      donations: 5000000,
    },
    fundingLogs: {
      taxes: "Government-funded to support smart city initiatives.",
      governmentGrant: "Grant allocated for development of smart infrastructure and transportation systems.",
      privateFunding: "Investments from technology companies interested in building smart cities.",
      donations: "Donations to support eco-friendly urban projects and research.",
    }
  },
  3: {
    name: "Space Exploration Initiative",
    description: "A project focused on advancing space exploration and technology.",
    details: "The initiative aims to push the boundaries of space technology with the goal of sending humans to Mars and beyond.",
    budgetAllocation: {
      taxes: 5000000,
      governmentGrant: 15000000,
      privateFunding: 30000000,
      donations: 5000000,
    },
    fundingLogs: {
      taxes: "Government funding to advance scientific space research.",
      governmentGrant: "A large grant for exploring the viability of interplanetary travel.",
      privateFunding: "Contributions from private space companies to explore commercial opportunities.",
      donations: "Donations from space enthusiasts and organizations supporting exploration.",
    }
  },
  4: {
    name: "Clean Energy Solutions",
    description: "A project to develop sustainable clean energy technologies for a greener future.",
    details: "This project focuses on finding innovative solutions to provide clean, renewable energy to communities and reduce carbon footprints.",
    budgetAllocation: {
      taxes: 15000000,
      governmentGrant: 20000000,
      privateFunding: 40000000,
      donations: 10000000,
    },
    fundingLogs: {
      taxes: "Funded by the government to support renewable energy projects and reduce dependency on fossil fuels.",
      governmentGrant: "Substantial government grant for clean energy research and infrastructure.",
      privateFunding: "Private sector investments in renewable energy technologies and their commercialization.",
      donations: "Philanthropic organizations contributing to the development of sustainable solutions.",
    }
  },
  5: {
    name: "Water Purification for All",
    description: "A project focused on bringing clean water to communities in need.",
    details: "This initiative works to develop affordable water purification technologies to provide safe drinking water to underserved areas.",
    budgetAllocation: {
      taxes: 4000000,
      governmentGrant: 15000000,
      privateFunding: 25000000,
      donations: 10000000,
    },
    fundingLogs: {
      taxes: "Government taxes allocated for improving water infrastructure in rural areas.",
      governmentGrant: "Grants for funding water purification systems in regions with water scarcity.",
      privateFunding: "Private companies providing financial support to scale water filtration technologies.",
      donations: "Generous donations from organizations focused on providing access to clean water.",
    }
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>(); // Explicitly type `id` as a string
  const [project, setProject] = useState(null);

  // Fetch project details based on id
  useEffect(() => {
    if (id && projectDetails[id]) {
      setProject(projectDetails[id]);
    } else {
      setProject(null); // Project not found or still loading
    }
  }, [id]);

  if (!project) {
    return <div>Loading project details...</div>;
  }

  // Prepare data for the pie chart
  const pieData = {
    labels: Object.keys(project.budgetAllocation),
    datasets: [
      {
        data: Object.values(project.budgetAllocation),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.name}</h1>
        <p className="text-gray-700 mb-6">{project.description}</p>
        <p className="text-gray-700 mb-6">{project.details}</p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Allocation</h2>
        <div className="w-full h-64 mb-6">
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Funding Sources</h3>
          <ul className="space-y-4">
            {Object.keys(project.budgetAllocation).map((funding, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-800">{funding.charAt(0).toUpperCase() + funding.slice(1)}</h4>
                <p className="text-gray-600">{project.fundingLogs[funding]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

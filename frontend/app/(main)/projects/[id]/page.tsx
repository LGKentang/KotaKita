'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for project details, budget allocation, and funding logs
interface BudgetAllocation {
  taxes: number;
  governmentGrant: number;
  privateFunding: number;
  donations: number;
}

interface FundingLogs {
  taxes: string;
  governmentGrant: string;
  privateFunding: string;
  donations: string;
}

interface ProjectDetailType {
  name: string;
  description: string;
  details: string;
  budgetAllocation: BudgetAllocation;
  fundingLogs: FundingLogs;
}

// Sample data for project details
const projectDetails: { [key: string]: ProjectDetailType } = {
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
    },
  },
  // ... other projects here
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Explicitly type `id` as a string
  const [project, setProject] = useState<ProjectDetailType | null>(null);

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
                <p className="text-gray-600">{project.fundingLogs[funding as keyof FundingLogs]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

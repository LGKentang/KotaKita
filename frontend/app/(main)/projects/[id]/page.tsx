'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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

interface Comment {
  author: string;
  text: string;
  date: string;
}

interface Update {
  date: string;
  description: string;
  progress: number;
}

interface ProjectDetailType {
  name: string;
  description: string;
  details: string;
  institute: string;
  budgetAllocation: BudgetAllocation;
  fundingLogs: FundingLogs;
  imageUrl: string;
  progress: number;
  status: string;
  comments: Comment[];
  updates: Update[];
}

const projectDetails: { [key: string]: ProjectDetailType } = {
  1: {
    name: "Rumah Belajar",
    description: "Pusat-pusat yang menyediakan pendidikan alternatif dan pelatihan keterampilan vokasi untuk kaum muda kurang mampu.",
    details: "Program yang membantu anak muda dari keluarga kurang mampu.",
    institute: "Yayasan Cinta Anak Bangsa (YCAB Foundation)",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm6aRWTCS4iKzmvwqDkNW0s2UXEqc3kVougw&s",
    budgetAllocation: {
      taxes: 1000000,
      governmentGrant: 2000000,
      privateFunding: 500000,
      donations: 1500000,
    },
    fundingLogs: {
      taxes: "Funded on Jan 5, 2024, by the government to support education.",
      governmentGrant: "Grant provided on Feb 10, 2024, for alternative education.",
      privateFunding: "Private funding received from a corporation on Mar 15, 2024.",
      donations: "Donation received on Apr 20, 2024, from a non-profit organization.",
    },
    progress: 60,
    status: "In Progress",
    comments: [
      { author: "John Doe", text: "This project is amazing!", date: "2024-04-15" },
      { author: "Jane Smith", text: "Can't wait to see the results.", date: "2024-05-01" }
    ],
    updates: [
      { date: "2024-03-10", description: "Project initiated.", progress: 10 },
      { date: "2024-04-01", description: "First phase completed.", progress: 30 }
    ]
  },
  2: {
    name: "Bantuan Pinjaman untuk UMKM",
    description: "Pembiayaan mikro untuk keluarga dalam rangka meningkatkan kondisi ekonomi mereka.",
    details: "Program yang menyediakan bantuan keuangan bagi UMKM.",
    institute: "Bank Nasional Indonesia",
    imageUrl: "https://propseva.com/wp-content/uploads/2023/02/Home-Loan.jpg",
    budgetAllocation: {
      taxes: 800000,
      governmentGrant: 1200000,
      privateFunding: 600000,
      donations: 1000000,
    },
    fundingLogs: {
      taxes: "Funded on Mar 2, 2024, through national taxes for UMKM support.",
      governmentGrant: "Received on Mar 20, 2024, for small business development.",
      privateFunding: "Investment from private sector on Apr 5, 2024.",
      donations: "Community donation received on Apr 18, 2024.",
    },
    progress: 75,
    status: "In Progress",
    comments: [
      { author: "Alex Johnson", text: "This project has great potential!", date: "2024-04-25" },
      { author: "Mark Wilson", text: "Excited to see its impact on local businesses.", date: "2024-05-05" }
    ],
    updates: [
      { date: "2024-03-12", description: "Initial funds raised.", progress: 20 },
      { date: "2024-04-10", description: "Received first government grant.", progress: 50 }
    ]
  },
  3: {
    name: "Pembangunan Puskesmas",
    description: "Pengembangan pusat kesehatan untuk menyediakan layanan kesehatan yang terjangkau.",
    details: "Fasilitas ini membantu meningkatkan akses masyarakat terhadap layanan kesehatan.",
    institute: "Kementerian Kesehatan",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjqF9RVzZGyQoMDL9oeWuUMZpo8ts4RmigQ&s",
    budgetAllocation: {
      taxes: 1500000,
      governmentGrant: 2500000,
      privateFunding: 700000,
      donations: 900000,
    },
    fundingLogs: {
      taxes: "Funded on Jan 20, 2024, by local government.",
      governmentGrant: "Grant provided on Feb 15, 2024, for healthcare support.",
      privateFunding: "Private funds added on Mar 10, 2024.",
      donations: "Donation received on Apr 5, 2024.",
    },
    progress: 40,
    status: "In Planning",
    comments: [
      { author: "Sarah Lee", text: "A very important initiative for the community.", date: "2024-04-12" },
      { author: "Tom Hardy", text: "Hope this will provide good healthcare to underserved areas.", date: "2024-05-02" }
    ],
    updates: [
      { date: "2024-01-30", description: "Initial project concept designed.", progress: 5 },
      { date: "2024-03-05", description: "First round of funding secured.", progress: 25 }
    ]
  },
  4: {
    name: "Rehabilitasi Sungai",
    description: "Program untuk membersihkan dan merehabilitasi sungai yang tercemar.",
    details: "Inisiatif ini bertujuan untuk mengurangi pencemaran dan menjaga keberlanjutan lingkungan.",
    institute: "Kementerian Lingkungan Hidup",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDtG9AyzfzCtk4GrkDhs1oZn5SwwS2g8Yqg&s",
    budgetAllocation: {
      taxes: 500000,
      governmentGrant: 1500000,
      privateFunding: 400000,
      donations: 700000,
    },
    fundingLogs: {
      taxes: "Funded on Feb 10, 2024, by national taxes for environmental cleanup.",
      governmentGrant: "Received on Mar 1, 2024, to support river rehabilitation.",
      privateFunding: "Private sponsorship received on Mar 20, 2024.",
      donations: "Public donations received on Apr 10, 2024.",
    },
    progress: 50,
    status: "In Progress",
    comments: [
      { author: "James Taylor", text: "A vital program for our environment.", date: "2024-04-08" },
      { author: "Emma Davis", text: "I hope this can be expanded to more rivers.", date: "2024-05-05" }
    ],
    updates: [
      { date: "2024-02-15", description: "Phase 1 of cleanup started.", progress: 15 },
      { date: "2024-03-18", description: "Second phase completed, river bank restoration.", progress: 40 }
    ]
  },
  5: {
    name: "Pendidikan Digital untuk Desa",
    description: "Pelatihan teknologi untuk anak muda di desa agar mereka dapat mengakses peluang digital.",
    details: "Program ini memberikan pelatihan keterampilan digital untuk pemuda di daerah pedesaan.",
    institute: "Komunitas Peduli Teknologi",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-mZDv6nKKkHgxo39niGTBwCV0nehtSOJdA&s",
    budgetAllocation: {
      taxes: 600000,
      governmentGrant: 1300000,
      privateFunding: 300000,
      donations: 1100000,
    },
    fundingLogs: {
      taxes: "Funded on Mar 5, 2024, by local government.",
      governmentGrant: "Grant allocated on Mar 18, 2024, to provide digital education.",
      privateFunding: "Corporate sponsorship received on Apr 2, 2024.",
      donations: "Public donations collected on Apr 15, 2024.",
    },
    progress: 80,
    status: "In Progress",
    comments: [
      { author: "Linda White", text: "Such an amazing initiative for rural youth.", date: "2024-04-30" },
      { author: "Chris Black", text: "This will open new doors for so many people.", date: "2024-05-02" }
    ],
    updates: [
      { date: "2024-03-12", description: "Training sessions began in remote villages.", progress: 25 },
      { date: "2024-04-15", description: "50% of youth trained in digital literacy.", progress: 50 }
    ]
  },
  6: {
    name: "Rehabilitasi Hutan",
    description: "Rehabilitasi hutan tropis untuk memulihkan ekosistem dan keanekaragaman hayati.",
    details: "Program ini bertujuan untuk memperbaiki kualitas lingkungan dan mencegah bencana alam.",
    institute: "Badan Restorasi Ekosistem",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_2G6SLOuKp5D9qgVjID4P3LhRzgV49dMwXs&s",
    budgetAllocation: {
      taxes: 2000000,
      governmentGrant: 3000000,
      privateFunding: 1000000,
      donations: 500000,
    },
    fundingLogs: {
      taxes: "Funded on Feb 25, 2024, by environmental taxes.",
      governmentGrant: "Received on Mar 12, 2024, for ecosystem restoration.",
      privateFunding: "Private donation received on Apr 5, 2024.",
      donations: "Public support and donations received on Apr 18, 2024.",
    },
    progress: 70,
    status: "In Progress",
    comments: [
      { author: "Lara Green", text: "This is a great effort to preserve our planet.", date: "2024-04-22" },
      { author: "Daniel Scott", text: "Hoping to see more areas restored.", date: "2024-05-03" }
    ],
    updates: [
      { date: "2024-02-20", description: "First trees planted in the affected areas.", progress: 15 },
      { date: "2024-03-25", description: "More areas covered with new vegetation.", progress: 40 }
    ]
  },
};


const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id && projectDetails[id]) {
      setProject(projectDetails[id]);
    } else {
      setProject(null);
    }
  }, [id]);

  const handleAddComment = () => {
    if (project && newComment) {
      const comment: Comment = {
        author: "Anonymous",
        text: newComment,
        date: new Date().toLocaleDateString(),
      };
      setProject({
        ...project,
        comments: [...project.comments, comment],
      });
      setNewComment("");
    }
  };

  if (!project) {
    return <div>Loading project details...</div>;
  }

  const pieData = {
    labels: Object.keys(project.budgetAllocation),
    datasets: [
      {
        data: Object.values(project.budgetAllocation),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project Overview and Progress */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
          <h3 className="text-lg font-medium text-gray-500">Hosted by: {project.institute}</h3>
          <img src={project.imageUrl} alt={project.name} className="rounded-lg shadow-md w-full h-64 object-cover" />
          <p className="text-gray-700">{project.description}</p>
          <p className="text-gray-700">{project.details}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">Project Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
            <p className="text-gray-600">{project.progress}% completed</p>
            <p className="text-gray-600">Status: {project.status}</p>
          </div>
        </div>

        {/* Budget Allocation and Funding Logs */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Budget Allocation</h2>
          <div className="w-full h-64">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800">Funding Sources</h3>
          <ul className="space-y-4">
            {Object.keys(project.budgetAllocation).map((funding, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-800">
                  {funding.charAt(0).toUpperCase() + funding.slice(1)} - ${project.budgetAllocation[funding as keyof BudgetAllocation].toLocaleString()}
                </h4>
                <p className="text-gray-600">{project.fundingLogs[funding as keyof FundingLogs]}</p>
              </li>
            ))}
          </ul>
        </div>

{/* Comments and Updates Sections */}
<div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2">
  {/* Left Column - Comments */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
    <ul className="space-y-4">
      {project.comments.map((comment, index) => (
        <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="font-bold text-gray-800">{comment.author}</p>
          <p className="text-gray-600">{comment.date}</p>
          <p className="text-gray-700">{comment.text}</p>
        </li>
      ))}
    </ul>
    <input
      type="text"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Add a comment"
      className="w-full p-2 rounded-lg border border-gray-300 mb-2"
    />
    <button
      onClick={handleAddComment}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
    >
      Post Comment
    </button>
  </div>

  {/* Right Column - Updates */}
  <div className="space-y-4"> {/* Remove any possible left margin or padding */}
    <h3 className="text-lg font-semibold text-gray-800">Updates</h3>
    <ul className="space-y-4">
      {project.updates.map((update, index) => (
        <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 font-semibold">{update.date}</p>
          <p className="text-gray-700">{update.description}</p>
          <p className="text-gray-500">Progress: {update.progress}%</p>
        </li>
      ))}
    </ul>
  </div>
</div>


      </div>
    </div>
  );
};

export default ProjectDetail;

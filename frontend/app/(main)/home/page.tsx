import React from "react";
import Link from "next/link";

// Sample data for ongoing petitions and projects
const ongoingPetitions = [
  { 
    id: 1, 
    title: "Petition for Climate Change Action", 
    description: "Support the movement to fight climate change.", 
    upvotes: 350, 
    downvotes: 50,
    image: "https://picsum.photos/200/300?random=1"
  },
  { 
    id: 2, 
    title: "Petition for Affordable Healthcare", 
    description: "Make healthcare affordable for everyone.", 
    upvotes: 500, 
    downvotes: 30,
    image: "https://picsum.photos/200/300?random=2"
  },
  { 
    id: 3, 
    title: "Petition for Free Education", 
    description: "Support free education for all students.", 
    upvotes: 1200, 
    downvotes: 200,
    image: "https://picsum.photos/200/300?random=3"
  },
  { 
    id: 4, 
    title: "Petition for Animal Rights", 
    description: "Fight for the rights of animals around the world.", 
    upvotes: 900, 
    downvotes: 60,
    image: "https://picsum.photos/200/300?random=4"
  },
  { 
    id: 5, 
    title: "Petition for Mental Health Awareness", 
    description: "Help raise awareness for mental health issues.", 
    upvotes: 450, 
    downvotes: 50,
    image: "https://picsum.photos/200/300?random=5"
  },
];

const ongoingProjects = [
  { 
    id: 1, 
    name: "AI-based Medical Diagnosis", 
    description: "A project to enhance medical diagnoses using AI.", 
    currentFunding: 12444444, 
    goalFunding: 100000000, 
    image: "https://picsum.photos/200/300?random=6"
  },
  { 
    id: 2, 
    name: "Smart City Development", 
    description: "A project aiming to develop smart cities with IoT.", 
    currentFunding: 5444444, 
    goalFunding: 100000000, 
    image: "https://picsum.photos/200/300?random=7"
  },
  { 
    id: 3, 
    name: "Space Exploration Initiative", 
    description: "A project focused on advancing space exploration.", 
    currentFunding: 20000000, 
    goalFunding: 50000000, 
    image: "https://picsum.photos/200/300?random=8"
  },
  { 
    id: 4, 
    name: "Clean Energy Solutions", 
    description: "A project to develop sustainable clean energy technologies.", 
    currentFunding: 10000000, 
    goalFunding: 200000000, 
    image: "https://picsum.photos/200/300?random=9"
  },
  { 
    id: 5, 
    name: "Water Purification for All", 
    description: "A project focused on bringing clean water to communities.", 
    currentFunding: 3500000, 
    goalFunding: 50000000, 
    image: "https://picsum.photos/200/300?random=10"
  },
];

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Welcome to Kotakita</h1>
        <p className="text-lg text-gray-600">
          Empowering change through petitions and innovative projects.
        </p>
      </div>

      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ongoing Petitions</h2>
        <div className="flex overflow-x-auto space-x-6">
          {ongoingPetitions.map((petition) => (
            <Link href={`/petitions/${petition.id}`} key={petition.id}>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 min-w-[280px]">
                <img src={petition.image} alt={petition.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{petition.title}</h3>
                <p className="text-gray-600 mb-4">{petition.description}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Upvotes: {petition.upvotes}</span>
                  <span>Downvotes: {petition.downvotes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ongoing Projects Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ongoing Projects</h2>
        <div className="flex overflow-x-auto space-x-6">
          {ongoingProjects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 min-w-[280px]">
                <img src={project.image} alt={project.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Funding Progress:</span>
                  <span className="text-sm text-gray-600">
                    Rp{project.currentFunding.toLocaleString()} / Rp{project.goalFunding.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{
                      width: `${(project.currentFunding / project.goalFunding) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

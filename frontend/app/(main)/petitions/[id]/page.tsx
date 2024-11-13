"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Sample data for ongoing petitions
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

const PetitionDetail = () => {
  const { id } = useParams<{ id: string }>(); // Explicitly type `id` as a string
  const [petition, setPetition] = useState<any>(null);

  // Fetch petition details based on id
  useEffect(() => {
    if (id && ongoingPetitions.find(petition => petition.id.toString() === id)) {
      setPetition(ongoingPetitions.find(petition => petition.id.toString() === id));
    } else {
      setPetition(null); // Petition not found or still loading
    }
  }, [id]);

  if (!petition) {
    return <div>Loading petition details...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{petition.title}</h1>
        <p className="text-gray-700 mb-6">{petition.description}</p>

        <div className="mb-6">
          <img src={petition.image} alt={petition.title} className="w-full h-64 object-cover rounded-lg" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Votes</h2>
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="font-bold text-green-500">Upvotes: {petition.upvotes}</h3>
          </div>
          <div>
            <h3 className="font-bold text-red-500">Downvotes: {petition.downvotes}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetitionDetail;

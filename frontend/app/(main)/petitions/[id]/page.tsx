"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetPetition } from "@/libs/actions/petitions.action";
import { IPetition } from "@/libs/types/petition.type";

const PetitionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [petition, setPetition] = useState<IPetition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetition = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetPetition(Number(id));
        console.log(data);
        setPetition(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load petition details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPetition();
    }
  }, [id]); // Fetch petition when the id changes

  if (loading) {
    return <div>Loading petition details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!petition) {
    return <div>Petition not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{petition.title}</h1>
        <p className="text-gray-700 mb-6">{petition.description}</p>

        <div className="mb-6">
          <img src={`${process.env.NEXT_PUBLIC_BACKEND_URI_IMAGE}${petition.thumbnail_url}`} alt={petition.title} className="w-full h-64 object-cover rounded-lg" />
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

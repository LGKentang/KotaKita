'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { GetAllPetitions } from "@/libs/actions/petitions.action";
import { IPetition } from "@/libs/types/petition.type";
import { downvotePetition, fetchVotes, upvotePetition } from "@/libs/actions/vote.action";

const getVotePercentage = (upvotes: number, downvotes: number) => {
    const totalVotes = upvotes + downvotes;
    const upvotePercentage = (upvotes / totalVotes) * 100;
    const downvotePercentage = (downvotes / totalVotes) * 100;
    return { upvotePercentage, downvotePercentage };
};

const Petition: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"likes" | "dislikes">("likes");
    const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [dateOrder, setDateOrder] = useState<"newest" | "oldest">("newest");
    const [petitions, setPetitions] = useState<IPetition[]>([]);
    const [userVotes, setUserVotes] = useState<Map<number, string>>(new Map());

    useEffect(() => {
        const fetchPetitions = async () => {
            try {
                // Fetch petitions once when the component mounts
                const petitionsData = await GetAllPetitions();
                setPetitions(petitionsData);
            } catch (err) {
                console.error(err);
            }
        };
    
        const fetchUserVotes = async () => {
            try {
                // Check for token in localStorage (indicating user is logged in)
                const token = localStorage.getItem("token");
                if (token) {
                    // If token exists, fetch user votes
                    const votes = await fetchVotes(token);
                    setUserVotes(votes);
                }
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchPetitions();
        fetchUserVotes();
    }, []); // Empty dependency array, so this runs only once after the initial render
    
    const handleVote = async (voteType: 'upvote' | 'downvote', petitionId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Handle case for guest users (if needed)
            return;
        }
    
        // Find the petition to update
        const petitionToUpdate = petitions.find(petition => petition.id === petitionId);
        if (!petitionToUpdate) return;
    
        // Save the previous upvotes and downvotes before updating
        const previousUpvotes = petitionToUpdate.upvotes;
        const previousDownvotes = petitionToUpdate.downvotes;
    
        // Determine if the user is switching votes
        const currentVote = userVotes.get(petitionId);
        
        // Update the vote counts based on the current vote and the new vote
        if (voteType === 'upvote') {
            if (currentVote === 'downvote') {
                petitionToUpdate.downvotes -= 1; // Remove downvote
            }
            petitionToUpdate.upvotes += 1; // Add upvote
        } else if (voteType === 'downvote') {
            if (currentVote === 'upvote') {
                petitionToUpdate.upvotes -= 1; // Remove upvote
            }
            petitionToUpdate.downvotes += 1; // Add downvote
        }
    
        // Optimistically update the petition's vote count
        setPetitions([...petitions]);
    
        // Optimistically update the user's vote
        setUserVotes((prevVotes) => new Map(prevVotes).set(petitionId, voteType));
    
        try {
            // Send the vote to the server
            const success = voteType === 'upvote'
                ? await upvotePetition(token, petitionId)
                : await downvotePetition(token, petitionId);
    
            if (!success) {
                // If the vote submission fails, revert the optimistic vote changes
                setPetitions(prevPetitions => prevPetitions.map(petition =>
                    petition.id === petitionId
                        ? { ...petition, upvotes: previousUpvotes, downvotes: previousDownvotes }
                        : petition
                ));
                setUserVotes((prevVotes) => {
                    const updatedVotes = new Map(prevVotes);
                    updatedVotes.delete(petitionId); // Remove the optimistic vote
                    return updatedVotes;
                });
                console.error('Failed to submit vote');
            }
        } catch (err) {
            // Handle errors and revert optimistic changes
            setPetitions(prevPetitions => prevPetitions.map(petition =>
                petition.id === petitionId
                    ? { ...petition, upvotes: previousUpvotes, downvotes: previousDownvotes }
                    : petition
            ));
            setUserVotes((prevVotes) => {
                const updatedVotes = new Map(prevVotes);
                updatedVotes.delete(petitionId); // Remove the optimistic vote
                return updatedVotes;
            });
            console.error('Error submitting vote', err);
        }
    };
    
    



    // console.log(userVotes)
    const toggleStatusFilter = (status: string) => {
        setSelectedStatuses((prevStatuses) =>
            prevStatuses.includes(status)
                ? prevStatuses.filter((s) => s !== status)
                : [...prevStatuses, status]
        );
    };

    const filteredPetitions = petitions
        .filter((petition) =>
            petition.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((petition) =>
            selectedStatuses.length ? selectedStatuses.includes(petition.status) : true
        )
        .sort((a, b) => {
            if (sortOrder === "likes") return b.upvotes - a.upvotes;
            if (sortOrder === "dislikes") return b.downvotes - a.downvotes;
            if (dateOrder === "newest")
                return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
            return new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime();
        });

    return (
        <div className="bg-gray-100 min-h-screen py-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-10">Ongoing Petitions</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search petitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 mb-4 w-3/4 md:w-1/2 lg:w-1/3 border border-gray-300 rounded-lg"
            />

            {/* Filter Button */}
            <div className="relative mb-6">
                <button
                    onClick={() => setShowFilterOptions(!showFilterOptions)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    <MdFilterList className="text-xl" />
                    <span>Filter</span>
                </button>

                {/* Filter Options Dropdown */}
                {showFilterOptions && (
                    <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 w-max bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4 flex flex-row gap-10">
                        {/* Sort by Likes/Dislikes */}
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold mb-2">Sort by:</p>
                            <button
                                onClick={() => setSortOrder("likes")}
                                className={`w-full text-left px-4 py-2 mb-2 ${sortOrder === "likes" ? "bg-blue-100" : "hover:bg-gray-100"}`}
                            >
                                Most Likes
                            </button>
                            <button
                                onClick={() => setSortOrder("dislikes")}
                                className={`w-full text-left px-4 py-2 ${sortOrder === "dislikes" ? "bg-blue-100" : "hover:bg-gray-100"}`}
                            >
                                Most Dislikes
                            </button>
                        </div>

                        {/* Filter by Status */}
                        <div>
                            <p className="text-lg font-semibold mb-2">Filter by Status:</p>
                            {["Active", "Pending Review", "Closed"].map((status) => (
                                <label key={status} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedStatuses.includes(status)}
                                        onChange={() => toggleStatusFilter(status)}
                                    />
                                    <span>{status}</span>
                                </label>
                            ))}
                        </div>

                        {/* Filter by Submission Date */}
                        <div>
                            <p className="text-lg font-semibold">Filter by Date:</p>
                            <button
                                onClick={() => setDateOrder("newest")}
                                className={`w-full text-left px-4 py-2 ${dateOrder === "newest" ? "bg-blue-100" : "hover:bg-gray-100"}`}
                            >
                                Newest First
                            </button>
                            <button
                                onClick={() => setDateOrder("oldest")}
                                className={`w-full text-left px-4 py-2 ${dateOrder === "oldest" ? "bg-blue-100" : "hover:bg-gray-100"}`}
                            >
                                Oldest First
                            </button>
                        </div>
                    </div>
                )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5">
                {filteredPetitions.map((petition) => {
                    const { upvotePercentage, downvotePercentage } = getVotePercentage(
                        petition.upvotes,
                        petition.downvotes
                    );
                    const userVote = userVotes.get(petition.id);
                    return (
                  
                            <div key={petition.id} className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                {/* Petition Content */}

                                <img
                                    src={petition.thumbnail_url.startsWith('http') || petition.thumbnail_url.startsWith('https')
                                        ? petition.thumbnail_url
                                        : `${process.env.NEXT_PUBLIC_BACKEND_URI_IMAGE}${petition.thumbnail_url}`}
                                    alt={petition.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />

                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{petition.title}</h2>
                                <p className="text-gray-600 mb-1">
                                    Status: <span className="font-medium">{petition.status}</span>
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Submitted on: <span className="font-medium">{petition.submissionDate}</span>
                                </p>

                                {/* Like vs Dislike Bar */}
                                <div className="w-full h-4 bg-gray-200 rounded-full flex flex-row overflow-hidden mb-4">
                                    <div style={{ width: `${upvotePercentage}%` }} className="bg-green-500 h-full"></div>
                                    <div style={{ width: `${downvotePercentage}%` }} className="bg-red-500 h-full"></div>
                                </div>

                                {/* Petition Link */}
                                <Link href={`/petitions/${petition.id}`}>
                                    <span className="text-blue-500 underline">View Petition</span>
                                </Link>

                                {/* Vote Buttons */}
                                <div className="flex items-center justify-between mt-4">
                                    {/* Upvote */}
                                    <div className="flex items-center text-green-600">
                                        <button
                                            disabled={userVote === 'upvote'} // Disable if the user already upvoted
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the click from propagating to the parent div
                                                handleVote('upvote', petition.id); // Pass petition.id to handleVote
                                            }}
                                            className={`mr-1 ${userVote === 'upvote' ? 'text-green-500' : ''}`}
                                        >
                                            {userVote === 'upvote' ? <FaThumbsUp /> : <FaRegThumbsUp />}
                                        </button>
                                        <span>{petition.upvotes}</span>
                                    </div>

                                    {/* Downvote */}
                                    <div className="flex items-center text-red-600">
                                        <button
                                            disabled={userVote === 'downvote'} // Disable if the user already downvoted
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the click from propagating to the parent div
                                                handleVote('downvote', petition.id); // Pass petition.id to handleVote
                                            }}
                                            className={`mr-1 ${userVote === 'downvote' ? 'text-red-500' : ''}`}
                                        >
                                            {userVote === 'downvote' ? <FaThumbsDown /> : <FaRegThumbsDown />}
                                        </button>
                                        <span>{petition.downvotes}</span>
                                    </div>
                                </div>
                            </div>


                    
                    );
                })}
            </div>


        </div>
    );
};

export default Petition;

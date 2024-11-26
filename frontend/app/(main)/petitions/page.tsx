"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";

// Define types for Petition data
interface Petition {
    id: number;
    title: string;
    description: string;
    upvotes: number;
    downvotes: number;
    status: "Active" | "Pending Review" | "Closed";
    submissionDate: string;
    image: string;
}

// Sample data for ongoing petitions
const ongoingPetitions = [
    {
        id: 1,
        title: "Petition for Climate Change Action",
        description: "Support the movement to fight climate change.",
        upvotes: 350,
        downvotes: 50,
        status: "Active",
        submissionDate: "2024-01-10",
        image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
    },
    {
        id: 2,
        title: "Petition for Affordable Healthcare",
        description: "Make healthcare affordable for everyone.",
        upvotes: 500,
        downvotes: 30,
        status: "Pending Review",
        submissionDate: "2024-02-15",
        image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
    },
    {
        id: 3,
        title: "Petition for Free Education",
        description: "Support free education for all students.",
        upvotes: 1200,
        downvotes: 200,
        status: "Active",
        submissionDate: "2024-03-20",
        image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
    },
    {
        id: 4,
        title: "Petition for Animal Rights",
        description: "Fight for the rights of animals around the world.",
        upvotes: 900,
        downvotes: 60,
        status: "Closed",
        submissionDate: "2023-12-05",
        image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
    },
    {
        id: 5,
        title: "Petition for Mental Health Awareness",
        description: "Help raise awareness for mental health issues.",
        upvotes: 450,
        downvotes: 50,
        status: "Active",
        submissionDate: "2024-04-01",
        image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
    },
];

// Function to calculate vote percentages
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

    // Function to toggle status filters
    const toggleStatusFilter = (status: string) => {
        setSelectedStatuses((prevStatuses) =>
            prevStatuses.includes(status)
                ? prevStatuses.filter((s) => s !== status)
                : [...prevStatuses, status]
        );
    };

    // Filtered and sorted petitions
    const filteredPetitions = ongoingPetitions
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

            {/* Petition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5">
                {filteredPetitions.map((petition) => {
                    const { upvotePercentage, downvotePercentage } = getVotePercentage(
                        petition.upvotes,
                        petition.downvotes
                    );

                    return (
                        <Link key={petition.id} href={`/petitions/${petition.id}`}>
                            <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                <img
                                    src={petition.image}
                                    alt={petition.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {petition.title}
                                </h2>

                                {/* Petition Details */}
                                <p className="text-gray-600 mb-1">
                                    Status: <span className="font-medium">{petition.status}</span>
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Submitted on:{" "}
                                    <span className="font-medium">{petition.submissionDate}</span>
                                </p>

                                {/* Like vs Dislike Bar */}
                                <div className="w-full h-4 bg-gray-200 rounded-full flex flex-row overflow-hidden mb-4">
                                    <div
                                        style={{ width: `${upvotePercentage}%` }}
                                        className="bg-green-500 h-full"
                                    ></div>
                                    <div
                                        style={{ width: `${downvotePercentage}%` }}
                                        className="bg-red-500 h-full"
                                    ></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-green-600">
                                        <FaThumbsUp className="mr-1" />
                                        <span>{petition.upvotes}</span>
                                    </div>
                                    <div className="flex items-center text-red-600">
                                        <FaThumbsDown className="mr-1" />
                                        <span>{petition.downvotes}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Petition;

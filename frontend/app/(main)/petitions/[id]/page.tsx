"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetPetition } from "@/libs/actions/petitions.action";
import { IPetition } from "@/libs/types/petition.type";
import { Comment } from "@/libs/types/comment.type"; // Import the interface
import { FaThumbsUp, FaThumbsDown, FaComments } from "react-icons/fa";
import { Disclosure } from "@headlessui/react";
import { fetchCommentsByPetitionId, postComment } from "@/libs/actions/comment.action";

const PetitionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [petition, setPetition] = useState<IPetition | null>(null);
  const [comments, setComments] = useState<Comment[]>([]); // Updated state
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPetition = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetPetition(id);
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
      fetchComments();
    }
  }, [id]);

  const fetchComments = async () => {
    if (!id) return;
    try {
      setCommentLoading(true);
      const data = await fetchCommentsByPetitionId(Number(id));
      setComments(data as Comment[]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch comments.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        setCommentLoading(true);
        await postComment({
          petitionId: Number(id),
          message: newComment,
          token: localStorage.getItem("token"),
        });
        setNewComment("");
        fetchComments(); // Refresh comments
      } catch (err) {
        console.error(err);
        setError("Failed to post comment.");
      } finally {
        setCommentLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">Loading petition details...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!petition) {
    return <div className="text-gray-500 text-center mt-10">Petition not found.</div>;
  }

  const upvotePercentage = Math.round(
    (petition.upvotes / (petition.upvotes + petition.downvotes)) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">{petition.title}</h1>

        <div className="w-full mb-6">
          <img
            src={petition.thumbnail_url.startsWith("http") || petition.thumbnail_url.startsWith("https")
              ? petition.thumbnail_url
              : `${process.env.NEXT_PUBLIC_BACKEND_URI_IMAGE}${petition.thumbnail_url}`}
            alt={petition.title}
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        <p className="text-gray-700 leading-relaxed mb-8 text-lg">{petition.description}</p>

        <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Voting Statistics</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-green-500 font-bold text-lg">
              <FaThumbsUp size={24} />
              <span>Upvotes: {petition.upvotes}</span>
            </div>
            <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
              <FaThumbsDown size={24} />
              <span>Downvotes: {petition.downvotes}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 bg-green-500 rounded-full"
                style={{ width: `${upvotePercentage}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-gray-600">
              {upvotePercentage}% Positive Feedback
            </p>
          </div>
        </div>

        {/* Comments Section */}
        {comments && (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    <FaComments size={20} />
                    Comments ({comments.length})
                  </span>
                  <span>{open ? "▲" : "▼"}</span>
                </Disclosure.Button>
                <Disclosure.Panel className="mt-4 space-y-4">
                  {commentLoading ? (
                    <p className="text-center text-gray-500">Loading comments...</p>
                  ) : comments.length > 0 ? (
                    comments.map((comment: Comment) => (
                      <div
                        key={comment.id}
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg flex space-x-4"
                      >
                        <img
                          src={comment.profile_picture_url && (comment.profile_picture_url.startsWith("http") || comment.profile_picture_url.startsWith("https"))
                            ? comment.profile_picture_url
                            : `${process.env.NEXT_PUBLIC_BACKEND_URI_IMAGE}${comment.profile_picture_url}`}
                          alt={comment.name}
                          className="w-14 h-14 object-cover rounded-full border-2 border-gray-200"
                          onError={(e) => e.currentTarget.src = 'https://www.webiconio.com/_upload/255/image_255.svg'} // Fallback to placeholder
                        />
                        <div className="flex flex-col flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-gray-800 font-semibold">{comment.name}</p>
                            <p className="text-sm text-gray-500"> {comment.created_at ? new Date(comment.created_at).toLocaleString() : "Date not available"}</p>
                          </div>
                          <p className="text-gray-700 mt-2">{comment.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No comments yet. Be the first!</p>
                  )}

                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    placeholder="Add your comment..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
                  ></textarea>
                  <button
                    onClick={handleAddComment}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold"
                    disabled={commentLoading}
                  >
                    {commentLoading ? "Submitting..." : "Submit Comment"}
                  </button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}
      </div>
    </div>
  );
};

export default PetitionDetail;

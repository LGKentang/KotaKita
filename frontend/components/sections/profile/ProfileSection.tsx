'use client';

import { Button } from '@/components/shared/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from '@/components/shared/Modal';
import { getUser } from '@/libs/actions/user.action';
import parseImageUrl from '@/libs/utils/parse'; // Ensure this is working correctly
import { User } from '@/libs/types/user.type';

export default function ProfileSection() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Fixed comment syntax
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const data = await getUser(token);

        if (!data) {
          throw new Error('Failed to fetch user profile');
        }

        setUser(data); // Assuming the API response matches UserProfile structure
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  // Fallback image URL for missing or broken images
  const fallbackImage = '/default-avatar.png'; // You can replace this with your own fallback URL

  // Helper function to parse or return a fallback URL if not valid
  const getProfilePictureUrl = (url: string | undefined) => {
    if (!url) {
      return fallbackImage;
    }
    return parseImageUrl(url); // Ensure that `parseImageUrl` works correctly
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading state while user data is being fetched
  }

  return (
    <section className="flex flex-col items-center gap-4 p-6 md:flex-row md:gap-8">
      {/* Profile Image */}
      <button
        onClick={toggleModal}
        aria-label="Change profile picture"
        className="focus:outline-none"
      >
        <Image
          src={getProfilePictureUrl(user.profile_picture_url)}
          alt={`${user.name}'s profile picture`}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </button>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
        <Button onClick={toggleModal} className="border-2 border-black mt-2">
          Change Profile
        </Button>
      </div>
      {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </section>
  );
}

'use client';

import { Button } from '@/components/shared/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from '@/components/shared/Modal';
import { getUser } from '@/libs/actions/user.action';
import parseImageUrl from '@/libs/utils/parse'; // Ensure this is working correctly
import { User } from '@/libs/types/user.type';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAppContext } from '@/app/context';

export default function ProfileSection() {
  const {user, setUser} = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setUser(null); 
        console.error('No token found in localStorage');
        return;
      }

      try {
        const data = await getUser(token);

        if (!data) {
          throw new Error('Failed to fetch user profile');
        }

        setUser(data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const fallbackImage = '/default-avatar.png'; 


const getProfilePictureUrl = (url: string | undefined): string => {
  if (!url) {
    return fallbackImage;
  }
  return parseImageUrl(url); 
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/home'); 
  };

  if (!user) {
    return <div>Loading...</div>;
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
        <Button onClick={logout} className="border-2 border-black mt-2">
          Logout
        </Button>
      </div>
      {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </section>
  );
}

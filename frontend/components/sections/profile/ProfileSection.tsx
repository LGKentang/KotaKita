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
  const { user, setUser } = useAppContext();
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
    <section className="flex flex-col items-center gap-4 p-6 md:flex-row md:gap-8 first-line:p-4 bg-white rounded-md shadow-md border">
      {/* Profile Image */}
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={toggleModal}
          aria-label="Change profile picture"
          className="focus:outline-none"
        >
          <Image
            src={user.profile_picture_url ? parseImageUrl(user.profile_picture_url) : '/assets/missing_image.avif'}
            width={120}
            height={120}
            alt="profile pic"
            className="size-10 rounded-full"
          />

        </button>
        <p className="text-xl font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
        <Button onClick={toggleModal} className="border-2 border-black mt-2">
          Change Profile
        </Button>
        <Button onClick={logout} className="border-2 border-black mt-2">
          Logout
        </Button>
      </div>
      {isModalOpen && <Modal closeModal={() => setModalOpen(false)} token={localStorage.getItem('token')} />}
    </section>
  );
}

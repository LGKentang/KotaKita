'use client';
import Image from 'next/image';
import { Button } from './Button';
import { useEffect, useState } from 'react';
import { updateUser } from '@/libs/actions/user.action';
import { useAppContext } from '@/app/context';

type ModalProps = {
  closeModal: () => void;
  token: string | null;
};

export default function Modal({ closeModal, token }: ModalProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const {user, setUser} = useAppContext();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhoneNumber(user.phone_number || '');
      
      if (user.date_of_birth instanceof Date) {
        setDateOfBirth(user.date_of_birth.toISOString().split('T')[0]); 
      } else {
        setDateOfBirth(user.date_of_birth || ''); 
      }
    }
  }, []);

  // Handle file change for profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone_number', phoneNumber);
    formData.append('date_of_birth', dateOfBirth);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }
  
    try {
      if (!token) return;
      
      const response = await updateUser(formData, token);
      const updatedUser = response.user; 
      setUser(updatedUser); 
      
      closeModal(); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center  bg-gray-600 bg-opacity-50 mt-3">
      <div className="h-auto max-h-[80vh] w-[60%] rounded-lg border bg-white p-8 shadow-lg overflow-y-auto">
        <div>
          <div className="flex justify-between px-5">
            <h3 className="text-lg font-bold text-gray-900">Change Profile</h3>
            <button
              onClick={closeModal}
              className="rounded-full px-4 py-2 duration-700 hover:bg-red-400 focus:outline-none"
            >
              <Image
                src="https://www.svgrepo.com/show/522506/close.svg"
                width={13}
                height={13}
                alt="close button"
                className="size-4"
              />
            </button>
          </div>
          <form className="mt-2 px-7 py-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="text-md mb-2 block font-medium text-gray-900"
                >
                  Insert name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-400 bg-slate-200 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone_number"
                  className="text-md mb-2 block font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full rounded-lg border border-gray-400 bg-slate-200 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="date_of_birth"
                  className="text-md mb-2 block font-medium text-gray-900"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="block w-full rounded-lg border border-gray-400 bg-slate-200 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="profile_picture"
                  className="text-md mb-2 block font-medium text-gray-900"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profile_picture"
                  onChange={handleFileChange}
                  className="block w-full rounded-lg border border-gray-400 bg-slate-200 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
            </div>
            <Button className="right-0 mt-5 border-green-200 bg-green-500 text-white hover:border-green-200 hover:bg-white hover:text-black">
              Change
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

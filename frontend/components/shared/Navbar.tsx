'use client';
import { useState } from 'react';
import React from 'react';
import { Button } from './Button';
import Image from 'next/image';
import Link from 'next/link';
import { UserProfile } from '@/libs/types/user.type';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);

  const profile: UserProfile = {
    id: 1,
    profilePic: 'https://via.placeholder.com/150', // Example placeholder image
    fullName: 'Alice Johnson',
    userId: 101,
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-900 shadow-md">
      <nav className="flex items-center justify-between bg-slate-900 px-6 py-2 md:px-12">
        {/* Logo Section */}
        <div>
          <a href="/">
            <h1 className="text-2xl font-semibold text-white sm:text-xl">
              Kotakita
            </h1>
          </a>
        </div>

        {/* Navigation Links/Buttons */}
        <div className="flex items-center space-x-6">
          {/* Home Link */}
          <Link href="/">
            <span className="text-md cursor-pointer text-white transition duration-200 ease-in-out hover:text-blue-400">
              Home
            </span>
          </Link>

          {/* Petitions Link */}
          <Link href="/petitions">
            <span className="text-md cursor-pointer text-white transition duration-200 ease-in-out hover:text-blue-400">
              Petitions
            </span>
          </Link>

          {/* Projects Link */}
          <Link href="/projects">
            <span className="text-md cursor-pointer text-white transition duration-200 ease-in-out hover:text-blue-400">
              Projects
            </span>
          </Link>

          {/* Institutes Link */}
          <Link href="/institutes">
            <span className="text-md cursor-pointer text-white transition duration-200 ease-in-out hover:text-blue-400">
              Institutes
            </span>
          </Link>

          {/* Log in Button */}
          {!isLogin ? (
            <Link href={{ pathname: '/login', query: { tab: 1 } }}>
              <Button className="rounded-md px-4 py-2 text-black shadow-md transition duration-200 ease-in-out hover:bg-blue-500 hover:shadow-lg">
                Log in
              </Button>
            </Link>
          ) : (
            <Link
              href={{
                pathname: '/profilepage',
                query: { user: encodeURIComponent(JSON.stringify(profile)) },
              }}
            >
              <Image
                src={
                  !profile.profilePic
                    ? '/assets/profile-svgrepo-com'
                    : profile.profilePic
                }
                width="40"
                height="40"
                alt="profile pic"
                className="rounded-full"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export { Navbar };

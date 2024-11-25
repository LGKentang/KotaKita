import React from 'react';
import { Button } from './Button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-slate-900 shadow-md">
      <nav className="flex items-center justify-between bg-slate-900 px-6 py-4 md:px-12">
        {/* Logo Section */}
        <div>
          <a href="/">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              KotaKita
            </h1>
          </a>
        </div>

        {/* Navigation Links/Buttons */}
        <div className="flex items-center space-x-6">
          {/* Home Link */}
          <Link href="/" passHref>
            <span className="cursor-pointer text-lg text-white transition duration-200 ease-in-out hover:text-blue-400">
              Home
            </span>
          </Link>

          {/* Petitions Link */}
          <Link href="/petitions" passHref>
            <span className="cursor-pointer text-lg text-white transition duration-200 ease-in-out hover:text-blue-400">
              Petitions
            </span>
          </Link>

          {/* Projects Link */}
          <Link href="/projects" passHref>
            <span className="cursor-pointer text-lg text-white transition duration-200 ease-in-out hover:text-blue-400">
              Projects
            </span>
          </Link>

          {/* Institutes Link */}
          <Link href="/institutes" passHref>
            <span className="cursor-pointer text-lg text-white transition duration-200 ease-in-out hover:text-blue-400">
              Institutes
            </span>
          </Link>

          {/* Log in Button */}
          <Link href="/login" passHref>
            <Button className="rounded-md px-4 py-2 text-black shadow-md transition duration-200 ease-in-out hover:bg-blue-500 hover:shadow-lg">
              Log in
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };

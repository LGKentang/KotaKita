import React from "react";
import { Button } from "./Button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-slate-900 shadow-md">
      <nav className="flex items-center justify-between py-4 px-6 md:px-12 bg-slate-900">
        {/* Logo Section */}
        <div>
          <a href="/">
            <h1 className="text-white font-semibold text-2xl sm:text-3xl">Kotakita</h1>
          </a>
        </div>

        {/* Navigation Links/Buttons */}
        <div className="flex items-center space-x-6">
          {/* Home Link */}
          <Link href="/" passHref>
            <span className="text-white text-lg hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer">
              Home
            </span>
          </Link>

          {/* Petitions Link */}
          <Link href="/petitions" passHref>
            <span className="text-white text-lg hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer">
              Petitions
            </span>
          </Link>

          {/* Projects Link */}
          <Link href="/projects" passHref>
            <span className="text-white text-lg hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer">
              Projects
            </span>
          </Link>

          {/* Institutes Link */}
          <Link href="/institutes" passHref>
            <span className="text-white text-lg hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer">
              Institutes
            </span>
          </Link>

          {/* Create Petition Button */}
          <Link href={"/createpetition"}>
            <Button className="text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out py-2 px-4 rounded-md shadow-md hover:shadow-lg">
              Create Petition
            </Button>
          </Link>

          {/* Log in Button */}
          <Link href="/login" passHref>
            <Button className="transition duration-200 ease-in-out hover:bg-blue-500 text-black py-2 px-4 rounded-md shadow-md hover:shadow-lg">
              Log in
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };

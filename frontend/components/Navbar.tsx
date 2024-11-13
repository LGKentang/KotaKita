import React from "react";
import { Button } from "./Button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full">
      <nav className="flex items-center bg-slate-800 sticky justify-between shadow-lg py-3 px-5">
        <div>
          <h1 className="text-white font-semibold text-lg">Kotakita</h1>
        </div>
        <div className="flex items-center gap-5">
          <Link href={"/createpetition"}>
            <Button>Create Petition</Button>
          </Link>
          <Link href="/login">
            <Button>Log in</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };

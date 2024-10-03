import React from "react";
import { Button } from "./Button";

const Navbar = () => {
  return (
    <div>
      <nav className="flex bg-gradient-to-r from-gray-800  via-slate-900  to-zinc-900 sticky justify-between shadow-lg py-3 px-5">
        <div className="flex gap-5">
          <h1 className="text-xl text-white">Logo</h1>
          <h1 className="text-xl text-white">KotaKita</h1>
        </div>
        <div>
          <Button>Log in</Button>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };

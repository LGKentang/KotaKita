import { Button } from "@/components/Button";
import React from "react";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center bg-white h-screen">
        <Image
          src="/assets/city.jpg"
          alt="city"
          width={500}
          height={500}
          className="h-full object-cover w-1/2 overflow-hidden"
        />
        <form className="flex flex-col p-10 w-1/2  justify-between gap-10">
          <div className="flex justify-center pr-20">
            <Image
              src="/assets/logo-kotakita.svg"
              alt="logo"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col ">
            <label className="">Username</label>
            <input
              type="text"
              className="rounded-lg border-2 border-black focus:outline-none"
            />
          </div>
          <div className="flex flex-col ">
            <label>Password</label>
            <input
              type="password"
              className="rounded-lg border-2 border-black focus:outline-none"
            />
          </div>
          <Button className="border-2 border-black hover:border-white shadow-md hover:shadow-md">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

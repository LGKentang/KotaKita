'use client';

import { Button } from '@/components/shared/Button';
import Image from 'next/image';
import { useState } from 'react';
import Modal from '@/components/shared/Modal';
export default function ProfileSection() {
  const [display, setDisplay] = useState(false);
  return (
    <section>
      <button>
        <Image
          src="https://img.freepik.com/free-photo/beautiful-lesbian-couple-celebrating-their-wedding-day-outdoors_23-2150637608.jpg?t=st=1733405908~exp=1733409508~hmac=a4adab2c233a3ff388843d545113d8f4c3efea966fb0f95eaff92aa24e4c4c88&w=996"
          width={1000}
          height={1000}
          alt=""
          className="size-52 shrink-0 rounded-full object-cover"
        />
      </button>
      <div className="flex flex-col justify-center">
        <p className="text-xl font-semibold">Lewi Meyvianus Borosi</p>
        <Button
          onClick={() => {
            setDisplay(!display);
          }}
          className="border-2 border-black"
        >
          Change Profile
        </Button>
      </div>
      {display && <Modal closeModal={() => setDisplay(false)} />}
    </section>
  );
}

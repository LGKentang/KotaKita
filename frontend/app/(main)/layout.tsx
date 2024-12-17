'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { getUser } from '@/libs/actions/user.action';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();



  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

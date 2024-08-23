'use client';
import React from 'react';
import { Button } from '../button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex items-center justify-between px-4 py-4 shadow-md">
      <div className="flex gap-2 items-center">
        <img src="/calendar.png" alt="" className="h-12 w-12" />
        <h1 className="text-xl font-semibold">Schedule.</h1>
      </div>

      {isSignedIn ? (
        <div className='flex gap-2 items-center'>
          <Link href="/dashboard/meeting-type">
            <Button variant="">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div>
          <Button variant="ghost">login</Button>
          <Button>Get Started</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

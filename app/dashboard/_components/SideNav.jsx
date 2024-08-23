'use client';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, Clock, Plus, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';

const SideNav = () => {
  const menu = [
    {
      id: 1,

      name: 'Meeting Type',

      path: '/dashboard/meeting-type',

      icon: Briefcase,
    },

    {
      id: 2,

      name: 'Scheduled Meetings',

      path: '/dashboard/scheduled-meetings',

      icon: Calendar,
    },

    {
      id: 3,

      name: 'Availability',

      path: '/dashboard/availability',

      icon: Clock,
    },
    // {
    //   id: 4,

    //   name: 'Settings',

    //   path: '/dashboard/settings',

    //   icon: Settings,
    // },
  ];

  const path = usePathname();
  const [pathname, setPathName] = useState(path);
  useEffect(() => {
    path && setPathName(path);
  }, [path]);

  const userButtonRef = useRef(null);

  const handleTextClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Find the UserButton element and trigger a click on it
    const userButtonElement = event.currentTarget.querySelector('button');
    if (userButtonElement) {
      userButtonElement.click();
    }
  };

  return (
    <div className="p-5 py-10 h-screen flex flex-col justify-between -mt-4  bg-gray-200">
      <div>
        <div className="flex justify-center items-center gap-2">
          <Image src="/schedule.png" width={50} height={50} />
          <h1 className="text-xl font-medium">Schedule.</h1>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <Button
                variant="ghost"
                key={index}
                className={`w-full flex gap-2 justify-start hover:bg-primary hover:text-white ${
                  pathname === item.path ? 'bg-primary text-white' : ''
                }`}
              >
                <item.icon />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <Link href="/create-meeting">
          <Button className="mt-5 flex gap-2 justify-center w-full rounded-xl">
           
            Create Meeting
          </Button>
        </Link>

        <div
          className=" flex items-center gap-4 bg-white rounded-3xl p-4 cursor-pointer"
          onClick={handleTextClick}
        >
          <UserButton ref={userButtonRef} />
          <p className="text-black cursor-pointer font-semibold">
            Your Profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

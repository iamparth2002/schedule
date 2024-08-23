'use client';
import { UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react';
import { Briefcase, Calendar, Clock, Plus, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';

const DashboardHeader = () => {
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
  ];
  const path = usePathname();
  const [pathname, setPathName] = useState(path);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    path && setPathName(path);
  }, [path]);
  return (
    <div className="py-4 px-6 flex justify-between shadow-md">
      <UserButton />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <div className="flex justify-center">
                <Image src="/logo.svg" width={100} height={100} />
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="mt-5 flex flex-col gap-5">
                <Link href="/create-meeting">
                  <Button className="mt-5 flex gap-2 justify-center w-full rounded-full" onClick={handleClose}>
                    <Plus />
                    Create
                  </Button>
                </Link>
                {menu.map((item, index) => (
                  <Link href={item.path} key={index}>
                    <Button
                      variant="ghost"
                      key={index}
                      className={`w-full flex gap-2 justify-start hover:bg-primary hover:text-white ${
                        pathname === item.path ? 'bg-primary text-white' : ''
                      }`}
                      onClick={handleClose}
                    >
                      <item.icon />
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardHeader;

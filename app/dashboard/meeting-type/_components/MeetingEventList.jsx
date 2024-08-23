'use client';
import { Button } from '@/components/ui/button';
import { app } from '@/config/firebase.config';
import { useUser } from '@clerk/nextjs';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowRight,
  Clock,
  Copy,
  Loader2,
  MapPin,
  Pen,
  Settings,
  Trash,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

const MeetingEventList = () => {
  const db = getFirestore(app);
  const { user } = useUser();

  const [eventList, setEventList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getBusinessInfo();
      getEventList();
    }
  }, [user]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, 'Business', user?.primaryEmailAddress?.emailAddress);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  };

  const getEventList = async () => {
    setLoading(true);
    setEventList([]);
    const q = query(
      collection(db, 'MeetingEvent'),
      where('createdBy', '==', user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    setEventList(events);
    setLoading(false);
  };

  const getEventUrl = async (event) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${businessInfo?.businessName}/${event?.id}`;
    navigator.clipboard.writeText(url);
    toast('Link Copied');
  };

  const onDelete = async (event) => {
    await deleteDoc(doc(db, 'MeetingEvent', event?.id));
    toast('Event Deleted!!');
    getEventList();
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {loading ? (
        <div className="flex justify-center items-center col-span-full">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : eventList.length === 0 ? (
        <div className="col-span-full text-center items-center text-lg font-medium  ">
          <p>You don’t have any meetings scheduled.</p>
          <Link href={'/create-meeting'}>
            <Button
              className="mt-4"
            >
              Let's Schedule a Meeting<ArrowRight size={15} className="ml-4 animate-pulse" />
            </Button>
          </Link>
        </div>
      ) : (
        eventList?.map((event) => (
          <div
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-5"
            key={event?.id}
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-end text-gray-500 cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-10">
                  <DropdownMenuLabel>Duration</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-2">
                    <Pen className="h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => onDelete(event)}
                  >
                    <Trash className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <div className="flex justify-between">
              <h2 className="flex gap-2">
                <Clock /> {event?.duration} Min
              </h2>
              <h2 className="flex gap-2">
                <MapPin /> {event?.locationType}
              </h2>
            </div>
            <hr />
            <div className="flex justify-between">
              <div
                className="flex gap-2 items-center text-primary hover:cursor-pointer"
                onClick={() => {
                  getEventUrl(event);
                }}
              >
                <Copy className="h-4 w-4" /> Copy Link
              </div>
              <Button className="bg-white text-primary border-primary border hover:bg-primary hover:text-white">
                Share
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MeetingEventList;

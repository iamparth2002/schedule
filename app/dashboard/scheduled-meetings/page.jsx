'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MeetingList from './_components/MeetingList';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { app } from '@/config/firebase.config';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';

const page = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const [meetingList, setMeetingList] = useState([]);
  useEffect(() => {
    user && getScheduledMeetings();
  }, [user]);

  const getScheduledMeetings = async () => {
    const q = query(
      collection(db, 'ScheduleMeetings'),
      where('businessEmail', '==', user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    const meetings = [];
    querySnapshot.forEach((doc) => {
      meetings.push(doc.data());
    });
    console.log({ meetings });
    setMeetingList(meetings);
  };

  const filterMeetingList = (type) => {
    if (type == 'upcoming') {
      return meetingList.filter(
        (meeting) => meeting.formatedTime >= format(new Date(), 't')
      );
    }
    if (type == 'expired') {
      return meetingList.filter(
        (meeting) => meeting.formatedTime < format(new Date(), 't')
      );
    }
  };
  return (
    <div className="p-5 ">
      <h1 className="text-2xl font-semibold mb-4">Availability</h1>
      <hr className="border-2" />

      <Tabs defaultValue="upcoming" className="mt-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <MeetingList meetingList = {filterMeetingList('upcoming')} />
        </TabsContent>
        <TabsContent value="expired"><MeetingList meetingList = {filterMeetingList('expired')} /></TabsContent>
      </Tabs>
    </div>
  );
};

export default page;

'use client';
import React, { useState, useEffect } from 'react';
import { days } from './_utils/Days';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getFirestore, getDoc } from 'firebase/firestore';
import { app } from '@/config/firebase.config';
import { useUser } from '@clerk/nextjs';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

const page = () => {
  const [daysAvailable, setDaysAvailable] = useState(
    {
      Sunday: false,
    },
    {
      Monday: false,
    },
    {
      Tuesday: false,
    },
    {
      Wednesday: false,
    },
    {
      Friday: false,
    },
    {
      Saturday: false,
    },
    {
      Thursday: false,
    }
  );
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const db = getFirestore(app);
  const { user } = useUser();

  const onHandleChange = (day, value) => {
    setDaysAvailable({
      ...daysAvailable,
      [day]: value,
    });
  };

  const getBusinessInfo = async () => {
    const docRef = doc(db, 'Business', user?.primaryEmailAddress?.emailAddress);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setStartTime(result.startTime);
    setEndTime(result.endTime);
    setDaysAvailable(result.daysAvailable);
  };
  const handleSave = async () => {
    console.log(daysAvailable, startTime, endTime);
    const docRef = doc(db, 'Business', user?.primaryEmailAddress?.emailAddress);
    await updateDoc(docRef, {
      daysAvailable: daysAvailable,
      startTime: startTime,
      endTime: endTime,
    }).then((res) => {
      toast('Changes Updated');
    });
  };

  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Availability</h1>
      <hr className="border-2" />
      <h2 className="font-bold my-4 mt-10">Days Available</h2>
      <div className="my-4 grid grid-cols-2 md:grid-cols-4">
        {days.map((day, index) => (
          <div key={index} className="flex items-center mb-4">
            <Checkbox
              checked={
                daysAvailable[day?.day] ? daysAvailable[day?.day] : false
              }
              onCheckedChange={(value) => onHandleChange(day.day, value)}
            />
            <p className="ml-4">{day.day}</p>
          </div>
        ))}
      </div>

      <h2 className="font-bold mt-10">Availability Time</h2>
      <div className="flex gap-10">
        <div className="mt-3">
          <h2>Start Time</h2>
          <Input
            type="time"
            defaultValue={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h2>End Time</h2>
          <Input
            type="time"
            defaultValue={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default page;

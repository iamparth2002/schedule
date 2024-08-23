'use client';

import { format, set } from 'date-fns';
import {
  Clock,
  MapPin,
  Calendar,
  AlarmClock,
  LoaderCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DateAndTimeSlot from './DateAndTimeSlot';
import { Button } from '@/components/ui/button';
import UserInfo from './UserInfo';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { app } from '@/config/firebase.config';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [timeSlot, setTimeSlot] = useState();
  const [enabledTimeSlots, setEnabledTimeSlots] = useState(true);
  const [step, setStep] = useState(1);

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userNotes, setUserNotes] = useState('');

  const [prevBookings, setPrevBookings] = useState([]);

  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);
  const router = useRouter()

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo?.duration]);
  const createTimeSlot = (interval) => {
    const startTime = 8 * 60;
    const endTime = 22 * 60;
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? 'PM' : 'AM';
      return `${String(formattedHours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')} ${period}`;
    });
    setTimeSlot(slots);
  };

  const handleDateChange = (date) => {
    setDate(date);
    if (!date) return;
    const day = format(date, 'EEEE');
    if (businessInfo?.daysAvailable?.[day]) {
      getPrevBooking(date);
      setEnabledTimeSlots(true);
    } else {
      setTime('');

      setEnabledTimeSlots(false);
    }
  };

  const getPrevBooking = async (date_) => {
    console.log(date_, eventInfo?.id);
    const q = query(
      collection(db, 'ScheduleMeetings'),
      where('selectedDate', '==', date_),
      where('eventId', '==', eventInfo?.id)
    );
    const querySnapshot = await getDocs(q);
    console.log('hi');
    querySnapshot.forEach((doc) => {
      console.log('---', doc.data());
      setPrevBookings((prev) => [...prev, doc.data()]);
    });
  };

  const onTimeChange = (time) => {
    setTime(time);
  };

  const handleScheduleEvent = async () => {
    setLoading(true);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(userEmail)) {
      return;
    }
    const docId = Date.now().toString();
    await setDoc(doc(db, 'ScheduleMeetings', docId), {
      businessName: businessInfo?.businessName,
      businessEmail: businessInfo?.email,
      selectedDate: date,
      selectedTime: time,
      duration: eventInfo?.duration,
      eventId: eventInfo?.id,
      eventName: eventInfo?.eventName,
      locationUrl: eventInfo?.locationUrl,
      userNotes: userNotes,
      userEmail: userEmail,
      userName: userName,
      formatedDate: format(date, 'PPP'),
      formatedTime: format(date, 't'),
      id: docId,
    }).then((resp) => {
      setDate('')
      setUserEmail('')
      setUserName('')
      setUserNotes('')
      setTime('')
      toast('Meeting Scheduled Successfully!!!');
      setLoading(false);
      router.push('/confirmation');
    });
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.svg" width={150} height={150} alt="logo" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-4 border-r text-wrap">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-semibold text-2xl text-wrap">
            {eventInfo?.eventName ? eventInfo?.eventName : 'Meeting Name'}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType}
            </h2>
            {time && (
              <h2 className="flex gap-2">
                <AlarmClock />
                {time}
              </h2>
            )}

            {date && (
              <h2 className="flex gap-2">
                <Calendar />
                {date && format(date, 'PPP')}
              </h2>
            )}

            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : '#'}
              className="text-pretty text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 px-4">
          {step == 1 ? (
            <DateAndTimeSlot
              handleDateChange={handleDateChange}
              date={date}
              timeSlot={timeSlot}
              enabledTimeSlots={enabledTimeSlots}
              handleTimeChange={onTimeChange}
              timeSelected={time}
              prevBookings={prevBookings}
            />
          ) : (
            <UserInfo
              setUserEmail={setUserEmail}
              setUserName={setUserName}
              setUserNotes={setUserNotes}
            />
          )}
        </div>
      </div>
      <div className="flex items-end justify-center md:justify-end px-8 mt-4 gap-4">
        {step == 2 && <Button onClick={() => setStep(1)}>Back</Button>}
        {step == 1 ? (
          <Button disabled={!date || !time} onClick={() => setStep(2)}>
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail || !userName}
            onClick={handleScheduleEvent}
          >
            {loading ? <LoaderCircle className=" animate-spin" /> : 'Schedule'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeetingTimeDateSelection;

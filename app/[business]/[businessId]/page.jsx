'use client';
import { app } from '@/config/firebase.config';
import { set } from 'date-fns';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import MeetingTimeDateSelection from './_components/MeetingTimeDateSelection';

const page = ({ params }) => {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params && getMeetingBusinessAndEventInfo();
  }, [params]);

  const getMeetingBusinessAndEventInfo = async () => {
    setLoading(true);
    const q = query(
      collection(db, 'Business'),
      where('businessName', '==', params?.business)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessInfo(doc.data());
    });

    const docRef = doc(db, 'MeetingEvent', params?.businessId);
    const result = await getDoc(docRef);
    setEventInfo(result.data());

    setLoading(false);
  };
  return <div>
    <MeetingTimeDateSelection eventInfo={eventInfo} businessInfo={businessInfo} />
  </div>;
};

export default page;

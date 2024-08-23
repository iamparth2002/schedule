'use client';

import { app } from '@/config/firebase.config';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const page = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    user && getbusinessInfo();
  }, [user]);

  const getbusinessInfo = async () => {
    const docRef = doc(db, 'Business', user?.primaryEmailAddress?.emailAddress);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      router.replace('/dashboard/meeting-type');
      setLoading(false);
    } else {
      setLoading(false);
      router.replace('/create-business');
    }
  };
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-3xl font-semibold">
        loading...
      </div>
    );
  }
  return <div>
    
  </div>;
};

export default page;

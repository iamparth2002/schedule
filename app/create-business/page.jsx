'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { app } from '@/config/firebase.config';
import { useUser } from '@clerk/nextjs';
import { Label } from '@radix-ui/react-label';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const page = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [businessName, setBusinessName] = useState('');
  const onCreateBusiness = async () => {
    setLoading(true);
    await setDoc(doc(db, 'Business', user?.primaryEmailAddress?.emailAddress), {
      businessName: businessName,
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      daysAvailable:{},
      startTime:"",
      endTime:""
    }).then((resp) => {
      setLoading(false);
      setBusinessName('');
      console.log('Document is saved');
      toast('New Business Created!!');
      router.replace('/dashboard');
    });
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-10 gap-10">
      <Image src="/logo.svg" width={100} height={100} />
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">
          What should we call your business?
        </h1>
        <p className="text-lg text-gray-500">
          You can always change this later in the setting
        </p>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="business">Team Name</Label>
        <Input
          type="business"
          id="email"
          placeholder="eg: Amazon"
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>
       
      <Button onClick={onCreateBusiness}>
        {loading ? 'Loading...' : 'Create Business'}
      </Button>
    </div>
  );
};

export default page;

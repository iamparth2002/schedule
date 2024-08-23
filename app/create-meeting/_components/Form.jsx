'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '@/config/firebase.config';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Form = ({ setFormValue }) => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(30);
  const [theme, setTheme] = useState('');
  const [type, setType] = useState('');

  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);
  const { user } = useUser();
  const router = useRouter();
  const location = [
    {
      name: 'Zoom',
      img: '/zoom.png',
    },
    {
      name: 'Meet',
      img: '/meet.png',
    },
    {
      name: 'Phone',
      img: '/telephone.png',
    },
    {
      name: 'Others',
      img: '/other.png',
    },
  ];
  const color = ['#6495ED', '#DE3163', '#FFBF00', '#FF7F50', '#7d3c98'];
  useEffect(() => {
    setFormValue({
      eventName: name,
      duration: duration,
      locationType: type,
      locationUrl: url,
      themeColor: theme,
    });
  }, [name, duration, type, url, theme]);
  const onSubmit = async () => {
    setLoading(true);
    const id = Date.now().toString();
    await setDoc(doc(db, 'MeetingEvent', id), {
      eventName: name,
      duration: duration,
      locationType: type,
      locationUrl: url,
      themeColor: theme,
      id:id,
      businessid: doc(db, 'Business', user?.primaryEmailAddress?.emailAddress),
      createdBy:user?.primaryEmailAddress?.emailAddress
    }).then((resp) => {
      setLoading(false);
      console.log('Document is saved');
      toast('New Meeting Event Created!!');
      router.replace('/dashboard/meeting-type');
    });
  };
  return (
    <div>
      <Link href="/dashboard/meeting-type">
      <Button>Back</Button>
      </Link>
      <h1 className="text-3xl font-semibold mt-6 mb-2">Create Event</h1>
      <hr />
      <div className="mt-4 space-y-2">
        <h1>Event Name</h1>
        <Input
          placeholder="Name of your meeting event"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-4 space-y-2">
        <h1>Duration</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-1/2 border p-2 rounded-lg">
            {duration} min
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-10">
            <DropdownMenuLabel>Duration</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(90)}>
              90 min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 space-y-2">
        <h1>Location</h1>
        <div className="flex flex-wrap gap-4">
          {location.map((item) => (
            <Button
              className={`flex flex-col gap-1 justify-center py-8 px-6 bg-white text-black border border-primary  hover:bg-blue-200
          ${type == item.name ? 'bg-blue-200' : ''}`}
              onClick={() => setType(item.name)}
            >
              <Image src={item.img} width={20} height={20} alt="" />
              {item.name}
            </Button>
          ))}
        </div>
      </div>

      {type && (
        <div className="mt-4 space-y-2">
          <h2>Add {type} Url</h2>
          <Input
            placeholder="Enter the url"
            type="text"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      )}

      <div
        className="
        mt-4 space-y-4"
      >
        <h2>Select theme color</h2>
        <div className="flex gap-10 items-center justify-center">
          {color.map((item) => (
            <div
              className={` p-2 rounded-full w-7 h-7 hover:cursor-pointer
                ${theme === item ? 'border-4 border-black' : ''}`}
              style={{ backgroundColor: item }}
              onClick={() => setTheme(item)}
            ></div>
          ))}
        </div>
      </div>

      <Button
        className="mt-4 w-full"
        onClick={onSubmit}
        disabled={url == '' || name == '' || theme == '' || type == ''}
      >
        {loading ? 'Loading...' : 'Create Event'}
      </Button>
    </div>
  );
};

export default Form;

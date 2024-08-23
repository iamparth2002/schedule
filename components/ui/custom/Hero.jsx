import React from 'react';
import { Button } from '../button';
import { Separator } from '../separator';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative flex w-full items-center justify-center flex-col pt-20 space-y-8 px-4">
      <div className='hidden xl:flex'>
        <Image
          src="/person5.jpg"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-36"
        />
        <Image
          src="/person2.jpg"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute top-20 left-16"
        />
        <Image
          src="/person3.jpg"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute -bottom-16 left-60"
        />
        <Image
          src="/person4.jpg"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute -bottom-12 right-72"
        />
      </div>
      <h1 className="text-5xl md:text-7xl font-semibold text-center">Easy Scheduling Ahead.</h1>
      <p className="text-xl text-center text-gray-500">
        Scheduly is your scheduling automation platform for eliminating
        back-and-forth emails
        <br className='hidden md:block' /> to find the perfect time --- and many more.
      </p>

      <p className="text-lg">
        Sign up free with <span className="text-primary">Google</span> and{' '}
        <span className="text-primary">Github</span>
      </p>

      <div className=" flex flex-col items-center">
        <Link href="/sign-up">
        <Button className="flex gap-2">Let's Get Started <ArrowRight /></Button>
        </Link>
        {/* 
        <Separator className="mt-6"/> */}

        {/* <p className=''>
          <span className='text-primary'>Sign up free with email. </span>No Credit card required
        </p> */}
      </div>
    </div>
  );
};

export default Hero;

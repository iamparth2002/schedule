'use client'
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
import React, { useState } from 'react';
import Image from 'next/image';
import Form from './_components/Form';
import Preview from './_components/Preview';

const page = () => {
const [formValue,setFormValue]=useState()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="p-8 border shadow-md md:h-screen">
      <Form setFormValue={(v)=>setFormValue(v)}/>
      </div>

      <div className="md:col-span-2">
        <Preview formValue={formValue}/>
      </div>
    </div>
  );
};

export default page;

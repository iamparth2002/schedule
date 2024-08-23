import { Button } from '@/components/ui/button'
import { CircleCheckBig } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5'>
        <CircleCheckBig color='lightgreen' size={50}/>
       <h1 className='text-4xl font-semibold text-center leading-normal'>Your Meeting Scheduled Successfully!</h1>
       <p className='text-lg text-gray-400'>Confirmation sent on your email</p>
       <Button> Thank you</Button>
    </div>
  )
}

export default page
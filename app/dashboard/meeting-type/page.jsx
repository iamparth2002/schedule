import React from 'react'
import MeetingEventList from './_components/MeetingEventList'

const page = () => {
  return (
    <div className='p-5'>
      <h2 className='text-2xl font-semibold mb-4'>Meeting Event Type</h2>
      <hr className='border-2' />

      <MeetingEventList/>
    </div>
  )
}

export default page
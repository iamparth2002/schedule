
import { Input } from '@/components/ui/input'
import React from 'react'

const UserInfo = ({setUserName,setUserEmail,setUserNotes}) => {
  return (
    <div className='max-md:mt-2 md:p-4  md:px-8 flex flex-col max-md:items-start gap-3'>
      <h2 className='font-bold text-2xl'>Enter Details</h2>
      <div>
        <h2>Name*</h2>
        <Input type="text" onChange={(e)=>setUserName(e.target.value)} />
      </div>
      <div>
        <h2>Email*</h2>
        <Input type="text" onChange={(e)=>setUserEmail(e.target.value)}/>
      </div>
      <div>
        <h2>Share any Notes</h2>
        <Input type="text" onChange={(e)=>setUserNotes(e.target.value)}/>
      </div>
    </div>
  )
}

export default UserInfo
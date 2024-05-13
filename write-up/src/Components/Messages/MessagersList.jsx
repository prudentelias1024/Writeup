import React from 'react'
import Message from './Message'

export default function MessagersList() {
  return (
    <div className='flex flex-col  w-full overflow-y-auto lg:w-fit' >
    <p className='relative lg:ml-[63m]  lg:mt-[1.5em] ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Messages</p>
   
    <div className='flex flex-col gap-[.5em] '>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>  
      <Message/>
    </div>
    </div>
  )
}

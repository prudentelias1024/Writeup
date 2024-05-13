import React from 'react'
import { IoIosImage, IoIosSend } from 'react-icons/io'

export default function MessageInput() {
  return (
    <div className='flex flex-row fixed bottom-[4.5em] lg:bottom-2 p-[.35em] gap-[1em] bg-[#eff3f4]  lg:w-[30em] w-[95%] -ml-2 rounded-md'>
    <IoIosImage className='text-2xl text-[#1D9BF0] mt-1.5' />
    <input type="text" name="message_box" className='h-[2em] outline-none w-full font-[Sen] bg-inherit' placeholder='Send Message' />
     <IoIosSend className='text-2xl text-[#1d9BF0] mt-1.5 '/>

    </div>
  )
}

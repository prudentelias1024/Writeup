import React from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { useSelector } from 'react-redux'

export default function Notis() {
    const {user} = useSelector((state => state) )
  return (
    <div className='flex flex-col '>
    <div className='flex flex-row  gap-[1em] ml-[1.25em]'>
        <IoIosNotifications className='text-3xl text-blue-500 ' />
        <div className="notis flex flex-row gap-[.5em]">
        <img src={user.public_picture}  className='h-[2.5em] w-[2.5em]  lg:mt-[1em] rounded-full' />
        <img src={user.public_picture}  className='h-[2.5em] w-[2.5em]  lg:mt-[1em] rounded-full' />
        <img src={user.public_picture}  className='h-[2.5em] w-[2.5em]  lg:mt-[1em] rounded-full' />
        <img src={user.public_picture}  className='h-[2.5em] w-[2.5em]  lg:mt-[1em] rounded-full' />
        </div>

        
      
    </div>
    <p className="font-[Sen] ml-[4em] mt-[.5em] font-semibold pr-[1em]">New Post Notification from Elias</p>

    </div>
  )
}

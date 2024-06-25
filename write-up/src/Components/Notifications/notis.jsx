import React from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Notis() {
    const {user} = useSelector((state => state) )
  return (
    <div className='flex flex-row lg:flex-row gap-3 lg:border-[.2px]  w-[115%] border-b-[1px] border-t-[1px] lg:w-[60%]  bg-white p-[.5em] pl-0  lg:pl-[2em]'>
      
    <Link  to="/notis/timeline"   className='flex flex-col l'>
    <div className='flex flex-row gap-[.5em]  '>
        <IoIosNotifications className='text-2xl ml-2  mt-[1em] text-blue-500 ' />
      
        <div className="notis flex flex-row gap-[.5em] ml-[0em] mt-[.75em]">
        <img src={user.public_picture}  className='h-[30px] w-[30px] lg:w-[2em] lg:h-[2em]  lg:mt-[1em] rounded-full' />
        <img src={user.public_picture}  className='h-[30px] w-[30px] lg:w-[2em] lg:h-[2em]  lg:mt-[1em] rounded-full' />
        <img src={user.public_picture}  className='h-[30px] w-[30px] lg:w-[2em] lg:h-[2em]  lg:mt-[1em] rounded-full' />
        <img src={user.public_picture}  className='h-[30px] w-[2em]  lg:mt-[1em] rounded-full' />
        </div>

        
      
    </div>
    <p className="font-[Sen] text-xs ml-[3em] lg:ml-[4em] pb-2 mt-[.5em] lg:mt-[.5em] font-semibold pr-[5em]">New Post Notification from Name cannot be blank and 2 others</p>

    </Link>
    </div>
  )
}

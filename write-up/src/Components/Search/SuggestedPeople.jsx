import React from 'react'
import Mock from '../../mock.jpg'
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';

export default function SuggestedPeople() {
  return (
     <div className="flex flex-row ml-[.5em] border-b-[1px] py-[1em]">
        <img src={Mock} className='h-9 w-9 rounded-full'/>
        <div className="profile ml-[.5em] ">
            <div className='flex flex-row'>
            <p className="name text-base font-[Sen] font-bold">Prudent Elias</p>
            <HiBadgeCheck className='text-base text-blue-500 relative top-[.25em]'/>
            </div>
            <p className="username text-sm font-[Sen] -mt-[.45em]">@emiliano</p>
        </div>
        <button className='font-[Sen] relative left-[4em] bg-blue-500 text-white text-sm px-[1.25em] rounded-md py-[.5em] border font-bold'>Follow</button>
         

     </div>

    )
}

import React from 'react'
import { useSelector } from 'react-redux'

export default function Message() {
    const {user} = useSelector(state => state)
  return (
    <div className='hover:bg-[#f4f4f4]  py-[1em] px-[1em] lg:px-[2em]'>
      <div className="flex flex-row">
      <img src={user.public_picture} alt={user.name} className='rounded-full h-10 w-10 lg:h-12 lg:w-12 mr-[1em] '  />
    
      <div className="flex flex-col">
      <div className="flex flex-row gap-1">
      <p className="font-[Avenir] font-semibold text-xs">{user.name}</p>
      <p className="font-[Avenir] text-[#a0a0a0] text-xs font-semibold">@{user.username}</p>
      <p className="font-[Avenir] text-[#a0a0a0] text-xs  font-semibold">5h</p>
      </div>
      <p className="text-[#a2a2a2] text-sm">How are you doing?</p>
      

      </div>
      </div>
      
    </div>
  )
}

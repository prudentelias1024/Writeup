import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

export default function MessageRoom() {
    const {user} = useSelector(state => state)

  return (
    <div className='lg:flex flex-col  hidden lg:ml-[-10em] pt-[1.5em]'>
        <div className="flex flex-row gap-1">
    <img src={user.public_picture} alt={user.name} className='rounded-full h-12 w-12 mr-[1em] '  />
    <div>

      <p className="font-[Avenir] font-semibold">{user.name}</p>
      <p className="font-[Avenir] text-[#a0a0a0] font-semibold">Last seen on </p>

     </div>
    
    </div>
    <div className="flex flex-col text-center pr-[20em] pt-[5em] gap-2 -indent-8">
    <img src={user.public_picture} alt={user.name} className='rounded-full m-auto h-20 w-20  '  />
    <p className="font-[Avenir] font-semibold">{user.name}</p>
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold">@{user.username}</p>
    <p className="font-[Avenir] font-semibold ">{user.bio}</p>
    {/* <div className="flex flex-row w-full"> */}
    {/* <p className="font-[Avenir] text-[#a0a0a0] font-semibold">Joined on: {moment(user.joined_on)} </p> */}
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold text-center">{ user.followers.length} Followers</p>

    {/* </div> */}
   
    </div>
   

    </div>
  )
}

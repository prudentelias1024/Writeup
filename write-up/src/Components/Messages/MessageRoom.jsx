import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import MessageInput from './MessageInput'

export default function MessageRoom() {
    const {user} = useSelector(state => state)

  return (
    <div className='lg:flex flex-col ml-[1em] overflow-y-auto hidden  lg:ml-[-10em] pt-[1.5em]'>
        <div className="flex flex-row gap-1">
    <img src={user.public_picture} alt={user.name} className='rounded-full h-12 w-12 mr-[1em] '  />
    <div>

      <p className="font-[Avenir] font-semibold">{user.name}</p>
      <p className="font-[Avenir] text-[#a0a0a0] font-semibold">Last seen on </p>

     </div>
    
    </div>
    <div className="flex flex-col text-center lg:pr-[20em] pt-[2em] lg:pt-[5em] gap-2 -indent-8">
    <img src={user.public_picture} alt={user.name} className='rounded-full m-auto h-20 w-20  '  />
    <p className="font-[Avenir] font-semibold">{user.name}</p>
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold">@{user.username}</p>
    <p className="font-[Avenir] font-semibold ">{user.bio}</p>
    {/* <div className="flex flex-row w-full"> */}
    {/* <p className="font-[Avenir] text-[#a0a0a0] font-semibold">Joined on: {moment(user.joined_on)} </p> */}
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold text-center">{ user.followers.length} Followers</p>

    {/* </div> */}
   
    </div>
    <div className="message   relative lg:w-[60%] w-full mt-[4em] overflow-x-hidden overflow-y-auto flex flex-col gap-4 mb-[8em] pr-[1em]  lg:mb-[4em]">

   <div className="sent relative max-w-[8em] ">
    <p className="font-[Sen] bg-blue-500  text-white h-fit w-fit p-[.5em] rounded-lg"> Hi</p>
   </div>
   
   
   
   
   <div className="received relative self-end max-w-[8em]  ">
    <p className="font-[Sen] bg-gray-500 text-white h-fit w-fit p-[.5em] rounded-lg"> How are you?</p>
   </div>
  
   
    </div>
    <MessageInput />
    </div>
  )
}

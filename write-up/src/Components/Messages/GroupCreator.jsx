import React from 'react'
import UserNav from '../Navbar/UserNav';

export default function GroupCreator() {
    
  return (
   <>
    <div className=' lg:ml-[10em] w-full lg:w-full '>
        <div className='flex flex-col lg:ml-[7em] lg:w-full'>

        <p className='relative lg:ml-[63m]  lg:mt-[1.5em] ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Create Group</p>

        <form action="/search/results" className="flex flex-row">
             <input  className=" lg:ml-[1em] lg:w-[50%] w-[95%] mx-[2%] lg:block h-10 bg-[#f6f6f6]  border rounded-md  font-[Maven] pl-5 font-bold placeholder:font-[Sen] placeholder:font-semibold placeholder:p-[1em] placeholder:text-sm placeholder:ml-5"  type="text" placeholder="Choose a member of your group" name="search"  />
           
        </form>

        <div className="flex flex-col mt-[1em] gap-[1em] w-[100%]">
            <p className="font-[Avenir] ml-[1em] mt-[2em] font-semibold text-lg ">Group Name</p>
            <input  className=" lg:ml-[1em] lg:w-[50%] w-[95%] mx-[2%] lg:block h-10 bg-[#f6f6f6]  border rounded-md  font-[Maven] pl-5 font-bold placeholder:font-[Sen] placeholder:font-semibold placeholder:p-[1em] placeholder:text-sm placeholder:ml-5"  type="text" placeholder="Group name" name="group_name"  />
           
          </div>

        <button className='lg:ml-[1em] mt-[2em] lg:w-[50%] w-[95%] mx-[2%] lg:block h-10 bg-[#512bd4] text-white  border rounded-md  font-[Maven] pl-5 font-bold placeholder:font-[Sen] placeholder:font-semibold placeholder:p-[1em] placeholder:text-sm placeholder:ml-5' >
            Create Group
        </button>

   </div>
   <UserNav/>

   </div>
   </> 
  )
}

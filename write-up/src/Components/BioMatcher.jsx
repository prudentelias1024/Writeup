import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";

export default function BioMatcher({users}) {
    
if (users.length !== null && users.length > 0){
    return (
        <>
        <p className= "user_title flex flex-row gap-1 text-xs ml-[1em] my-[1em] font-bold mt-[1em]   lg:text-xl font-[Sora] text-[#717171]"
        >People who matched your bio </p>         
            { users.map((user) => {
                return (
                    <div className='flex flex-row gap-[1em] ml-[1em] rounded-sm '>

        <div className="border flex flex-col gap-[1em] py-[1em] px-[2em] ">
        <img src={user.public_picture} className='w-[3.5em]  h-[3.5em] lg:w-[3em] lg:h-[3em] rounded-full object-cover' /> 
        <div className='flex flex-col  gap-[.35em]'>

        <Link to={"/"+ user.username } className= "user_title flex flex-row gap-1 text-sm    font-bold   lg:text-xl font-[Sora] text-[#171717]"
              > {
                  user !== null ?
                  user.name !== user.name ?
                  user.name: 'You':
                  user.name} {user.verified? <HiBadgeCheck  className="text-lg text-blue-500 mt-0"  />: ''}</Link>
       <p className= "user_title flex flex-row gap-1 text-xs font-bold mt-[-.25em]   lg:text-xl font-[Sora] text-[#717171]"
        >@{user.username}
    </p>         
       {/* <p className= "user_title flex flex-row gap-1 text-xs font-bold mt-[-.25em] w-fit text-ellipsis wra     lg:text-xl font-[Sora] "
        > Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis consectetur quisquam perspiciatis nostrum! Quod neque inventore repellendus porro officiis eveniet, adipisci sapiente nobis sint voluptatem aliquam doloribus. Placeat, soluta error.
    </p>          */}
        </div>
    <button className='text-white bg-blue-500 outline-none border-none rounded-md font-[Sen] border-2  w-fit px-[2.5em]  h-[3em] font-bold text-xs  
    '>Follow</button>
    
            </div> 

        
     </div>
                )
            })}
        
</>
    )
}
}

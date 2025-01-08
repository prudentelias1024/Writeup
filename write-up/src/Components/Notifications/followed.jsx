import React from 'react';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";
import { HiBadgeCheck } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
const Followed = ({notification}) => {
    return (

      <div>
      <Link  to={'/'+notification.message[0].user[1].link.split('@')[1]}
 className=' flex flex-row lg:flex-row gap-3  w-[115%] border-b-[1px] border-t-[1px] lg:w-[60%]  bg-white p-[.5em] lg:border-[0.1px]   lg:pl-[2em] hover:scale-110'>
 
  <FaUserFriends  className='text-xl text-blue-500 mt-[1em]'/>
  
  <div className=' flex flex-col w-fit font-[Sen] ml-0  gap-[.05em]  lg:ml-[2em]'>
  <img src={notification.message[0].user[2].public_picture} alt={notification.message[0].user[0].name} className='h-[30px] w-[30px] lg:w-[2em]  lg:mt-[1em] rounded-full' />

  <div className='[.125em]'>
<div className=' font-bold font-[Sen] text-xs inline-flex flex-wrap gap-[0.2em] ' to={'/'+notification.message[0].user[1].link.split('@')[1].split('@')[1]}>
  <p className='inline-flex'> 
  {notification.message[0].user[0].name}  {  notification.actionUserVerified? <HiBadgeCheck  className="text-lg text-blue-500 m"  />: ''} </p>
   <p> followed you </p> 
</div> 
      </div>        
   
  </div>
   
  </Link>
</div>

      );
}

export default Followed;

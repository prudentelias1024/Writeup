import React from 'react';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";
import { HiBadgeCheck } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
const Followed = ({notification}) => {
    return (

      <div>
      <div className='flex flex-row lg:flex-row gap-3  w-[115%] border-b-[1px] border-t-[1px] lg:w-[60%] lg:m-auto bg-white p-[.5em]   lg:pl-[7em] hover:scale-110'>
 
  <FaUserFriends  className='text-2xl text-blue-500 mt-[1em]'/>
  
  <div className=' flex flex-col w-fit font-[Sen] ml-0  gap-[.05em]  lg:ml-[2em]'>
  <img src={notification.message[0].user[2].public_picture} alt={notification.message[0].user[0].name} className='h-[2.5em] w-[2.5em]  lg:mt-[1em] rounded-full' />

  <div className='[.125em]'>
<Link className=' font-bold font-[Sen] text-sm inline-flex flex-wrap gap-[0.2em] ' to={notification.message[0].user[1].link}>
  <p className='inline-flex'> 
  {notification.message[0].user[0].name}  {  notification.actionUserVerified? <HiBadgeCheck  className="text-lg text-blue-500 m"  />: ''} </p>
   <p> followed you </p> 
</Link> 
      </div>        
   
  </div>
   
</div>
  </div>

      );
}

export default Followed;

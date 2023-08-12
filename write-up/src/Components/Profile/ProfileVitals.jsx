import React from 'react'
import { Link } from 'react-router-dom';
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';
import { useSelector } from 'react-redux';

export default function ProfileVitals({user,posts}) {
    const currentUser = useSelector(state => state.user)
  return (
    <div className=" bg-white mb-[6em] pt-[2em] w-[100%] ml-[0em]  rounded-xl lg:top-[4.5em] relative flex-col lg:mt-[5em] lg:w-4/5  lg:ml-[10em]  lg:pt-[4em]">
    <div  className="activity_info flex flex-row justify-evenly">
        <img className='rounded-full w-[3.5em] h-[3.5em] lg:w-[7em] lg:h-[7em]' src={user.public_picture} alt={user.name}  />
           <div className="post_activity text-center">
               <p className='text-2xl font-[Sen] font-bold '> {posts? posts.length : 0}</p>
               <p className='text-xs'>Posts</p>
               
           </div>
           <div className="followers_activity text-center">
               <p className='text-2xl font-[Sen] font-bold'> {user ?user.followers.length: 0}</p>
               <p className='text-xs'>Followers</p>
               
           </div>
           <div className="following_activity text-center">
               <p className='text-2xl font-[Sen] font-bold'> {user ?user.following.length: 0}</p>
               <p className='text-xs'>Followings</p>
               
           </div>
        </div>
    
       <div className="flex flex-col mt-[.75em] relative left-[2em]">
        <div className='flex flex-row'>
        <p className=" text-lg font-bold font-[Avenir] text-[#616161]  lg:text-2xl lg:mt-[1em]">{user.name}</p>
        {user.verified ==true?
        <HiBadgeCheck className="text-xl text-blue-500 relative top-[.2em]"/>: ''
        }
        </div> 
        <p className=" text-sm font-[Avenir]  text-[#a2a2a2] font-semibold  mb-[1em] lg:text-xl">@{user.username}</p>
       </div>
        {
        user.username == currentUser.username   ? 
            <div className="profile_actions left-[2em] flex flex-row justify-evenly mt-[1em]">
                       <Link to="/settings">
       <button className='border-purple-600 text-purple-500 font-[Sen] border-2 px-[1em] w-fit h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Edit Profile</button>
       </Link>
                       <Link to="/settings">
       <button className='border-blue-600 text-blue-500 font-[Sen] border-2 px-[1em] w-fit h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Share Profile</button>
       </Link>
       </div>:
         currentUser.following.some((person) => person.username == user.username) ?
         <button className='text-black border-black font-[Sen] border-2 px-[1em] w-fit h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Following</button>
       
       :
        <button className='text-white bg-blue-500 font-[Sen] border-2 px-[1em] w-[90%] ml-[1.2em] h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Follow</button>
      
    }
    </div>
)
}

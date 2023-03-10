import React from 'react';
import { Link } from 'react-router-dom';
const FollowersAndFollowing = ({user}) => {
   
    return (
        <div className='bg-[#fcfbfb] flex flex-row border rounded-sm w-[96%] ml-[.5em] py-[.5em] pl-[.5em]'>
         <img src={user.public_picture} alt="" className='rounded-full h-[3.5em] w-[3.5em]' />   
            <div className='ml-[1em]'>
                <Link to="/" className='text-xl font-extrabold font-[Mulish] text-blue-700'>{user.name}</Link>
                <p className='text-sm font-medium text-[#6b6b6b] font-[Mulish]'>@{user.username}</p>
            </div>
        </div>
    );
}

export default FollowersAndFollowing;

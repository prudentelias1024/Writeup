
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar';
import FollowersAndFollowing from '../FollowersAndFollowing';

const Followers = () => {
    const ref = useRef()
    const {user}  =   useSelector(state => state)
    console.log(user)
    const navigate = useNavigate()
    const handleChange = () => {
     navigate(ref.current.value)
    }
    return (
        <>
        <NavBar/>   
        <div className='flex flex-col gap-[6em]'>
                <div className="filterer relative top-[5em] ">
                   
                   <select onChange={handleChange}  ref={ref} className='w-[95%] rounded-sm outline-blue-600
                    h-[2.5em] ml-[.75em] border'>
                        <option   value="/Dashboard">
                        ...
                         
                       </option>
                       <option   value="/Dashboard">
                      Posts 
                         
                       </option>
                       <option value="/Dashboard/Followers">
                           Followers
                         
                       </option>
                       <option value="/Dashboard/Following">
                         Following
                         
                       </option>
                   </select>
              
           </div>
        {
        user.followers.length > 0 ? user.followers.map(follower => {
           
         return     <FollowersAndFollowing key={follower._id} user={follower} />
     
        }) : <p className='text-center font-[Mulish]'>You have 0 Followers</p>
        } 

        </div>
        </>
    );
}

export default Followers;

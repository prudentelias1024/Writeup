import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar';
import FollowersAndFollowing from '../FollowersAndFollowing';

const Following = () => {
    const ref = useRef()
    const navigate = useNavigate()
    const {user}  = useSelector(state=> state)
    const handleChange = () => {
     navigate(ref.current.value)
 
    }
    return (
      <>
       <NavBar/>   
        <div className='flex flex-col gap-[6em]'>
                <div className="filterer relative top-[5em]">
                   
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
        user && user.following.length > 0 ? user.following.map(user => {
           
         return     <FollowersAndFollowing key={user._id} user={user} />
     
        }) : <p className='text-center font-[Mulish] '>You don't follow any user</p>
        } 
          
        </div>
        
      </>
    );
}

export default Following;

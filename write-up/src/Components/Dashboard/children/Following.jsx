import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar';
import FollowersAndFollowing from '../FollowersAndFollowing';

const Following = () => {
    const ref = useRef()
    const navigate = useNavigate()
    const handleChange = () => {
     navigate(ref.current.value)
 
    }
    return (
      <>
       <NavBar/>   
        <div>
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
           <FollowersAndFollowing/>
        </div>
        
      </>
    );
}

export default Following;

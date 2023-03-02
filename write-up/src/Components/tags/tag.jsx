import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux";
import { actions } from '../../store';
import { useDispatch } from "react-redux";
const Tag = ({tag, count}) => {
    const {user} = useSelector(state => state)
    const [followed, setFollowed] = useState(true)
    const dispatch = useDispatch()  

    const checkFollowed = () => {
        if (user && user.followingTags.includes(tag)) {
            setFollowed(true)
        } else{ 
            setFollowed(false)
        }
    }
    useEffect(() => {
     checkFollowed()
     setTimeout(() => {
        
         checkFollowed()
     }, 10);
    },[])
    
    const followTag = async() => {
        setFollowed(true)
        const res = await(await axios.post(`http://localhost:5000/api/tags/follow`, {tag: tag}, {headers: {Authorization: localStorage.getItem('token')}})).data
        dispatch(actions.updateUser(res))
    }
    const unfollowTag = async() => {
        setFollowed(false)
        const res = await(await axios.post(`http://localhost:5000/api/tags/unfollow`, {tag: tag}, {headers: {Authorization: localStorage.getItem('token')}})).data
       
        dispatch(actions.updateUser(res))
    }
    return (
        <div className='  border border-t-[1em] bg-white  border-t-red-500 p-[1em] lg:rounded-xl leading-8 '>
           <Link  className='hover:border-red-500 hover:border-2 hover:rounded-full hover:px-5 hover:text-red-500 hover:border-full p-3 font-[Mulish]' to={"/tag/"+tag}>#{tag}</Link> 
           
               <p className='font-[Mulish] ml-3 font-bold mt-2'>{count} Posts Published</p> 
           
           {followed == true ? 
                   <button onClick={(event) => {unfollowTag()}}  className='text-blue-500 rounded-lg px-6 border-2 ml-3 mt-[1.5em] border-blue-500 mb-4'>Followed</button>:  
                    <button onClick={(event) => {followTag()}}  className='text-red-500 rounded-full px-6 border-2 ml-3 mt-[1.5em] border-red-500 mb-4'>Follow</button>

        }
        </div> 
    );
}

export default Tag;

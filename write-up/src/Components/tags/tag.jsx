import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux";
import { actions } from '../../store';
import { useDispatch } from "react-redux";
import LoginModal from '../loginModal';
const Tag = ({tag, count}) => {

    const {user,showModal} = useSelector(state => state)
    const [followed, setFollowed] = useState(false)
    const dispatch = useDispatch()  
  
    const checkFollowed = () => {
        if (user && user.followingTags) {
            if(user.followingTags.includes(tag)){
          return true
        } else{ 
            return false
        }
        } else {
            return false
        }
    }
    useEffect(() => {
        console.log(user)
     setTimeout(() => {
        
     
     }, 10);
    },[])
    
    const followTag = async() => {
        if (user == null) {
         dispatch(actions.setShowModal(true))
          }else{
        setFollowed(true)
        const res = await(await axios.post(`https://writeup-37ap.vercel.app/api/tags/follow`, {tag: tag}, {headers: {Authorization: localStorage.getItem('token')}})).data
        dispatch(actions.updateUser(res))
          }
    }
    const unfollowTag = async() => {
        setFollowed(false)
        const res = await(await axios.post(`https://writeup-37ap.vercel.app/api/tags/unfollow`, {tag: tag}, {headers: {Authorization: localStorage.getItem('token')}})).data
       
        dispatch(actions.updateUser(res))
    }
    return (
        <>
        {showModal == true ? <LoginModal/> :''}
        <div className={  
       checkFollowed() ||followed ? 'border-t-green-500 border border-t-[1em] bg-white p-[1em] lg:rounded-xl leading-8' : 'border-t-red-500 border border-t-[1em] bg-white p-[1em] lg:rounded-xl leading-8'   }>
           <Link  className='hover:border-red-500 hover:border-2 hover:rounded-full hover:px-5 hover:text-red-500 hover:border-full p-3 font-[Mulish]' to={"/tag/"+tag}>#{tag}</Link> 
           
               <p className='font-[Mulish] ml-3 font-bold mt-2'>{count} Posts Published</p> 
           
           {
             user !== null?
           checkFollowed() ||followed ? 
                   <button onClick={(event) => {unfollowTag()}}  className='text-green-500 rounded-lg px-6 text-lg hover:px-4 hover:py-2.5 font-semibold  ml-3 mt-[1.5em] hover:border-green-500 hover:border mb-4'>Followed</button>:  
                    <button onClick={(event) => {followTag()}}  className='text-red-500 rounded-lg px-6 text-lg hover:px-4 hover:py-2.5 font-semibold  ml-3 mt-[1.5em] hover:border-red-500 hover:border mb-4'>Follow</button>
           : <button onClick={(event) => {followTag()}}  className='text-red-500 rounded-lg px-6 text-lg hover:px-4 hover:py-2.5 font-semibold  ml-3 mt-[1.5em] hover:border-red-500 hover:border mb-4'>Follow</button>
    
        }
        </div> 
        </>
    );
}

export default Tag;

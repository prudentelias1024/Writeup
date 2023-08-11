import React, { useState } from 'react';
import { BsCalendarWeek, BsEnvelope } from 'react-icons/bs';
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';
import NavBar from './NavBar';
import { SlNote } from "react-icons/sl";
import { FaRegComment } from 'react-icons/fa';
import DashboardPosts from './Dashboard/DashboardPosts';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/index";
import {format} from '../time'
import ProfileVitals from './Profile/ProfileVitals';
    
const MyProfile = () => {
    let URL;
    const user = useSelector((state) => state.user)
    const [myPosts, setMyPosts] = useState(null)
    const dispatch = useDispatch()
    const loadUser = async() => {
        const info = await (await axios.get(`${URL}/api/user`,{headers: {Authorization: localStorage.getItem('token')}}
        )).data;
         dispatch(actions.updateUser(info))
         
     }
     const  getMyPosts = async() => {
        let res = await (await axios.get(`${URL}/api/user/posts`, {headers: {Authorization:  localStorage.getItem('token')}})).data
       console.log(res)
       setMyPosts(res)
       
     }
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
              URL = "http://localhost:5000"
              
            }
            loadUser()
            getMyPosts()
            
        }
        , []);
        if (user) {
            
            
            return (
                
        <div className='flex flex-col'>
            
                    <ProfileVitals user={user} posts={myPosts}/>

        <div className=' w-full lg:flex lg:mt-[-9em] lg:flex-row justify-between '>
            <div className='hidden bg-white px-7 py-9 font-[Mulish] rounded-xl ml-[14em] mt-[10em] h-fit w-[20em] justify-start lg:flex lg:flex-col lg:gap-5 border '>
              
                <div className='flex gap-2'>
                    <SlNote className='text-2xl' />
                    <p className='font-[Mulish] font-semibold text-xl'> {myPosts? myPosts.length : 0} Posts published</p>
                </div>
                <div className='flex gap-2'>
                    <HiHashtag className='text-2xl' />
                    <p className='font-[Mulish] font-semibold text-xl'> {user ?user.followingTags.length : 0} Tags Followed</p>
                </div>
                <div className='flex gap-2 '>
                    <FaRegComment className='text-2xl' />
                    <p className='font-[Mulish] font-semibold text-xl'> 0 Comment Added</p>
                </div>
            </div>
            <div className=' flex flex-col gap-4  lg:mt-[10em] lg:mr-[20em]'>
            {
             myPosts !== null && myPosts.map((myPost) => {
                return <DashboardPosts key={myPost._id} post={myPost} />
             })
            }
            
            </div>
        </div>
        </div>
    )} else {
        return ''
    }
}

export default MyProfile;

import React, { useState } from 'react';
import { BsBriefcase, BsBriefcaseFill, BsCalendarWeek, BsEnvelope } from 'react-icons/bs';
import { Link, useParams, useRoutes } from 'react-router-dom';
import { SlNote } from "react-icons/sl";
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';
import { FaGraduationCap, FaRegComment } from 'react-icons/fa';
import DashboardPosts from './Dashboard/DashboardPosts';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/index";
import {format} from '../time'
import Post from './Post';
import Page404 from './Page404';
import ProfileVitals from './Profile/ProfileVitals';
    
const Profile = () => {
    let URL;
    const [user,setUser] =useState(null)
    const [posts, setPosts] = useState(null)
    const dispatch = useDispatch()
    const {username} = useParams()
   const loadUser = async() => {
        const info = await (await axios.get(`${URL}/api/user/${username}`)).data;
         setUser(info)
         console.log(info)
       
         
     }
     const  getMyPosts = async() => {
        let res = await (await axios.get(`${URL}/api/posts/${username}`, )).data
       console.log(res)
       setPosts(res)
       
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
    if (user !== null && posts !== null) {
        
    
    return (
        
        <div className='flex flex-col overflow-x-hidden'>
            <ProfileVitals user={user} posts={posts}/>
            
          

        <div className='lg:flex lg:mt-[-9em] lg:flex-row gap-[5em] '>
            <div className='mt-[10em] hidden bg-white px-7 py-9 font-[Outfit] rounded-xl 
            ml-[10em]  h-fit  justify-start lg:flex lg:flex-col lg:gap-5 border  '>
            <div className='flex gap-2 w-fit'>
                    <SlNote className='text-xl ' />
                    <p className='font-[Outfit] w-[10em] font-light text-sm'> {posts? posts.length : 0} Posts published</p>
                </div>
                <div className='flex gap-2'>
                    <HiHashtag className='text-xl' />
                    <p className='font-[Outfit] font-light text-sm'> {user ?user.followingTags.length : 0} Tags Followed</p>
                </div>
                <div className='flex gap-2 '>
                    <FaRegComment className='text-xl' />
                    <p className='font-[Outfit] font-light text-sm'> 0 Comment Added</p>
                </div>
              
            </div>
            <div className=' flex flex-col gap-4  lg:mt-[10em] '>
            {
             posts !== null && posts.map((myPost) => {
                return <Post readingTimeStyles="top-[-3em]" additionalStyles="w-[95%] ml-[.5em] lg:w-[30em] " key={myPost._id} post={myPost} />
             })
            }
            
            </div>
        </div>

        </div>
    )
} else {
        return (
            <>
            <div className='flex flex-col'>
             <Page404/>
            </div>
            </>
        )
    }
}

export default Profile;

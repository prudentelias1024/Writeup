import React, { useState } from 'react';
import { BsBriefcase, BsBriefcaseFill, BsCalendarWeek, BsEnvelope } from 'react-icons/bs';
import { Link, useParams, useRoutes } from 'react-router-dom';
import NavBar from './NavBar';
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
    
const Profile = () => {
    let URL;
    const [user,setUser] =useState(null)
    const [myPosts, setMyPosts] = useState(null)
    const dispatch = useDispatch()
    const {username} = useParams()
   const loadUser = async() => {
        const info = await (await axios.get(`${URL}/api/user/${username}`,)).data;
         setUser(info)
         console.log(info)
       
         
     }
     const  getMyPosts = async() => {
        let res = await (await axios.get(`${URL}/api/posts/${username}`, )).data
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
    if (user !== null && myPosts !== null) {
        
    
    return (
        
        <div className='flex flex-col overflow-x-hidden'>
            <NavBar/>
            
            <div className=" bg-white mb-[6em] pt-[5em] text-center border w-[100%] top-[2.5em] rounded-xl lg:top-[4.5em] relative flex-col lg:mt-[5em] lg:w-4/5  lg:ml-[10em]  lg:pt-[4em]">
            <Link to="/settings">
            <button className='bg-blue-600 text-white w-[7em] h-[3em] font-bold text-sm absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Edit Profile</button>
            </Link>
             <img className='rounded-full w-[3.5em] h-[3.5em] lg:w-[7em] lg:h-[7em] ml-auto mr-auto' src={user.public_picture} alt={user.name}  />
             <div className='flex flex-row justify-center'>

             <p className=" text-lg font-bold font-[Outfit] text-[#616161]  lg:text-2xl lg:mt-[1em]">{user.name}</p>
             {  user.verified? <HiBadgeCheck  className="text-xl text-blue-500 mt-1"  />: ''}
             </div>
             <p className=" text-sm font-[Outfit]  text-[#a2a2a2] font-semibold mt-[.2em] mb-[1em] lg:text-xl">@{user.username}</p>
             <p className=" text-sm font-[Outfit]  text-[#333] font-medium mt-[.2em] mb-[1em] lg:px-[8em] lg:text-xl">{user.bio !== ''? user.bio: 'No Bio Yet'}</p>
                <div className="flex flex-row gap-4 mb-[1em] ml-[1.2em] lg:ml-[22em] max-lg:ml-[33em] lg:pb-[2em]">
                <div className='joined flex flex-row text-[#acaaaa] font-[Outfit] font-bold gap-2'>
                    <BsCalendarWeek className=' text-base mt-1 lg:text-xl'/>
                    <p className='font-[Outfit] text-lg'>{format(user.joined_on)}</p>
                </div>
                <div className='joined flex flex-row text-[#acaaaa] font-bold gap-2'>
                    <BsEnvelope className='text-base mt-1 lg:text-xl'/>
                    <p className='font-[Outfit] text-lg'> {user.email}</p>
                </div>

                </div>
                <hr />
                <div className="flex flex-row justify-center mt-[1em] mb-[2em]">
                    <div className="education flex flex-col text-[#acaaaa]">

                        <FaGraduationCap className='text-lg ml-10 lg:text-3xl font-bold' />
                        <p className='font-[Outfit] font-bold text-sm'>Education</p>
                        <p className='font-[Outfit] font-bold text-base'>{user.work !== '' ? user.work: 'No Work Added'}</p>
                    </div>

                    <div className="work flex text-[#acaaaa] flex-col">
                        <BsBriefcaseFill className='text-lg ml-10 lg:text-3xl' />
                        <p className='font-[Outfit] font-bold text-sm'>Occupation</p>
                        <p className='font-[Outfit] font-bold text-base'>{user.work !== '' ? user.work: 'No Work Added'}</p>

                    </div>
                </div>
            </div>


        <div className=' lg:flex lg:mt-[-9em] lg:flex-row gap-[5em] '>
            <div className='hidden bg-white px-7 py-9 font-[Outfit] rounded-xl 
            ml-[10em]  h-fit  justify-start lg:flex lg:flex-col lg:gap-5 border  '>
            <div className='flex gap-2 w-fit'>
                    <SlNote className='text-xl ' />
                    <p className='font-[Outfit] w-[10em] font-light text-sm'> {myPosts? myPosts.length : 0} Posts published</p>
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
             myPosts !== null && myPosts.map((myPost) => {
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

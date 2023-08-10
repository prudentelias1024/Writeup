import React, { useState } from 'react';
import { BsCalendarWeek, BsEnvelope } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { SlNote } from "react-icons/sl";
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';
import { FaRegComment } from 'react-icons/fa';
import DashboardPosts from './Dashboard/DashboardPosts';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/index";
import {format} from '../time'
    
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
            
            <div className=" bg-white mb-[6em] pt-[2em] w-[100%] ml-[0em]  rounded-xl lg:top-[4.5em] relative flex-col lg:mt-[5em] lg:w-4/5  lg:ml-[10em]  lg:pt-[4em]">
         <div  className="activity_info flex flex-row justify-evenly">
             <img className='rounded-full w-[3.5em] h-[3.5em] lg:w-[7em] lg:h-[7em]' src={user.public_picture} alt={user.name}  />
                <div className="post_activity text-center">
                    <p className='text-2xl font-[Sen] font-bold '> {myPosts? myPosts.length : 0}</p>
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
            <div className="flex flex-col ml-[2em] mt-[.75em]">
             <div className='flex flex-row'>
             <p className=" text-lg font-bold font-[Avenir] text-[#616161]  lg:text-2xl lg:mt-[1em]">{user.name}</p>
             <HiBadgeCheck className="text-xl text-blue-500 relative top-[.2em]"/>
             </div> 
             <p className=" text-sm font-[Avenir]  text-[#a2a2a2] font-semibold  mb-[1em] lg:text-xl">@{user.username}</p>
            </div>

            <div className="profile_actions left-[2em] flex flex-row justify-evenly mt-[1em]">
                            <Link to="/settings">
            <button className='border-purple-600 text-purple-500 font-[Sen] border-2 px-[1em] w-fit h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Edit Profile</button>
            </Link>
                            <Link to="/settings">
            <button className='border-blue-600 text-blue-500 font-[Sen] border-2 px-[1em] w-fit h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Share Profile</button>
            </Link>

            </div>
                {/* <div className="flex flex-row gap-4 justify-center mb-[1em] ml-[1.2em] lg:ml-[3em] lg:pb-[2em]">
                <div className='joined flex flex-row text-[#acaaaa] font-[Montserrat] font-bold gap-2'>
                    <BsCalendarWeek className=' text-base lg:text-xl mt-1.5'/>
                    <p className='font-[Outfit] text-xs lg:text-xl'>{format(user.joined_on)}</p>
                </div>
                <div className='joined flex flex-row text-[#acaaaa] font-bold gap-2'>
                    <BsEnvelope className='text-base lg:text-xl mt-1.5'/>
                    <p className='font-[Outfit] text-xs lg:text-xl'> {user.email}</p>
                </div>

                </div>
            */}
            </div>


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

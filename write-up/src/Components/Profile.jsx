import React from 'react';
import { BsCalendarWeek, BsEnvelope } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { SlNote } from "react-icons/sl";
import { HiHashtag } from 'react-icons/hi';
import { FaRegComment } from 'react-icons/fa';
import DashboardPosts from './Dashboard/DashboardPosts';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/index";

    
const Profile = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
   const loadUser = async() => {
        const info = await (await axios.get('http://localhost:5000/api/user',{headers: {Authorization: localStorage.getItem('token')}}
         )).data;
         dispatch(actions.updateUser(info))
         
     }
    useEffect(() => {
        loadUser()
       
    }
    , []);
    return (
        
        <div className='flex flex-col'>
            <NavBar/>
            
            <div className=" bg-white mb-[6em] pt-[5em] text-center border w-[95%] ml-[.75em] rounded-xl top-[4.5em] relative flex-col lg:w-4/5 lg:ml-[14em]  lg:pt-[3em]">
            <Link to="/settings">
            <button className='bg-blue-600 text-white w-[7em] h-[3em] font-bold text-sm absolute top-4 right-6 lg:right-0  rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Edit Profile</button>
            </Link>
             <img className='rounded-full w-[3.5em] h-[3.5em] lg:w-[7em] lg:h-[7em] ml-auto mr-auto' src={user.public_picture} alt={user.name}  />
             <p className=" text-lg font-bold font-[Montserrat] text-[#616161]  lg:text-2xl lg:mt-[1em]">{user.name}</p>
             <p className=" text-sm font-[Montserrat]  text-[#a2a2a2] font-semibold mt-[.2em] mb-[1em] lg:text-xl">@{user.username}</p>
                <div className="flex flex-row gap-4 mb-[1em] ml-[1.2em] lg:ml-[33em] lg:pb-[2em]">
                <div className='joined flex flex-row text-[#acaaaa] font-[Montserrat] font-bold gap-2'>
                    <BsCalendarWeek className=' text-base lg:text-xl'/>
                    <p className='font-[Mulish] text-xs'>{user.joined_on}</p>
                </div>
                <div className='joined flex flex-row text-[#acaaaa] font-bold gap-2'>
                    <BsEnvelope className='text-base lg:text-xl'/>
                    <p className='font-[Mulish] text-xs'> {user.email}</p>
                </div>

                </div>
            </div>


        <div className=' w-full lg:flex lg:flex-row justify-between '>
            <div className='hidden bg-white px-7 py-9 font-[Mulish] rounded-xl ml-[14em] mt-[10em] h-fit w-[20em] justify-start lg:flex lg:flex-col lg:gap-5 border '>
              
                <div className='flex gap-2'>
                    <SlNote className='text-2xl' />
                    <p className='font-[Mulish] font-semibold text-xl'> 0 Posts published</p>
                </div>
                <div className='flex gap-2'>
                    <HiHashtag className='text-2xl' />
                    <p className='font-[Mulish] font-semibold text-xl'> 0 Tags Followed</p>
                </div>
                <div className='flex gap-2 '>
                    <FaRegComment className='text-2xl' />
                    <p className='font-[Mulish] font-semibold text-xl'> 0 Comment Added</p>
                </div>
            </div>
            <div className=' flex flex-col gap-4  lg:mt-[10em] lg:mr-[20em]'>

            <DashboardPosts />
            <DashboardPosts />
            <DashboardPosts />
            </div>
        </div>
        </div>
    );
}

export default Profile;

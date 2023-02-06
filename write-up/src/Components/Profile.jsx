import React, { useContext } from 'react';
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

    console.log(user)
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
            
            <div className=" bg-white  border rounded-xl top-32 relative flex-col w-4/5 ml-[14em] text-center pt-[3em]">
            <Link>
            <button className='bg-blue-600 text-white p-3 rounded-lg w-[10em] mr-[5em] absolute right-0 '>Edit Profile</button>
            </Link>
             <img className='rounded-full w-[7em] h-[7em]  ml-auto mr-auto' src={user.public_picture} alt={user.name}  />
             <p className="text-2xl font-[Montserrat] text-[#616161] font-semibold mt-[1em]">{user.name}</p>
             <p className="text-xl font-[Montserrat]  text-[#a2a2a2] font-semibold mt-[.2em] mb-[1em]">@{user.username}</p>
                <div className="flex flex-row gap-4  ml-[33em] pb-[2em]">
                <div className='joined flex flex-row text-[#acaaaa] font-[Montserrat] font-bold gap-2'>
                    <BsCalendarWeek className='text-xl'/>
                    <p className='font-[Mulish]'>{user.joined_on}</p>
                </div>
                <div className='joined flex flex-row text-[#acaaaa] font-bold gap-2'>
                    <BsEnvelope className='text-xl'/>
                    <p>{user.email}</p>
                </div>

                </div>
            </div>


        <div className='flex flex-row justify-between '>
            <div className='bg-white px-7 py-9 font-[Mulish] rounded-xl ml-[14em] mt-[10em] h-fit w-[20em] justify-start flex flex-col gap-5 border '>
              
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
            <div className=' flex flex-col gap-4 mt-[10em] mr-[20em]'>

            <DashboardPosts />
            <DashboardPosts />
            <DashboardPosts />
            </div>
        </div>
        </div>
    );
}

export default Profile;

import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Contexts/userContext';
import DashboardPosts from './Dashboard/DashboardPosts';
import DetailsCard from './Dashboard/DetailsCard';
import  NavBar  from "./NavBar";
const Dashboard = () => {
    const {setUser,user} = useContext(userContext);
    const loadUser = async() => {
        setUser(await (await axios.get('http://localhost:5000/api/user',{headers: {Authorization: localStorage.getItem('token')}}
        )).data);
    }
    
    useEffect(() => {
    loadUser() 
    }
    , []);
    return (
        <>
            <NavBar/>
            <div className="top-32 relative flex-col">
               <p className="flex flex-col font-[Montserrat] font-semibold ml-44 text-4xl">Dashboard</p>
               <div className="flex flex-row pt-[4em] gap-6  pl-[10em]">
                <DetailsCard color="bg-pink-500"/>
                <DetailsCard color="bg-green-500"/>
                <DetailsCard color="bg-orange-500"/>
                <DetailsCard color="bg-purple-500"/>
               </div>
               <div className="flex flex-row gap-3 ml-[11em] mt-[3em]">
                <div className="dashboard_navs">
                    <ul >
                        <li className='block hover:bg-green-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Posts <div className='bg-green-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-red-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Followers <div className='bg-red-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-yellow-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Following users <div className='bg-yellow-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-purple-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Following tags <div className='bg-purple-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-orange-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Analytics <div className='bg-orange-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                    </ul>
                </div>
                <div className="posts flex flex-col gap-2 ml-[13em]">
                    <p className="text-2xl font-bold ml-16  ">Your Posts</p>
                    <DashboardPosts/>
                </div>
               </div>
            </div>
        </>
    );
}

export default Dashboard;

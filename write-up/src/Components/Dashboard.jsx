import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../Contexts/userContext';
import DashboardPosts from './Dashboard/DashboardPosts';
import DetailsCard from './Dashboard/DetailsCard';
import  NavBar  from "./NavBar";
const Dashboard = () => {
    const [myPosts, setMyPosts] = useState([])
    const [numberOfPosts, setNumberOfPosts] = useState(null)
    const [ totalLikes, setTotalLikes] = useState(null)
    const [ totalComments, setTotalComments] = useState(null)
    const [ totalBookmark, setTotalBookmark] = useState(null)
   const ref = useRef()
   const navigate = useNavigate()
   const handleChange = () => {
    navigate(ref.current.value)

   }
  const  getMyPosts = async() => {
   let res = await (await axios.get('http://localhost:5000/api/user/posts', {headers: {Authorization:  localStorage.getItem('token')}})).data
  console.log(res)
   setMyPosts(res)
   setNumberOfPosts(res.length)
}
  const  getTotalLikes = async() => {
   let res = await (await axios.get('http://localhost:5000/api/user/posts/totalLikes', {headers: {Authorization:  localStorage.getItem('token')}})).data
  console.log(res)
  setTotalLikes(res.totalLikes)
}
  const  getTotalComments = async() => {
   let res = await (await axios.get('http://localhost:5000/api/user/posts/totalComments', {headers: {Authorization:  localStorage.getItem('token')}})).data
  console.log(res)

    setTotalComments(res.totalComments)
}
  const  getTotalBookmarks = async() => {
   let res = await (await axios.get('http://localhost:5000/api/user/posts/totalBookmarks', {headers: {Authorization:  localStorage.getItem('token')}})).data
  console.log(res)
  setTotalBookmark(res.totalBookmarks)
}
    useEffect(() => {
        setMyPosts(getMyPosts())
        
        getTotalLikes()
      getTotalComments()
        getTotalBookmarks()
    },[])
    return (
        <>
            <NavBar/>
            <div className="top-32 relative flex-col ">
               <p className="flex flex-col font-[Montserrat] font-semibold text-2xl ml-[1em] mb-[1em] lg:ml-44 lg:text-4xl">Dashboard</p>
               <div className="grid grid-cols-2  w-[90%] ml-[1em] gap-[.5em] lg:flex lg:flex-row lg:ml-[1em] lg:pt-[4em] lg:gap-6  lg:pl-[14em]">
               { 
                totalLikes !== null && totalComments !== null && totalBookmark !== null ? <>
                 <DetailsCard text="Total Posts" amount={numberOfPosts} color="bg-pink-500"/>
                <DetailsCard text="Total Likes" amount={totalLikes} color="bg-green-500"/>
                <DetailsCard text="Total Comments" amount={totalComments} color="bg-orange-500"/>
                <DetailsCard text="Total Bookmarks Receieved" amount={totalBookmark} color="bg-purple-500"/></> : ''
               }
               </div>
               <div className=" lg:flex lg:flex-row lg:gap-3 lg:ml-[11em] mt-[3em]">
                <div className="dashboard_navs hidden lg:block">
                    <ul >
                        <li className='block hover:bg-green-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Posts <div className='bg-green-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-red-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Followers <div className='bg-red-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-yellow-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Following users <div className='bg-yellow-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-purple-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Following tags <div className='bg-purple-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                        <li className='block hover:bg-orange-200'><Link className='flex flex-row gap-2 p-3 text-2xl mt-[.5em] '>Analytics <div className='bg-orange-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                    </ul>
                </div>
                <div className="filterer lg:hidden relative top-[-25em]">
                   
                        <select onChange={handleChange}  ref={ref} className='w-[95%] rounded-sm outline-blue-600
                         h-[2.5em] ml-[.75em] border'>
                            <option   value="Dashboard">
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
                <div className="posts flex flex-col gap-2 lg:ml-[13em]">
                    <p className="text-2xl font-bold ml-3 mb-4 lg:ml-16  ">Your Posts</p>
                  
                  {
                    myPosts.length > 0  ? myPosts.map((mypost) => {
                        return  <DashboardPosts key={mypost._id} post={mypost}/>
                    }) :<>
                    <div className='flex flex-row gap-1 m-auto text-center'>
                        
                     <p className='font-[Mulish]'> No Posts Yet??</p>
  
                     <Link to='/create' className='font-[Mulish] text-blue-600 mb-6'> Write a Post</Link>
                    </div>
                    </>
                  }
                   
                </div>
               </div>
            </div>
        </>
    );
}

export default Dashboard;

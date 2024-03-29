import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DashboardPosts from './Dashboard/DashboardPosts';
import DetailsCard from './Dashboard/DetailsCard';
import DraftsPosts from "./Dashboard/DraftPosts";
import  NavBar  from "./NavBar";
import { actions } from '../store';
const Dashboard = () => {
   let URL
    const [myPosts, setMyPosts] = useState([])
    // const [draftPosts, setDraftPosts] = useState([])
    const [draftPostsAmount, setDraftPostsAmount] = useState(0)
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const [ totalLikes, setTotalLikes] = useState(0)
    const [ totalComments, setTotalComments] = useState(0)
    const [ totalBookmark, setTotalBookmark] = useState(0)
    const [ totalCollboaratedPosts, setTotalCollboratedPosts] = useState(0)
    const [collaboratedPosts, setCollaboratedPosts] = useState(null)
    const {user,drafts} = useSelector(state => state)
    const dispatch = useDispatch()
   const ref = useRef()
   const navigate = useNavigate()
   const handleChange = () => {
    navigate(ref.current.value)

   }
  const  getMyPosts = async() => {
   let res = await (await axios.get(`${URL}/api/user/posts/my`, {headers: {Authorization:  localStorage.getItem('token')}})).data
  
  console.log(res)
   setMyPosts(res)
   setNumberOfPosts(res.length)
}
  const  getDraftPosts = async() => {
   let res = await (await axios.get(`${URL}/api/user/posts/drafts`, {headers: {Authorization:  localStorage.getItem('token')}})).data
   console.log(res)
    // setDraftPosts(res)
    dispatch(actions.updateDrafts(res))
    setDraftPostsAmount(res.length)

}

  const getCollaboratedPosts = async() => {
    let res = await (await axios.get(`${URL}/api/user/posts/collaborated`, {headers: {Authorization:  localStorage.getItem('token')}})).data
    console.log(res)
    setCollaboratedPosts(res)
    setTotalCollboratedPosts(res.length)
  }
  const  getTotalLikes = async() => {
   let res = await (await axios.get(`${URL}/api/user/posts/totalLikes`, {headers: {Authorization:  localStorage.getItem('token')}})).data
  console.log(res)
  setTotalLikes(res.totalLikes)
}
  const  getTotalComments = async() => {
   let res = await (await axios.get(`${URL}/api/user/posts/totalComments`, {headers: {Authorization:  localStorage.getItem('token')}})).data
  console.log(res)

    setTotalComments(res.totalComments)
}
  const  getTotalBookmarks = async() => {
   let res = await (await axios.get(`${URL}/api/user/posts/totalBookmarks`, {headers: {Authorization:  localStorage.getItem('token')}})).data
  console.log(res)
  setTotalBookmark(res.totalBookmarks)
}
  
    useEffect(() => {
      if (process.env.NODE_ENV == 'production') {
        URL = "https://inkup-api.onrender.com"
      }else{
        URL = "http://localhost:5000"
               
      }
        getMyPosts()
        getDraftPosts()
        getTotalLikes()
      getTotalComments()
        getTotalBookmarks()
        getCollaboratedPosts()
    },[])
    return (
        <>
            <NavBar/>
            <div className="lg:top-32 top-4 relative flex-col ">
               <p className="flex flex-col font-[Outfit] font-semibold text-2xl  lg:mb-[-1em] ml-[1em] mb-[1em] lg:ml-[3em] lg:text-4xl">Dashboard</p>
               <div className="grid grid-cols-2  w-full ml-[1em] gap-[.5em] lg:gap-[1em] lg:grid lg:grid-cols-3 lg:ml-[1em] lg:pt-[4em] lg:gap-6 lg:pl-[6em] ">
               { 
                totalLikes !== null && totalComments !== null && totalBookmark !== null ? <>
                 <DetailsCard text="Total Posts" amount={numberOfPosts} color="bg-pink-500"/>
                <DetailsCard text="Total Drafts" amount={draftPostsAmount} color="bg-yellow-500"/>
                <DetailsCard text="Collaborated Posts" amount={totalCollboaratedPosts} color="bg-blue-500"/>
                <DetailsCard text="Total Likes" amount={totalLikes} color="bg-green-500"/>
                <DetailsCard text="Total Comments" amount={totalComments} color="bg-orange-500"/>
                <DetailsCard text="Total Bookmarks " amount={totalBookmark} color="bg-purple-500"/> 
                </>
                : 'Loading......'
               }
               </div>
               <div className=" lg:flex lg:flex-row lg:gap-3 lg:ml-[5em]  mt-[3em]">
                <div className="dashboard_navs hidden lg:block">
                    <ul >
                        <li className='block font-[Maven] hover:bg-green-200'><Link className='flex flex-row gap-2 font-[Sora] p-3 text-2xl mt-[.5em] '>Posts <div className='bg-green-500 text-white p-1 border border-gray-200 w-fit rounded-full'>{numberOfPosts}</div> </Link></li>
                        <li className='block font-[Maven] hover:bg-red-200'><Link className='flex flex-row gap-2 font-[Sora] p-3 text-2xl mt-[.5em] '>Followers <div className='bg-red-500 text-white p-1 border border-gray-200 w-fit rounded-full'>{user ?user.followers.length : '0'}</div> </Link></li>
                        <li className='block font-[Maven] hover:bg-yellow-200'><Link className='flex flex-row gap-2 font-[Sora] p-3 text-2xl mt-[.5em] '>Following users <div className='bg-yellow-500 text-white p-1 border border-gray-200 w-fit rounded-full'>{user ?user.following.length : '0'}</div> </Link></li>
                        <li className='block font-[Maven] hover:bg-purple-200'><Link className='flex flex-row gap-2 font-[Sora] p-3 text-2xl mt-[.5em] '>Following tags <div className='bg-purple-500 text-white p-1 border border-gray-200 w-fit rounded-full'>{user ? user.followingTags.length: '0'}</div> </Link></li>
                        <li className='block font-[Maven] hover:bg-orange-200'><Link className='flex flex-row gap-2 font-[Sora] p-3 text-2xl mt-[.5em] '>Analytics <div className='bg-orange-500 text-white p-1 border border-gray-200 w-fit rounded-full'>0</div> </Link></li>
                    </ul>
                </div>
                <div className="filterer lg:hidden relative top-[-26.5em]">
                   
                        <select onChange={handleChange}  ref={ref} className='w-[95%] rounded-sm outline-blue-600
                         h-[2.5em] relative top-[-11.8em] ml-[.75em] border'>
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
                <div className="posts flex flex-col gap-2 lg:ml-[5em] ">
                    <p className="text-2xl font-bold ml-3 mb-4 lg:ml-16  ">Your Posts</p>
                  
                  {
                    myPosts &&  myPosts.length > 0  ? myPosts.map((mypost) => {
                        return  <DashboardPosts key={mypost._id} post={mypost}/>
                    }) :<>
                    
                    <div className='flex flex-row gap-1 m-auto text-center'>
                        
                     <p className='font-[Outfit]  lg:mt-[-10em] lg:ml-[4em]'> No Posts Yet??</p>
  
                     <Link to='/create' className='font-[Outfit] text-blue-600 mb-6 lg:mt-[-10em] lg:ml-[0em]'> Write a Post</Link>
                    </div>
                    </>
                  }
               
                <div className=" flex flex-col gap-2 lg:ml-[5em] ">
                    <p className="text-2xl font-bold ml-3 mt-[2em] mb-4 lg:ml-[-1em]  ">Drafts</p>
                  
                  {
                    drafts &&  drafts.length > 0  ? drafts.map((myDraft) => {
                        return  <DraftsPosts key={myDraft._id} draft={myDraft}/>
                    }) :<>
                   <div className='flex flex-row gap-1 m-auto text-center'>
                        
                     <p className='font-[Outfit]  lg:mt-[5em] lg:ml-[4em]'> No Drafts Yet??</p>
  
                     <Link to='/create' className='font-[Outfit] text-blue-600 mb-6 lg:mt-[5em] lg:ml-[0em]'> Write a Post</Link>
                    </div>
                    </>
                  }
                   
                </div>
                
                <div className=" flex flex-col gap-2 lg:ml-[5em] ">
                    <p className="text-2xl font-bold ml-3 mt-[2em] mb-4 lg:ml-[-1em]  ">Collaborated Post</p>
                  
                  {
                    collaboratedPosts &&  collaboratedPosts.length > 0  ? collaboratedPosts.map((coll) => {
                        return <DraftsPosts key={coll._id} draft={coll}/>
                    }) :<>
                    <div className='flex flex-col gap-1 m-auto text-center'>
                        
                     <p className='font-[Outfit]  lg:mt-[2em] lg:ml-[4em]'> No Collaborated Post Yet??</p>
  
                     <Link to='/create' className='font-[Outfit] text-blue-600 mb-6 lg:mt-[0em] lg:ml-[3em]'> Write a Post to Collaborate</Link>
                    </div>
                    </>
                  }
                   
                </div>
                </div>
               </div>
            </div>
        </>
    );
}

export default Dashboard;

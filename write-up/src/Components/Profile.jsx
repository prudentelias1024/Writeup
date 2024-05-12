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
import { useRef } from 'react';
import Poll from './poll';
import ImageReel from './imageReel';
import { ThreeDots } from 'react-loader-spinner';
import { MdOutlinePodcasts } from 'react-icons/md';
import {Helmet} from 'react-helmet'
const Profile = () => {
    let URL;
    const reelsRef = useRef()
    const inksRef = useRef()
    const [inkClicked, setInkClicked] = useState(false)
    const [reelsClicked, setReelClicked] = useState(false)
    const [reels, setReels] = useState(null)
    const [user,setUser] =useState(null)
    const [posts, setPosts] = useState(null)
    const dispatch = useDispatch()
    const {username} = useParams()
    const [userExists,setUserExists] = useState(true)
    const handleInksContentDisplay = () => {
        setInkClicked(true)
        setReelClicked(false)
    
      }
      const handleReelsDisplay = () => {
        setInkClicked(false)
        setReelClicked(true)
    
      }
     
   const loadUser = async() => {
        const info = await (await axios.get(`${URL}/api/user/${username}`)).data;
        if (info == null){
          setUserExists(false)
        }
         setUser(info)
         console.log(info)
         
     }
     const  getPosts = async() => {
        let res = await (await axios.get(`${URL}/api/posts/${username}`, )).data
       console.log(res)
       setPosts(res)
       
     }
     const  getReels = async() => {
        let reels = await (await axios.get(`${URL}/api/reels/${username}`, )).data
        console.log(reels)
        let options = []
        reels.map((reel) => {

        
        if(reel.options.length > 0){
          let totalVotes = 0
          reel.options.map((option) => {
            totalVotes += option.vote
            
             
            })
            reel.totalVotes = totalVotes
            if(totalVotes !== 0){
  
            
            reel.options.map((option,index) => {
             let vote = option.vote
           
  
             let percentage =  (vote/ totalVotes) * 100
          option = {...option, percentage: percentage }
          options.push(option)

        })
           reel.options = options
          options = []
      
         
      } else {
       
          reel.options.map((option,index) => {
             option = {...option, percentage: 0 }
             options.push(option)

             })
             reel.options = options
             options = []
           
          
      
            }
          }
        })

          setReels(reels)
          console.log(reels)

     }
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
        loadUser()
        getPosts()
        getReels()
        setInkClicked(true)
        setReelClicked(false)
       
           }
    , []);
    if (user !== null && posts !== null) {
    return (
        <>
        <Helmet>

          <title> {user.name}</title>
          <meta name='description'
          content={user.name+ (user.username)+ 'on Inkup'}/>

        </Helmet>
        <div className='flex flex-col overflow-x-hidden'>
        {
          posts && reels ?
        <ProfileVitals user={user} setUser={setUser} total={posts.length + reels.length}/>
        : 'Loading.....'
        }
        
        <div className='lg:flex lg:mt-[-9em] lg:flex-row gap-[5em] '>
            <div className='mt-[10em] hidden bg-white px-7 py-9 font-[Outfit] rounded-xl 
           lg:ml-[10em]  h-fit  justify-start lg:flex lg:flex-col lg:gap-5 border  '>
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
            <div className="flex flex-row w-full -mt-[4em]">
        {
        inkClicked ?
        
        <div ref={inksRef} onClick={handleInksContentDisplay} className="content  w-1/2 text-blue-500 underline underline-offset-[1em] p-[1em]   ">
          <p className="font-[Sen] text-center text-sm font-semibold ">Inks</p>
        </div> :
        <div ref={inksRef} onClick={handleInksContentDisplay} className="content  w-1/2  p-[1em]   ">
          <p className="font-[Sen] text-center text-sm font-semibold ">Inks</p>
        </div> 

        }
        {
    reelsClicked?
    <div ref={reelsRef} onClick={handleReelsDisplay} className="reels  w-1/2 text-blue-500 underline underline-offset-[1em] p-[1em]  ">
            <p className="font-[Sen] text-center text-sm font-semibold ">Reels</p>
            </div>:
    <div ref={reelsRef} onClick={handleReelsDisplay} className="reels  w-1/2   p-[1em]  ">
            <p className="font-[Sen] text-center text-sm font-semibold ">Reels</p>
            </div>
}
</div>
            <div className=' flex flex-col gap-4  lg:mt-[10em] '>
            {
            inkClicked ?
            posts == null || posts.length == 0  ?
            <p className="font-[Sen] text-lg font-bold text-[#9e9e9e] mt-[1em] text-center">No Post yet</p>
            :  posts.map((post) => {
                
                return <Post readingTimeStyles="top-[-3em]" additionalStyles="w-[95%] ml-[.5em] lg:w-[30em] " key={post._id} post={post} />
             })  
             :''
    }
            {
            reelsClicked ?
              reels !== null && reels.length > 0  ? reels.map((reel) => {
                
                if(reel.type == "poll"){
                    return <Poll reel={reel} key={reel.reelId} /> 
                   }else if(reel.type == "image"){
                    return <ImageReel reel={reel} key={reel.reelId} /> 
                  }
             }) :
             <p className="font-[Sen] text-lg font-bold text-[#9e9e9e] mt-[1em] text-center">No Reels</p>
             : ''     
            }
            
            </div>
        </div>

        </div>
        </>
    )
}else if(userExists == false){
  return (<Page404/>)
}else {
        return (
            <>
            <div className='flex flex-col'>
              <ThreeDots 
  height="80" 
  width="80" 
  radius="9"
  color="#4fa94d" 
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
 />            </div>
            </>
        )
    }
}

export default Profile;

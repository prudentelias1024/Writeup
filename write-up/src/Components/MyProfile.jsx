import React, { useState, useRef } from 'react';
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
import UserNav from './Navbar/UserNav';
import Poll from './poll';
import ImageReel from './imageReel';
import Post from './Post';
    
const MyProfile = () => {
    const {myPosts} = useSelector(state => state)
    const {myReels} = useSelector(state => state)
    const {user} = useSelector(state => state)
    let URL;
    const reelsRef = useRef()
    const inksRef = useRef()
    const [inkClicked, setInkClicked] = useState(false)
    const [reelsClicked, setReelClicked] = useState(false)
    const handleInksContentDisplay = () => {
        setInkClicked(true)
        setReelClicked(false)
    
      }
      const handleReelsDisplay = () => {
        setInkClicked(false)
        setReelClicked(true)
    
      }
   
    // const dispatch = useDispatch()
    // const loadUser = async() => {
    //     const info = await (await axios.get(`${URL}/api/user`,{headers: {Authorization: localStorage.getItem('token')}}
    //     )).data;
    //      dispatch(actions.updateUser(info))
                
    //  }
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
              URL = "http://localhost:5000"
              
            }
            // loadUser()
            setInkClicked(true)
            setReelClicked(false)
     
        }
        , []);
        if (user) {
            
            
            return (
                <>
                
        <div className='flex flex-col'>
        {
          myPosts && myReels ?
        <ProfileVitals user={user} total={myPosts.length + myReels.length}/>
        : 'Loading.....'
        }
     
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
            <div className=' flex flex-col gap-4  lg:mt-[10em] mb-[7em] '>
            {
            inkClicked ?
            myPosts == null || myPosts.length == 0  ?
            <p className="font-[Sen] text-lg font-bold text-[#9e9e9e] mt-[1em] text-center">No Post yet</p>
            :  myPosts.map((post) => {
                console.log(post.author)
                
                return <Post
                 readingTimeStyles="top-[-3em]" additionalStyles="w-[95%] ml-[.5em] lg:w-[30em] " key={post._id} post={post} />
             })  
             :''
    }
            {
            reelsClicked ?
              myReels !== null && myReels.length > 0  ? myReels.map((reel) => {
                
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
        <UserNav/>
        </>
    )} else {
        return ''
    }
}

export default MyProfile;

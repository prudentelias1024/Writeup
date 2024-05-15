import React from 'react'
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export default function Repost({reposts,post,reelUpdater,postId,username,posttype}) {
    const {URL} = useSelector(state => state)
    const {user} = useSelector(state => state)
    
    const  checkReposted = (reposters) => {
   
        if (reposters) {
       
        let reposted = reposters.some((reposter) => {
          return reposter._id === user._id
         })
         console.log(reposted)
          setReposted(reposted)
        
      }
    }
    const repost = async(postId) => {
         setReposted(true)
        if(posttype === 'reel'){
            let  res = await(await axios.post(`${URL}/reel/repost`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
            reelUpdater(res)
            console.log(res)
        }
        
    } 
    
    const undoRepost = async(postId) => {
        setReposted(false)
        if(posttype === 'reel'){
            let  res = await(await axios.post(`${URL}/reel/unrepost`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
            reelUpdater(res)
            console.log(res)
        }
      
        } 

    useEffect(() => {
        checkReposted(reposts,username)
    },[])


    const [reposted,setReposted] = useState(false)
    if (reposted === true) {
   return(
        <div className="flex flex-row gap-3  ">
        <BiRepost onClick={(event) => undoRepost(post,postId)} className="text-2xl mt-[-.1em]  text-green-500 "/> 
        <p className="font-[Sen] text-green-500 -mt-[.09em]">{
           reposts.length
        } </p> 
        {/* <p className="hidden lg:block font-[Sen]  ml-[-.5em] -mt-[.09em]">Reposts </p>  */}
        
    </div>
    )
    } else {
        return(
            <div className="flex flex-row gap-3  text-[#a4a4a4]">
        <BiRepost onClick={(event) => repost(post,postId)} className="text-2xl text-[#a4a4a4] mt-[-.1em]    "/> 
        <p className="font-[Sen] text-[#a4a4a4] -mt-[.09em]">{
           reposts.length
        } </p> 
        {/* <p className="hidden md:block lg:block font-[Sen] ml-[-.5em] -mt-[.09em]">Reposts </p>  */}
        
    </div>
        )
    }
}
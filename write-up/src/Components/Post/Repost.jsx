import React from 'react'
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export default function Repost({reposts,post,reelUpdater,postId,username,posttype}) {
    const {URL} = useSelector(state => state)
    const {user} = useSelector(state => state)
    
    const  checkReposted = (reposters,username) => {
   
        if (reposters) {
       
        let currentUser = reposters.filter((reposter) => {
          return reposter == user._id
         })
         if(currentUser.length > 0){
          setReposted(true)
         }
      }
    }
    const repost = async(post,postId) => {
         setReposted(true)
        if(posttype == 'reel'){
            let  res = await(await axios.post(`${URL}/reel/repost`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
            reelUpdater(res)
            console.log(res)
        }
        
    } 
    
    const undoRepost = async(post,postId) => {
        setReposted(false)
        if(posttype == 'reel'){
            let  res = await(await axios.post(`${URL}/reel/unrepost`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
            reelUpdater(res)
            console.log(res)
        }
      
        } 

    useEffect(() => {
        checkReposted(reposts,username)
    },[])


    const [reposted,setReposted] = useState(false)
    if (reposted == true) {
   return(
        <div className="flex flex-row gap-3 m-auto ">
        <BiRepost onClick={(event) => undoRepost(post,postId)} className="text-2xl mt-[-.1em] ml-[0.25em] text-green-500 "/> 
        <p className="font-[Sen] text-green-500 -mt-[.09em]">{
           reposts.length
        } </p> 
        <p className="hidden lg:block font-[Sen]  ml-[-.5em] -mt-[.09em]">Reposts </p> 
        
    </div>
    )
    } else {
        return(
            <div className="flex flex-row gap-3 m-auto ">
        <BiRepost onClick={(event) => repost(post,postId)} className="text-2xl text-black mt-[-.1em] ml-[0.25em] "/> 
        <p className="font-[Sen] text-black -mt-[.09em]">{
           reposts.length
        } </p> 
        <p className="hidden md:block lg:block font-[Sen] ml-[-.5em] -mt-[.09em]">Reposts </p> 
        
    </div>
        )
    }
}
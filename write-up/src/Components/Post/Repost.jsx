import React from 'react'
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Repost({reposts,postId,username}) {
    let URL;
    const  checkReposted = (reposter,username) => {
   
        if (reposter) {
       
        let currentUser = reposter.filter((bookmarker) => {
          return bookmarker.username == username
         })
          console.log(currentUser)
         if(currentUser.length > 0){
          setReposted(true)
         }
      }
    }
    const repost = async(postId) => {
         setReposted(true)
        let  res = await(await axios.post(`${URL}/post/repost`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
        console.log(res)
       
        } 
        
        const undoRepost = async(postId) => {
           setReposted(false)
        let  res = await(await axios.post(`${URL}/post/unrepost`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
        console.log(res)
        } 

    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
        checkReposted(reposts,username)
    },[])


    const [reposted,setReposted] = useState(false)
    if (reposted == true) {
   return(
        <div className="flex flex-row gap-3 m-auto ">
        <BiRepost onClick={(event) => undoRepost(postId)} className="text-2xl mt-[-.1em] ml-[0.25em] text-green-500 "/> 
        <p className="font-[Sen] text-green-500 -mt-[.09em]">{
           reposts.length
        } </p> 
        <p className="hidden lg:block font-[Sen]  ml-[-.5em] -mt-[.09em]">Reposts </p> 
        
    </div>
    )
    } else {
        return(
            <div className="flex flex-row gap-3 m-auto ">
        <BiRepost onClick={(event) => repost(postId)} className="text-2xl text-black mt-[-.1em] ml-[0.25em] "/> 
        <p className="font-[Sen] text-black -mt-[.09em]">{
           reposts.length
        } </p> 
        <p className="hidden md:block lg:block font-[Sen] ml-[-.5em] -mt-[.09em]">Reposts </p> 
        
    </div>
        )
    }
}
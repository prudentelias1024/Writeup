import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
export function Like({likes,postId,username,reelUpdater,posttype,additionalStyles}){
  const {URL} = useSelector(state => state)
  const {user} = useSelector(state => state)
     const [liked,setLiked] = useState(false)
     
    const  checkLiked = (likers,username) => {
        console.log(username)
         if ( likers ) {
       
        let currentUser = likers.filter((liker) => {
          return liker.username == username
         })
         console.log(currentUser)
         if( currentUser.length > 0 ){
          setLiked(true)
         }
        }
    
      }
      useEffect(() => {
        checkLiked(likes,username)
        console.log(likes)
        console.log(username)

    },[])

    const likePost = async(postId) => {
      setLiked(true)
      if(posttype == 'reel'){
      let  res = await(await axios.post(`${URL}/reel/like`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
      reelUpdater(res)
      console.log(res)
    }else {
      let  res = await(await axios.post(`${URL}/post/like`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
      reelUpdater(res)
    }
    
  } 
  const unlikePost = async(postId) => {
    setLiked(false)
    if(posttype == 'reel'){
      let  res = await(await axios.post(`${URL}/reel/unlike`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
      reelUpdater(res)
      console.log(res)
      } else {
        let  res = await(await axios.post(`${URL}/post/unlike`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
        reelUpdater(res)
        
      } 
      } 
       
        
       if (liked == false) {
      return (
        <div className="flex flex-row gap-3">
        <FaRegHeart onClick={(event) => {likePost(postId)}} className={additionalStyles ? additionalStyles + "text-xl bg-white":"text-xl text-red-500"}/> 
        <div className="flex gap-2">
        <p className="font-[Outfit] text-red-500 -mt-[.09em]">
            {
               likes.length
            } 
        </p>
        <p className="hidden lg:block font-[Outfit] -mt-[.09em]">Likes</p>
            </div>
    </div>
      )
       } else {
         return(
            <div className="flex flex-row gap-3">
            <FaHeart onClick={(event) => {unlikePost(postId)}} className={additionalStyles ? additionalStyles + "text-xl":"text-xl text-red-500"}/> 
            <div className="flex gap-2">
            <p className="font-[Outfit] text-red-500 -mt-[.09em]">
                {
                    likes.length
                } 
            </p>
            <p className="hidden md:block lg:block font-[Outfit] -mt-[.09em]">Likes</p>
                </div>
        </div>
         )
       }
        
       
   
}
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
export function Like({likes,postId,username,setReel,posttype,additionalStyles}){
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
      setReel(res)
      console.log(res)
    }else {
      let  res = await(await axios.post(`${URL}/post/like`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
      setReel(res)
    }
    
  } 
  const unlikePost = async(postId) => {
    setLiked(false)
    if(posttype == 'reel'){
      let  res = await(await axios.post(`${URL}/reel/unlike`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
      setReel(res)
      console.log(res)
      } else {
        let  res = await(await axios.post(`${URL}/post/unlike`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
        setReel(res)
        
      } 
      } 
       
        
       if (liked == false) {
      return (
        <div className="flex flex-row gap-1">
        <FaRegHeart onClick={(event) => {likePost(postId)}} className={additionalStyles ? additionalStyles + "text-lg bg-white":"mt-[.1em] text-[#a4a4a4]  "}/> 
        <div className="flex gap-2">
        <p className=" text-[#a4a4a4] -mt-[.15em]">
            {
               likes.length
            } 
        </p>
        {/* <p className="hidden lg:block font-[Outfit] -mt-[.09em]">Likes</p> */}
            </div>
    </div>
      )
       } else {
         return(
            <div className="flex flex-row gap-3">
            <FaHeart onClick={(event) => {unlikePost(postId)}} className={additionalStyles ? additionalStyles + "text-base":"text-xl text-red-500"}/> 
            <div className="flex gap-2">
            <p className="font-[Outfit] text-red-500 -mt-[.09em]">
                {
                    likes.length
                } 
            </p>
            {/* <p className="hidden md:block lg:block font-[Outfit] -mt-[.09em]">Likes</p> */}
                </div>
        </div>
         )
       }
        
       
   
}
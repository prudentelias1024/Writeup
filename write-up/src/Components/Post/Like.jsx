import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export function Like({likes,postId,username}){
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
    })
    const [liked,setLiked] = useState(false)

    const likePost = async(postId) => {
        setLiked(true)
        let  res = await(await axios.post(`http://localhost:5000/post/like`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
        
        // setPost(res)
           
        } 
      const unlikePost = async(postId) => {
        let  res = await(await axios.post(`http://localhost:5000/post/unlike`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
        setLiked(false)
        console.log(res)
        // setPost(res)
           
        } 
        
       if (liked == true) {
      return (
        <div className="flex flex-row gap-3">
        <FaHeart onClick={(event) => {likePost(postId)}} className="text-xl "/> 
        <div className="flex gap-2">
        <p className="font-[Mulish] -mt-[.09em]">
            {
                likes.length
            } 
        </p>
        <p className="hidden lg:block font-[Mulish] -mt-[.09em]">Likes</p>
            </div>
    </div>
      )
       } else {
         return(
            <div className="flex flex-row gap-3">
            <FaRegHeart onClick={(event) => {unlikePost(postId)}} className="text-xl "/> 
            <div className="flex gap-2">
            <p className="font-[Mulish] -mt-[.09em]">
                {
                    likes.length
                } 
            </p>
            <p className="hidden lg:block font-[Mulish] -mt-[.09em]">Likes</p>
                </div>
        </div>
         )
       }
        
       
   
}
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
export function Bookmark({bookmarks,postId,username}){
    let URL;
    const  checkBookmarked = (bookmarkers,username) => {
   
        if (bookmarkers) {
       
        let currentUser = bookmarkers.filter((bookmarker) => {
          return bookmarker.username == username
         })
          console.log(currentUser)
         if(currentUser.length > 0){
          setBookmarked(true)
         }
      }
    }
    const bookmarkPost = async(postId) => {
         setBookmarked(true)
        let  res = await(await axios.post(`${URL}/post/bookmark`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
        console.log(res)
       
        } 
        
        const unbookmarkPost = async(postId) => {
           setBookmarked(false)
        let  res = await(await axios.post(`${URL}/post/unbookmark`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
        console.log(res)
        } 

    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
        checkBookmarked(bookmarks,username)
    },[])


    const [bookmarked,setBookmarked] = useState(false)
    if (bookmarked == true) {
   return(
        <div className="flex flex-row gap-3 m-auto ">
        <FaBookmark onClick={(event) => unbookmarkPost(postId)} className="text-xl mt-[-.1em] ml-[0.25em] "/> 
        <p className="font-[Mulish] -mt-[.09em]">{
           bookmarks.length
        } </p> 
        <p className="hidden lg:block font-[Mulish] -mt-[.09em]">Bookmarks </p> 
        
    </div>
    )
    } else {
        return(
            <div className="flex flex-row gap-3 m-auto ">
        <FaRegBookmark onClick={(event) => bookmarkPost(postId)} className="text-xl mt-[-.1em] ml-[0.25em] "/> 
        <p className="font-[Mulish] -mt-[.09em]">{
           bookmarks.length
        } </p> 
        <p className="hidden lg:block font-[Mulish] -mt-[.09em]">Bookmarks </p> 
        
    </div>
        )
    }
}
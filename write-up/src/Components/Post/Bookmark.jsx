import axios from "axios";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
export function Bookmark({bookmarks,setReel, postId,username,posttype}){
    const {URL} = useSelector(state => state)
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
        let  res =await ( await axios.post(`${URL}/post/bookmark`,{ postId:postId, type: posttype }, {headers: {Authorization: localStorage.getItem('token')}})).data
        setReel(res)
        return axios.post(`${URL}/api/user/bookmarks`,{ postId:postId , type: posttype}, {headers: {Authorization: localStorage.getItem('token')}}).data
        
        
    } 
    
    const unbookmarkPost = async(postId) => {
        setBookmarked(false)
        let  res = await(await axios.post(`${URL}/post/unbookmark`,{ postId:postId, type:posttype }, {headers: {Authorization: localStorage.getItem('token')}})).data
        setReel(res)
        return axios.delete(`${URL}/api/user/bookmarks`,{ postId:postId , type: posttype}, {headers: {Authorization: localStorage.getItem('token')}}).data
        
        } 

    useEffect(() => {
        checkBookmarked(bookmarks,username)
    },[])


    const [bookmarked,setBookmarked] = useState(false)
    if (bookmarked == true) {
   return(
        <div className="flex flex-row gap-3  ">
        <FaBookmark onClick={(event) => unbookmarkPost(postId)} className="text-xl  text-purple-500 "/> 
        <p className="font-[Sen] text-purple-500 -mt-[.09em]">{
           bookmarks.length
        } </p> 
        {/* <p className="hidden lg:block font-[Sen]  ml-[-.5em] -mt-[.09em]">Bookmarks </p>  */}
        
    </div>
    )
    } else {
        return(
            <div className="flex flex-row gap-3  ">
        <FaRegBookmark onClick={(event) => bookmarkPost(postId)} className="text-xl text-purple-500 mt-[-.1em]  "/> 
        <p className="font-[Sen] text-purple-500 -mt-[.09em]">{
           bookmarks.length
        } </p> 
        {/* <p className="hidden md:block lg:block font-[Sen] ml-[-.5em] -mt-[.09em]">Bookmarks </p>  */}
        
    </div>
        )
    }
}
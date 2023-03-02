import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Post from './Post';
import SideNavTags from './Sidenav/SideNavTags';
import {useSelector} from 'react-redux'
const ReadLater = () => {
    const bookmarkedPosts = useSelector(state => state.bookmarkedPosts)
     const [tags, setTags] = useState(null)
  
     let temp = []
    const extractTags = (post) => {
        console.log(post)
        post.map((bookmarkedPost,index) => {
            bookmarkedPost.tags.toString().split(',').map((tag) => {
              temp.push(tag)
             
              })
            })
            
          
       
    }
    useEffect(() => {
    setTimeout(() => {

        extractTags(bookmarkedPosts)
    },2000)
    },[])
    return (
        <>
           <NavBar/>
            <div className="top-32 relative flex flex-row">
           
            <div className="flex flex-col  pl-3 lg:ml-[4em] h-[15em] px-10 ">
            {/* { 
             tags !== null ?  
             tags.followingTags.map((tag,index) => 
               
               
               {return <SideNavTags  tag={"#"+tag} key={index}/>}
               ): ''
             
            } */}
           
           
           
            </div>
           
            

            {/* <div  className='bg-white w-1/3  pl-[1em]'>
             {  
                 bookmarkedPosts !== null && bookmarkedPosts.length > 0 ? bookmarkedPosts.map((bookmarkedPost,index) => {
                     console.log(bookmarkedPost)
                     return <Post key={index} removeReactions="hidden" post={bookmarkedPost}/>
                    }) : '<p> No Post Bookmarked <p>'
                }
                </div> */}
                
            
            </div>
        </>
    );
}

export default ReadLater;

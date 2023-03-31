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
        post.map((bookmarkedPost,index) => {
            bookmarkedPost.tags.toString().split(',').map((tag) => {
             if(!temp.includes(tag)){
                 temp.push(tag)

             }
             
              })
            })
            
          setTags(temp)
       
    }
    useEffect(() => {
   

        extractTags(bookmarkedPosts)
    
    },[])
    return (
        <>
           <NavBar/>
            <div className="top-32 relative flex flex-row lg:gap-[8em] max-lg:[40em]">
           
            <div className="flex flex-col  pl-3 lg:ml-[6em] h-[15em] px-10 ">
                <p className='font-[Outfit] text-xl font-bold mb-[1em] ml-[-2em]'>Tags Bookmarked</p>
            {
             
             tags !== null ?  
             tags.map((tag,index) => 
               
               
               {return <SideNavTags  tag={tag} key={index}/>}
               ): ''
             
            }
           
           
           
            </div>
           
            

            {  
                 bookmarkedPosts !== null && bookmarkedPosts.length > 0 ? bookmarkedPosts.map((bookmarkedPost,index) => {
                     console.log(bookmarkedPost)
                     return <Post key={index} removeReactions="hidden" additionalStyles="lg:w-[35em]" post={bookmarkedPost}/>
                    }) : '<p> No Post Bookmarked <p>'
                }
                
            
            </div>
        </>
    );
}

export default ReadLater;

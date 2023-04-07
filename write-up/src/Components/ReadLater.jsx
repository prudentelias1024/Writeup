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
            <div className="lg:top-32 top-4 relative flex flex-col lg:flex-row lg:gap-[8em] mb-[3em]">
           
            <div className=" flex flex-col  pl-3 lg:ml-[6em] h-[15em] px-10 mb-[-3em] lg:mb-0">
                <p className='font-[Outfit] text-xl font-bold mb-[1em] mx-auto lg:ml-[-2em]'>Tags Bookmarked</p>
           <div className='lg:hidden flex ml-[-.5em] flex-wrap '>
            {
             tags !== null ?  
             tags.map((tag,index) => 
               
               
               {return   <>
                <div className='lg:hidden bg-white border border-1 rounded-full w-fit h-fit  px-[1em] py-[.45em] mt-2 '> 
                <p key={index}>{tag}</p></div>
               <div className='hidden lg:block'>
                   <SideNavTags  tag={tag} key={index}/> 
                   </div>
               
               </>
            }
               ): ''
             
            }
            </div>
           
           
           
            </div>
           
            

            {  
                 bookmarkedPosts !== null && bookmarkedPosts.length > 0 ? bookmarkedPosts.map((bookmarkedPost,index) => {
                     console.log(bookmarkedPost)
                     return <Post key={index} removeReactions="hidden" additionalStyles="lg:w-[35em] pb-[1em]" post={bookmarkedPost}/>
                    }) : '<p> No Post Bookmarked <p>'
                }
                
            
            </div>
        </>
    );
}

export default ReadLater;

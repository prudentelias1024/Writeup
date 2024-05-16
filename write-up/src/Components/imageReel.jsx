import React, { useRef } from 'react'
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
import {  Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { BiRepost } from 'react-icons/bi'
import { InReactions } from './Post/InReactions'

export default function ImageReel({reel,reelUpdate}) {
  const [viewed,setViewed] = useState(false)
  const [reposted,setReposted] = useState(false)
  const [post, setPost] = useState(reel)
    const commentRef = useRef()
    const {user} = useSelector(state => state)
    const  checkReposted = (reposters) => {
      if (reposters) {
     
      let reposted = reposters.some((reposter) => {
        return reposter._id == user._id
       })
        setReposted(reposted)
       
    }
  }

  useEffect(() => {
    checkReposted(post.reposts,user.username)
    // checkViewed() 
  }, [])
    //  const checkViewed = () => {
    //   if (user !== null) {
    //     let status =  post.viewedBy.some((viewer) => {return viewer !== user._id })
    //     setViewed(status)
    //   }
     
    const handleComment = () => {
      let comment =  commentRef.current.value
      console.log(comment)

  }
  return (
    <>
    
   <div className=' bg-white w-full h-fit lg:border lg:pr-[4em] mt-[1em]  pt-[1em] '>
    
   {reposted ? <div className=' inline-flex w-full'>
    <BiRepost className='text-md mt-[.5em] ml-[1.25em] text-[#cecece]'/>
    <p className="font-[Sen] text-sm text-[#cecece] ml-[5%] mt-[0.5em] font-bold">You reposted</p> </div>: '' 
   } 
     
             {/* {      viewed ?                   
          <p className='font-[Outfit] mt-[1em] lg:mr-[0em] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg mb-[1em] lg:mb-[1em]'>Viewed </p>: ''
             } */}
           
           
            <div>        
                <AuthorInfo timestamp={post.created}   author={post.author}/>
                <div className="tags w-full flex-wrap  flex flex-row ml-[2em] lg:pl-[4em] pr-[1.5em]  m-auto gap-2 mb-[1em]  lg:gap-[.5em] lg:ml-[0em] ">
                  {
                    
                    post.tags.toString().split(',').map((tag) => {
                      return(
                      <>
                      
                     
                      <Tag key={tag} name={tag}/>
                      </>
                      )
                    })
                  }
                 
                  </div>
                  <Link to={'/reels/'+post.postId} >
                 < ReactQuill   value={post.text}
                  readOnly={true}
                  theme={"bubble"}
                  style={{fontFamily: 'Sen'}}
               className='font-[Outfit] px-[1em] text-start ml-[1em] w-fit mx-[1.25em] leading-8 whitespace-normal font-extrabold text-3xl  my-[.5em] lg:text-3xl lg:mb-[.5em] pr-[1.25em]  '/>
                  
                  <img src={post.coverImageURL} className=" w-[100%] h-[45%] object-cover  rounded-sm " alt="" />
                    
                    </Link>
            
                <Reactions setReposted={setReposted} reelUpdater={setPost} post={post} posttype={'reel'} remove={false}/>
               
   </div>
   

   </div>

{/* <div className="comment__box flex flex-row justify-evenly bg-white py-[.5em] mb-[2em] rounded-lg">
    <img src={mock} alt={user.name} className='h-[2.5em] w-[2.5em] rounded-full' />
    <input ref={commentRef} type="text" className='w-[75%]   rounded-md h-[2em] mt-[.25em] ml-[-.25em] font-[Outfit] mb-[0em] font-bold placeholder:font-bold border-2' />
    <button onClick={handleComment} className='font-[Outfit] text-blue-500'>Send</button>
</div> */}
</>
  )
}

import React, { useRef } from 'react'
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
import {  Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function ImageReel({reel}) {
  const [viewed,setViewed] = useState(false)
  const user = {
    username: 'elias1024', name:'Prudent Elias', public_picture: mock 
}
    const commentRef = useRef()
  // useEffect(() => {
    // checkViewed() 
  // }, [])
    //  const checkViewed = () => {
    //   if (user !== null) {
    //     let status =  reel.viewedBy.some((viewer) => {return viewer !== user._id })
    //     setViewed(status)
    //   }
     
    const handleComment = () => {
      let comment =  commentRef.current.value
      console.log(comment)

  }
  return (
    <>
    
   <div className=' bg-white w-full h-fit border   pt-[1em] '>
             {/* {      viewed ?                   
          <p className='font-[Outfit] mt-[1em] lg:mr-[0em] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg mb-[1em] lg:mb-[1em]'>Viewed </p>: ''
             } */}
           
           
            <div>        
                  <AuthorInfo timestamp={reel.created}   author={reel.author}/>
                <div className="tags w-full flex-wrap  flex flex-row ml-[2em] lg:pl-[4em] pr-[1.5em]  m-auto gap-2 mb-[1em]  lg:gap-[.5em] lg:ml-[0em] ">
                  {
                    
                    reel.tags.toString().split(',').map((tag) => {
                      return(
                      <>
                      
                     
                      <Tag key={tag} name={tag}/>
                      </>
                      )
                    })
                  }
                 
                  </div>
                 <p className='font-[Outfit] px-[1em] text-start ml-[1em]  mx-[1.25em] leading-8 whitespace-normal font-extrabold text-2xl w-full my-[.5em] lg:text-3xl lg:mb-[.5em] pr-[1.25em]  lg:ml-auto'>{reel.text}</p>
                  
                  <img src={reel.coverImageURL} className=" w-[100%] h-[45%] object-cover  rounded-sm " alt="" />
                    
                <Reactions post={reel} remove={false}/>
               
   </div>
   

   </div>

<div className="comment__box flex flex-row justify-evenly bg-white py-[.5em] mb-[2em] rounded-lg">
    <img src={mock} alt={user.name} className='h-[2.5em] w-[2.5em] rounded-full' />
    <input ref={commentRef} type="text" className='w-[75%]   rounded-md h-[2em] mt-[.25em] ml-[-.25em] font-[Outfit] mb-[0em] font-bold placeholder:font-bold border-2' />
    <button onClick={handleComment} className='font-[Outfit] text-blue-500'>Send</button>
</div>
</>
  )
}

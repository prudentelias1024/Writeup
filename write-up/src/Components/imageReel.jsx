import React, { useRef } from 'react'
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
import { BsThreeDots } from "react-icons/bs";
import {  Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { BiRepost } from 'react-icons/bi'
import { InReactions } from './Post/InReactions'
import { AiFillDelete } from "react-icons/ai";
import { IoPencil } from "react-icons/io5";
import axios from "axios";
import { actions } from "../store/index";

export default function ImageReel({reel,reelUpdate}) {
  const dispatch = useDispatch()
  const {URL, aiURL} = useSelector(state => state)
  const [viewed,setViewed] = useState(false)
  const [openPostAction, setOpenPostAction] = useState(false)
  const [reposted,setReposted] = useState(false)
  const [post, setPost] = useState(reel)
  
  const toggleAction = () => {
     if(openPostAction == false){
      setOpenPostAction(true)
      
    } else {
       setOpenPostAction(false)

     }
    }

    const deletePost = async(postId) => {
     
      const  res = await(await axios.delete(`${URL}/reels/${postId}`,{headers: {Authorization: localStorage.getItem('token')}})).data

      if(res.status == 200){
        //refresh the post and update in UI using most preferably socket or api-ly
          const reels = await (await axios.get(`${URL}/api/user/reels/my`,  {headers: {Authorization:  localStorage.getItem('token')}})).data
           
         dispatch(actions.updateReels([...reels]))
        
      }
    }


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
    
    
   <div className=' bg-white dark:bg-[#000] dark:text-white w-full h-fit border lg:pr-[4em] mt-[0em]  pt-[1em] '>
       <BsThreeDots onClick={toggleAction} className='relative lg:left-[105%] left-[90%]' />
       {
        openPostAction && post.author.username == user.username?

       <div className="post_action border p-3 rounded-lg w-fit flex flex-col gap-[.5em] absolute  lg:left-[53%] right-[0%]">


          <div  className="flex flex-row gap-[.25em] cursor-pointer">
          <IoPencil className="text-blue-500 text-base mt-[.25em] "/>
          <p className=' text-blue-500 text-base'>Edit Post</p>
          </div>
         
         <hr></hr>

          <div onClick={() => {deletePost(post.postId)}} className="flex flex-row gap-[.25em] cursor-pointer  " >
          <AiFillDelete className="text-red-500 text-base mt-[.25em] "/>
          <p className=' text-red-500 text-base'>Delete Post</p>
          </div>
         

</div>

:''
       }
   {reposted ? <div className=' inline-flex w-full'>
    <BiRepost className='text-md mt-[.5em] ml-[1.25em] text-[#cecece]'/>
    <p className=" text-sm text-[#cecece] ml-[5%] mt-[0.5em] font-bold">You reposted</p> </div>: '' 
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
                 
                 
                 < ReactQuill value={post.text}
                  readOnly={true}
                  theme={"bubble"}
                  style={{fontFamily: ' Sen'}}

               className=' text-[#454444] dark:text-white w-full  mb-0 px-[1em] text-start ml-[.7em] lg:w-fit mx-[1.25em] leading-8 whitespace-normal font-normal text-3xl lg:ml-[1em]  lg:text-3xl lg:-mt-[1.7em] pr-[1.25em] -mt-[2em]  '/>
                  
                  <img src={post.
                    
                    
                    coverImageURL} className=" w-[100%] h-[45%] object-cover  rounded-sm " alt="" />
                    
                    </Link>
            
                <Reactions setReposted={setReposted} reelUpdater={setPost} post={post} posttype={'reel'} remove={false} additionalStyles={" lg:ml-[4.5em] ml-[3.5em] mt-[.25em] "}/>
               
   </div>
   

   </div>

</>
  )
}

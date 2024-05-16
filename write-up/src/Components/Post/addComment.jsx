import React, {useRef, useState} from 'react'
import ReactQuill from 'react-quill'
import axios from 'axios'
import {v4} from 'uuid'

import { useSelector } from 'react-redux'
export default function AddComment({reelUpdater,post,user,url}) {
    const [formReset, setFormReset] = useState(false)
    const quillRef = useRef()
    let modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      }
   
    const HandleComment = (value) => {
        setComment(value)
        console.log(comment);
      }
      const commentPost = async(user,postId,name,author, commentWords) => {
        console.log(quillRef.current.value)
        setCommented(true)
        let  res = await(await axios.post(`${url}/reel/comment`,{
          postId: v4(),
          reelsPostId: post.postId,
          tags: [],
          type:  'text',
          text: quillRef.current.value,
          // options: optionFour == ''? [optionOne,optionTwo,optionThree]: [optionOne,optionTwo,optionThree, optionFour] ,
          options: [],
          reelImageURL : ''
          
        }, {headers: {Authorization: localStorage.getItem('token')}})).data
        reelUpdater(res)
        quillRef.current.value = ''
        let commentNotification = await(await axios.post(`${url}/api/notification/comment`, {postId:postId,post_name:name,author:author}, {headers: {Authorization: localStorage.getItem('token')}})).data 
        
        } 
   
     const [comment, setComment] = useState()
     const [commented, setCommented] = useState(false)
  return (

        <div className="comments -z-1 lg:relative fixed w-full ml-[0em] my-[1.5em] bottom-0 h-[3em] pb-[1em]">
            <div className='add_comment  w-full  py-[1em]  pl-[1em] pr-[1em]  flex flex-row mb-[5em] lg:ml-[0em]'>
            <img className='w-[3em] m-auto h-[3em] object-cover rounded-full' src={user.public_picture} alt={user.name} />

            <ReactQuill ref={quillRef}  modules={modules}  onChange={HandleComment} placeholder='Add Comment' theme='bubble'  style={{fontFamily: 'Sen', color: 'grey', paddingLeft: '0em', paddingBottom: '0em', background: "white", height: 'fit-content', width: '100%'}} />
            <button onClick={(event) => {commentPost(user._id,post.postId,post.title,post.author,comment)}}  className='cursor-pointer text-blue-500 h-fit w-fit mt-[0.4em] ml-[-1em]  rounded-full font-[Sen] '>Post</button>

            <div>

            </div>

            </div> 
            {/* <button onClick={(event) => {commentPost(user._id,post.postId,post.title,post.author,comment)}}  className='bg-blue-500 h-fit w-fit mt-[0.4em]  rounded-full font-[Sen] '>Post</button> */}


            </div>

      
  )
}

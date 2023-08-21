import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import axios from 'axios'
import { useSelector } from 'react-redux'
export default function AddComment({post,user}) {
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
        setCommented(true)
        let  res = await(await axios.post(`${URL}/post/comment`,{user:user, postId:postId, post_name:name,comment:commentWords}, {headers: {Authorization: localStorage.getItem('token')}})).data
        let commentNotification = await(await axios.post(`${URL}/api/notification/comment`, {postId:postId,post_name:name,author:author}, {headers: {Authorization: localStorage.getItem('token')}})).data 
        console.log(res)
        } 
   
     const [comment, setComment] = useState()
     const [commented, setCommented] = useState(false)
  return (

        <div className="comments -z-1">
            <div className='add_comment m-auto rounded-lg pt-[1em] pl-[1em]   flex flex-col mb-[5em] lg:ml-[5em]'>
             <img className='w-[2.5em] h-[2.5em] object-cover rounded-full' src={user.public_picture} alt={user.name} />
          
            <ReactQuill  modules={modules} defaultValue='' value={commented == true ? '' :comment } onChange={HandleComment} placeholder='Add Comment' theme='bubble'  style={{fontFamily: 'Sen', color: 'grey', paddingLeft: '3em', paddingBottom: '0em', background: "white", height: 'fit-content', width: '100%'}} />
            <div>

            <button onClick={(event) => {commentPost(user._id,post.postId,post.title,post.author,comment)}}  className='bg-blue-500 text-white h-[2.5em] w-[90%] rounded-lg font-[Sen] mb-[1em] mt-[2em]'>Comment</button>
            </div>


            </div>
            </div>
      
  )
}

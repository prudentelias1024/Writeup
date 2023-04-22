import React, { useState, useRef, useEffect } from 'react';
import CreatePosts from './createPosts';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PostEditor = () => {
   const location = useLocation()
   const {draftId}= useParams()
   const [draftPost, setDraftPost] = useState(null)
   let URL;
   useEffect(() => {
    if (process.env.NODE_ENV == 'production') {
        URL = "https://inkup-api.onrender.com"
      }else{
        URL = "http://localhost:5000"
               
      }
     getDraftPost()
    
}, [])
const  getDraftPost = async() => {
    let res = await (await axios.get(`${URL}/api/user/drafts/${draftId}`, {headers: {Authorization:  localStorage.getItem('token')}})).data
    console.log(res)
     setDraftPost(res)
     console.log(draftPost)
   
     
 }
  return (
    <>
    
    {
        draftPost !== null ?   <CreatePosts defaultValue={draftPost.body} draft={draftPost}/> : ''
    }
    </>
    );
}

export default PostEditor;

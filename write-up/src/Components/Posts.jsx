import Post from "./Post";
import mock from './mock.jpg'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
export default function Posts(){
    const [posts,setPosts] = useState([])
    const getPosts = async() => {
       let  res_posts = await(await axios.get('http://localhost:5000/posts',{headers: {Authorization: localStorage.getItem('token')}})).data
       setPosts(res_posts)
       console.log(res_posts)
    }
    useEffect(() => {
      getPosts()
     
    }, []);
    return(
       <div className="flex flex-col  m-auto  gap-8 pt-[9em] lg:pt-[1em] lg:absolute lg:top-40 lg:left-[45em]">
      
      {
        posts.map((post) => {
           return(<Post key={post._id} post={post} />)
             
        })
        
    }
    </div>

      
           
    );
}
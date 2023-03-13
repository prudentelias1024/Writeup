import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Post from '../Post';


const TagCard = () => {
    const {name} = useParams()
    console.log(name)
    const {user,showModal} = useSelector(state => state)
    const navigate = useNavigate()
   
    const [tagPosts, setTagPosts] = useState([])
   const getTagPosts = async() =>{
       const res =  await (await axios.get(`https://writeup-37ap.vercel.app/api/tags/${name}`)).data
       setTagPosts(res)
       if(res.length == 0){
           console.log('res')
         navigate('/*')
       }
    }
useEffect(() => {
  
   getTagPosts()
}, []);

    return (
        <div className='lg:pl-[9em]'>
            <div className='  border border-t-[1em] bg-white  flex  flex-col lg:gap-[30em]  text-center lg:flex-row lg:justify-center  border-t-red-500 p-[1em] leading-8 lg:rounded-xl lg:my-auto lg:mx-auto w-full mx-auto  lg:w-[50%] '>
           <p className='font-[Mulish] text-3xl font-bold capitalize ml-8'>{name}</p>
             {user !== null?
          <button className='text-red-500 rounded-full w-[13em] h-[3em] m-auto px-6 border-2 lg:ml-3 mt-[1.5em] font-bold border-red-500 lg:mb-4 lg:text-lg lg:mt-[-.25em]'>Follow</button>:
          <button className='text-red-500 rounded-full w-[13em] h-[3em] m-auto px-6 border-2 lg:ml-3 mt-[1.5em] font-bold border-red-500 lg:mb-4 lg:text-lg lg:mt-[-.25em]'>Follow</button>
             }
        </div>
        <div className="flex flex-col  m-auto  gap-8 pt-[9em] lg:pt-[1em] lg:absolute lg:top-40 lg:w-[35%] lg:ml-[35em]">

        {
            tagPosts.map((post) => (
                <Post key={post._id} post={post} />
                ))
            }
            </div>
       
        </div>
    );
}

export default TagCard;

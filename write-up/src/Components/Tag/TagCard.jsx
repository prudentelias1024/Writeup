import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Post from '../Post';


const TagCard = () => {
    const {name} = useParams()
    const navigate = useNavigate()
    const [tagPosts, setTagPosts] = useState([])
   const getTagPosts = async() =>{
       const res =  await (await axios.get(`http://localhost:5000/api/tags/${name}`)).data
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
        <div>
            <div className='  border border-t-[1em] bg-white  flex  flex-col  text-center lg:flex-row justify-between border-t-red-500 p-[1em] leading-8 lg:rounded-xl m-auto  lg:w-[70%] '>
           <p className='font-[Mulish] text-3xl font-bold capitalize'>{name}</p>
             
          <button className='text-red-500 rounded-full w-[13em] h-[3em] m-auto px-6 border-2 lg:ml-3 mt-[1.5em] font-bold border-red-500 lg:mb-4 lg:text-lg lg:mt-[-.25em]'>Follow</button>
        </div>
        <div className="flex flex-col  m-auto  gap-8 pt-[9em] lg:pt-[1em] lg:absolute lg:top-40 lg:left-[45em]">

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

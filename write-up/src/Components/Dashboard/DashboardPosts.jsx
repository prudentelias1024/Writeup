import React from 'react';
import { FaBookmark, FaEllipsisH,  FaRegBookmark,  FaRegComment, FaRegEye, FaRegHeart } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';
const DashboardPosts = ({post}) => {
    return (
        <div className="flex flex-col justify-around border rounded-xl  w-[90%] ml-4  h-fit bg-white py-2  lg:flex-row lg:w-[60em]  lg:px-4 lg:py-6 lg:ml-[4em]">
        <div className='flex flex-col'>
            <Link className="text-[#3b49df] text-xl w-full px-4 leading-8 lg:text-2xl font-bold font-[Mulish]" to="/dashboard">{post.title}</Link>
           
            <div className="dates flex gap-3 flex-row">
            <p className='font-bold text-[#787878] p-2 ml-2'>Published: 30 Jan</p> 
            <p className='font-bold text-[#787878] p-2 ml-2'>Edited: 30 Jan</p> 
          
            </div>
            </div>
            <div className="impressions flex flex-row gap-3 mt-2.5 ml-5">
               <div className='flex flex-row gap-1'>
                <FaRegHeart  className='  text-gray-500 text-2xl'/>
                <p className="total">{post.likes.length}</p>
                </div>
                <div className='flex flex-row gap-1'>
                <FaRegComment  className='text-gray-500 text-2xl'/>
                <p className="total">{post.comments.length}</p>
                </div>
                <div className='flex flex-row gap-1'>
                <FaRegBookmark  className='text-gray-500 text-2xl'/>
                <p className="total">{post.bookmarks.length}</p>
                </div>
                <div className='flex flex-row gap-1'>
                <FaRegEye  className='text-gray-500 text-2xl'/>
                <p className="total">{post.views}</p>
                </div>

                <div className="post_actions flex flex-row gap-3 -mt-2.5">
                <Link className="font-[Mulish] text-gray-500 mt-2">Edit</Link>
                <FaEllipsisH className="text-gray-500 text-xl mt-3"/>
            </div>

            </div>

         


</div>
    );
}

export default DashboardPosts;

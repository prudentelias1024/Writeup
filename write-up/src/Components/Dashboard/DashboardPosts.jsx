import React from 'react';
import { FaBookmark, FaEllipsisH,  FaRegBookmark,  FaRegComment, FaRegEye, FaRegHeart } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from '../../time';
const DashboardPosts = ({post}) => {
    const {user} = useSelector(state => state)
    return (
        <div className="flex flex-col justify-around border rounded-xl  w-[90%] ml-4  h-fit bg-white py-2  lg:flex-row max-lg:w-[60em] lg:w-[45em] lg:px-4 lg:py-6 lg:ml-[2em]">
        <div className='flex flex-col'>
            <Link className="text-[#3b49df] text-xl w-full px-4 leading-8 lg:text-2xl font-bold font-[Outfit]" to={'/p/@'+user.username+'/'+post.postId}>{post.title}</Link>
           
            <div className="dates flex gap-3 flex-row">
            <p className='font-bold text-[#787878] p-2 ml-2'>Published: {format(post.createdAt)}</p> 
          {
            post.edited !== undefined ?            <p className='font-bold text-[#787878] p-2 ml-2'>Edited: 30 Jan</p> 
   :''
          }
        
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
                <Link className="font-[Outfit] text-gray-500 mt-2">Edit</Link>
                <FaEllipsisH className="text-gray-500 text-xl mt-3"/>
            </div>

            </div>

         


</div>
    );
}

export default DashboardPosts;

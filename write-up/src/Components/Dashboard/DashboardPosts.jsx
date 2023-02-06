import React from 'react';
import { FaEllipsisH,  FaRegComment, FaRegEye, FaRegHeart } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';
const color = ["text-red-500","text-purple-500", "text-pink-500", "text-green-500", "text-orange-500", "text-blue-500"]
const DashboardPosts = () => {
    return (
        <div className="flex flex-row justify-around h-fit bg-white w-[60em] border rounded-xl px-4 py-6 ml-[4em]">
        <div className='flex flex-col'>
            <Link className="text-blue-700 text-2xl font-bold font-[Mulish]" to="/dashboard">How To Become Multimillionaire</Link>
            <div className="tags mt-2 mb-2 ">
                <Link className={color[Math.ceil(Math.random() * Math.random() /2 * 10)]   +" ml-1 tag font-semibold font-[Montserrat]   "}>#Lorem   </Link>
                <Link className={color[Math.ceil(Math.random() *0.5 /2 * 10)] +" ml-1 tag font-semibold font-[Montserrat]   "}>#Lorem   </Link>
                <Link className={color[Math.ceil(Math.random() *0.3 /2 * 10)] +" ml-1 tag font-semibold font-[Montserrat]   "}>#Lorem   </Link>
            </div>
            <div className="dates flex gap-3 flex-row">
            <p className='font-bold'>Published: 30 Jan</p> 
          
            </div>
            </div>
            <div className="impressions flex flex-row gap-3 mt-2.5">
               <div className='flex flex-row gap-1'>
                <FaRegHeart  className='  text-gray-500 text-2xl'/>
                <p className="total">3</p>
                </div>
                <div className='flex flex-row gap-1'>
                <FaRegComment  className='text-gray-500 text-2xl'/>
                <p className="total">3</p>
                </div>
                <div className='flex flex-row gap-1'>
                <FaRegEye  className='text-gray-500 text-2xl'/>
                <p className="total">3</p>
                </div>
            </div>

            <div className="post_actions flex flex-row gap-3">
                <Link className="font-[Mulish] text-gray-500 mt-2">Edit</Link>
                <FaEllipsisH className="text-gray-500 text-xl mt-3"/>
            </div>


</div>
    );
}

export default DashboardPosts;

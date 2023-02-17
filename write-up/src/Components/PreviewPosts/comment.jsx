import React from 'react';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';

const Comment = ({image}) => {
    return (
        <div className='comments flex flex-col' >

        <div className=' flex flex-row gap-[1em] m-auto lg:ml-[4em]'>
               <img src={image} className='ml-1 w-[3em] h-[3em] rounded-full object-cover lg:ml-0' /> 
                <div className="border border-[#f9f9f9] rounded p-4 shadow-sm w-5/6">
                    <p className="font-bold">Jules Candice</p>
                    <p className='leading-7'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam omnis ipsam qui placeat non ratione error quasi provident, cum doloremque, quos fugit ut quaerat sed quae veritatis nobis excepturi sapiente.</p>
                </div>
        </div>
               <div className='flex gap-[1em] mt-[1em] ml-[8em] mb-[2em]'>
               <div className='flex gap-4'>
               <FaRegHeart className='text-2xl text-[#717171] '/>
               <p className='text-lg -mt-1 text-[#717171]'>6 Likes</p>
               </div>
                <div className='flex gap-4'>
                    <FaRegComment className='text-2xl text-[#717171] '/>
                    <p className='text-lg -mt-1 text-[#717171]'>6 Replies</p>
                    </div>
               </div>


{/* 
               <div className="replies ml-[4em]">
               <div className=' flex flex-row gap-[1em] ml-[4em]'>
               <img src={image} className='w-[3em] h-[3em] rounded-full object-cover' /> 
                <div className="border border-[#f9f9f9] rounded p-4 shadow-sm w-5/6">
                    <p className="font-bold">Jules Candice</p>
                    <p className='leading-7'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam omnis ipsam qui placeat non ratione error quasi provident, cum doloremque, quos fugit ut quaerat sed quae veritatis nobis excepturi sapiente.</p>
                </div>
        </div>
               <div className='flex gap-[1em] mt-[1em] ml-[8em] mb-[2em]'>
               <div className='flex gap-4'>
               <FaRegHeart className='text-2xl text-[#717171] '/>
               <p className='text-lg -mt-1 text-[#717171]'>6 Likes</p>
               </div>
                <div className='flex gap-4'>
                    <FaRegComment className='text-2xl text-[#717171] '/>
                    <p className='text-lg -mt-1 text-[#717171]'>6 Replies</p>
                    </div>
               </div>
               </div> */}
        </div>
    );
}

export default Comment;

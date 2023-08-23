import React from 'react';
import {  FaRegHeart } from 'react-icons/fa';
import { GoMention } from 'react-icons/go';
import ReactQuill from 'react-quill';
import { Reactions } from '../Post/Reactions';

const Comment = ({commenter,timestamp,comment}) => {
     return (
        <div className='comments font-[Sen] border-b-[1px]  pt-[2em] flex flex-col z-0' >

        <div className=' flex flex-row gap-[.5em] ml-[1em] lg:ml-[4em]'>
               <img src={commenter.public_picture} className='ml-1 w-[2em] h-[2em] rounded-full object-cover lg:ml-0' /> 
                <div className="w-[80%] font-[Sen]">
                    <div className='-mt-1'>
                    <p className="font-bold">{commenter.name}</p>
                    <p className="font-bold text-xs text-[#9e9e9e]  ">@{commenter.username}</p>

                    </div>
                    <div className='font-[Sen] ml-[-.8em] '>

                    <ReactQuill className='z-0'
                  value={comment.text}
                  readOnly={true}
                  style={{fontFamily:'Sen'}}
                  theme={"bubble"}
                  />
                  </div>
                </div>
        </div>

            <Reactions post={comment} />
        </div>
    );
}

export default Comment;

import React from 'react';
import {  FaRegHeart } from 'react-icons/fa';
import { GoMention } from 'react-icons/go';
import ReactQuill from 'react-quill';
import { Reactions } from '../Post/Reactions';
import { InReactions } from '../Post/InReactions';

const Comment = ({commenter,timestamp,comment}) => {
     return (
        <div className='comments font-[Sen]  border-b-[1px] w-full   py-[2em]  flex flex-col z-0' >

        <div className=' flex flex-row gap-[.5em] w-full ml-[1.25em] '>
               <img src={commenter.public_picture} className='ml-1 w-[3em] h-[3em] rounded-full object-cover lg:ml-0' /> 
                <div className="w-full font-[Sen] flex flex-col">
                    <div className='-mt-1 flex flex-row gap-[.25em]'>
                    {/* <p className="font-bold text-xs text-[#9e9e9e]  ">Replying to @{}</p> */}

                    <p className="font-bold">{commenter.name}</p>
                    <p className="font-bold text-xs text-[#9e9e9e] mt-1 ">@{commenter.username}</p>

                    </div>
                    <div className='font-[Sen] -ml-[1em] my-[0em] '>

                    <ReactQuill className='z-0 font-[Sen]'
                  value={comment.text}
                  readOnly={true}
                  style={{fontFamily:'Sen'}}
                  theme={"bubble"}
                  />
                  </div>
                </div>
        </div>

            <InReactions post={comment} />
        </div>
    );
}

export default Comment;

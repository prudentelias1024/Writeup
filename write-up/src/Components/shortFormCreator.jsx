import React, { useEffect, useRef } from 'react';
import { FaImage, FaPoll } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';

const ShortFormCreator = () => {
    const {user} = useSelector(state => state)
    const quillRef = useRef()
    let modules = {
        syntax:true,
       toolbar: [
          [{ "header": [1, 2,3,4,5, false] }],
          ['image', 'code-block'],
          ['bold', 'italic', 'underline'],
          [ { 'list': 'bullet' }],
          ["link"]
      ]
    }
    const handleShortContent = () => {

    }
    useEffect(() => {
           

    }, []);
    if( user !== null){
    return (
            <div className='rounded-md border bg-white font-[Outfit] py-[1em] px-[.5em] flex flex-row gap-[1em] h-fit'>
            <img src={user.public_picture} alt={user.name} className="h-[3em] w-[3em] rounded-full" />  
            <div className="creator flex flex-col">
            <ReactQuill className='w-[30em]'  ref={quillRef} modules={modules}  placeholder='Add Post Reels' theme='bubble'  style={{color: 'black', fontFamily: 'Outfit', paddingLeft: '1em',  background: "white"}} />
           <div className='flex flex-row justify-between '>
             <div className="quick_tools flex flex-row gap-[1em] ml-[2em] ">
                <FaPoll className='text-2xl mt-[1em] text-[rgba(0,0,0,0.5)]'/>
                <FaImage className='text-2xl mt-[1em] text-[rgba(0,0,0,0.5)]' />
            </div>
            <div>
                <button className='font-bold bg-green-500 px-[2em] rounded-full text-white py-[.75em] mt-2'>Publish
                </button>
                </div>
            </div>
            </div>

            </div>
      
            );
            
        } else {
            return ''
        }
        }
export default ShortFormCreator;

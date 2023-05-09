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
            <div className='rounded-md border bg-white font-[Outfit]lg:mt-0 mt-[2em] py-[1em] px-[.5em] flex flex-row gap-[1em] h-fit'>
            <img src={user.public_picture} alt={user.name} className="h-[3em] w-[3em] rounded-full" />  
            <div className="creator flex flex-col">
            <ReactQuill className='w-[30em]'  ref={quillRef} modules={modules}  placeholder='Add Post Reels' theme='bubble'  style={{color: 'black', fontFamily: 'Outfit', paddingLeft: '1em',  background: "white", height: '100%', width: '100%'}} />
           <div className='flex flex-row justify-between '>
             <div className="quick_tools flex flex-row gap-[1em] ml-[-2em] lg:ml-[2em] ">
                <FaPoll className='text-2xl mt-[1em] text-[rgba(0,0,0,0.5)]'/>
                <FaImage className='text-2xl mt-[1em] text-[rgba(0,0,0,0.5)]' />
            </div>
            <div>
                <button className='font-bold bg-green-500 px-[1em] ml-[7em] lg:px-[2em] rounded-full text-white py-[.5em] lg:py-[.75em] mt-2 lg:ml-[2em] lg:ml-[2.5em]'>Publish
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

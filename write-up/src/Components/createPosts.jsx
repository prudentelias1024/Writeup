import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux';
import '../../node_modules/react-quill/dist/quill.bubble.css'

import mock from './mock.jpg'
import { useEffect } from 'react';
//TODO: 
    //Make Blog Postable on Inkup
    //cREATE mOBILE vERSION

const CreatePosts = () => {
   
     const titleImage = useRef()
    const [tempImage, setTempImage] = useState(null)
    const handleUploadImage = () =>{
        titleImage.current.click()
      
    } 
    const handleImageSelection = (event) => {
     setPost({...post, image: event.target.files[0]});
      let reader = new FileReader()
       reader.onloadend = () => {
        setTempImage(reader.result)
        }
        reader.readAsDataURL(event.target.files[0])

}
    const user = useSelector((state) => state.user)
    let modules = {
        syntax: true,
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      }
    const [post, setPost] = useState({
        title: '',
        body: '',
        tags: '',
        image: '',
        imageURL: '',
        postURL: '',
        user: user
    })
    const handlePostBody = (value) => {
    setPost({
        ...post, body: value
    })
    console.log(post)
}
const handlePostTitle = (event) => {
    setPost({
        ...post, title: event.target.value
    })
    console.log(post)
}
const handlePostTags = (event) => {
    setPost({
        ...post, tags: event.target.value
    })
    console.log(post)
    }
    const handlePostSubmission = () => {

    }
    const handleRemoveImage = () => {
   setPost({...post, image: '' })
   setTempImage(null)
    }
    
    return (
        <div className="create">
 <div className="ml-14">
      <p className="font-[Pacifico] mt-5 text-3xl font-extrabold ml-52 ">Ink Up</p>
  </div>
        <div className='text-editor bg-white text-black w-3/5 h-/5 flex flex-col border ml-[20em] mt-[5em] rounded-xl'>
        {
            tempImage !== null ? <>  
            <img src={tempImage} className='w-full h-[30em] object-cover' /> 
           <div className='flex place-content-center'>
            <button onClick={handleUploadImage} type='button' className='font-[Mulish] rounded-md bg-yellow-500 text-white w-[15em] h-[4em] ml-8 font-bold border mt-[2em] mb-[2em]'>Change</button>
            <button onClick={handleRemoveImage} type='button' className='font-[Mulish] rounded-md bg-red-500 text-white w-[15em] h-[4em] ml-8 font-bold border mt-[2em] mb-[2em]'>Remove</button>
            </div>
            </>
            : 
            <button onClick={handleUploadImage} type='button' className='font-[Mulish]  w-[15em] h-[4em] ml-8 font-bold border mt-[2em] mb-[2em]'>Add Cover Image</button>
        

        }
       
        <input onChange={handleImageSelection} ref={titleImage} type="file" className='opacity-0' />
          <input onChange={handlePostTitle} name='title' placeholder='Add Post Title '
                    className="rounded-md pl-[2.5em] outline-none   font-[Museo]  w-full font-bold placeholder:font-[Museo] placeholder:font-bold text-3xl h-[3em]" />
        <input onChange={handlePostTags} name='tags' placeholder='Add up to 4 tags '
                    className="rounded-md pl-[3em] outline-none   font-[Museo]  w-full font-bold placeholder:font-[Museo] placeholder:font-extralight text-xl text-gray-400 h-[3em]" />

            
        <ReactQuill modules={modules} onChange={handlePostBody} placeholder='Start Inking' theme='bubble'  style={{color: 'grey', paddingLeft: '3em', paddingBottom: '30em', background: "white", height: '100%', width: '100%'}} />
      
        </div>
        <div  className='-ml-24 mb-12'  >
        <button onClick={handlePostSubmission} className="bg-black text-white ml-[30em] rounded-lg w-[15em] mt-[2em] h-[4em]" type="submit">
               <p className='font-[Museo] text-xl font-semibol'>Publish</p>

          </button>
         <button type='submit' className='font-[Mulish] ml-8 font-bold'>Save as draft</button>
        </div>
        </div>
    );
}
   

// CreatePosts.modules = {
//     toolbar: [
//         [{header: "1"},{header: "2"},{font: []}],
//         [{size: []}],
//         ["bold","italic", "underline", "strike", "blockquote"],
//         [{list:"ordered"}, {list: "bullet"}],
//         ["link", "image", "video"],
//         ["clean"],
//         ["code-block"]
//     ]
// }
// CreatePosts.formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     "video",
//     "color",
//     "indent",
//     "code block"
// ]
export default CreatePosts;

import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux';
import '../../node_modules/react-quill/dist/quill.bubble.css'
import mock from './mock.jpg'
import  axios  from "axios";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
const CreatePosts = () => {
     const quillRef = useRef()
   
     const titleImage = useRef()
    const [tempImage, setTempImage] = useState(null)
    const handleUploadImage = () =>{
        titleImage.current.click()
      
    } 
    const handleImageSelection = async(event) => {
     setPost({...post, image: event.target.files[0]});
      const imgRef = ref(storage,`coverImages/${v4()}`)
     uploadBytes(imgRef, event.target.files[0]).then(() => {
         getDownloadURL(imgRef).then((url) => {
            console.log(url)
            setPost({...post, imageURL: url})
         })
    })
        
     

}  
 
    const user = useSelector((state) => state.user)
    let modules = {
       
         toolbar: [
            [{ "header": [1, 2,3,4,5, false] }],
            ['image', 'code-block'],
            ['bold', 'italic', 'underline'],
            [ { 'list': 'bullet' }],
            ["link"]
        ]
      }
    const [post, setPost] = useState({
        title: '',
        body: '',
        tags: '',
        image: '',
        coverImageURL: '',
        postURL: '',
        user: user
    })
    const handlePostBody = (value) => {
    setPost({
        ...post, body: value
    })
   
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
        console.log(post)
        axios.post('http://localhost:5000/post/create', post,{headers: {Authorization: localStorage.getItem('token')}})

    }
    const handleRemoveImage = () => {
   setPost({...post, image: '' })
   setTempImage(null)
    }
    
    return (
        <div className="create ">
 {/* <div className=" fixed border w-full top-0 pb-4 lg:ml-14">
      <p className="font-[Pacifico]   text-3xl mt-4 ml-4 font-extrabold lg:mt-5  lg:ml-52 ">Ink Up</p>
  </div> */}
        <div className='text-editor bg-white text-black  flex flex-col border w-[95%] m-auto lg:w-3/5  lg:ml-[20em] lg:mt-[5em] rounded-xl'>
        {
            post.coverImageURL !== '' ? <>  
            <img src={post.coverImageURL} className='w-full h-full lg:h-[30em] object-cover' /> 
           <div className='flex place-content-center'>
            <button onClick={handleUploadImage} type='button' className='font-[Mulish] rounded-md bg-yellow-500 text-white w-[15em] h-[4em]  font-bold border mt-[2em] mb-[2em] ml-3 mr-3 lg:ml-8'>Change</button>
            <button onClick={handleRemoveImage} type='button' className='font-[Mulish] rounded-md bg-red-500 text-white w-[15em] h-[4em]  font-bold border mt-[2em] mb-[2em] ml-3 mr-3 lg:ml-8'>Remove</button>
            </div>
            </>
            : 
            <button onClick={handleUploadImage} type='button' className='font-[Mulish]  w-[15em] h-[4em] ml-8 font-bold border mt-[2em] mb-[2em]'>Add Cover Image</button>
        

        }
       
        <input onChange={handleImageSelection} ref={titleImage} type="file" className='opacity-0' />
          <input onChange={handlePostTitle} name='title' placeholder='Add Post Title '
                    className="rounded-md pl-[.5em] outline-none   font-[Museo]  w-full font-bold placeholder:font-[Museo] placeholder:font-bold text-3xl h-[3em] lg:pl-[2.5em]" />
        <input onChange={handlePostTags} name='tags' placeholder='Add up to 4 tags '
                    className="rounded-md pl-[.5em] outline-none   font-[Museo]  w-full font-bold placeholder:font-[Museo] placeholder:font-extralight text-xl text-gray-400 h-[3em] lg:pl-[3em]" />

            
        <ReactQuill hanlders={modules.handlers} ref={quillRef} modules={modules} onChange={handlePostBody} placeholder='Start Inking' theme='bubble'  style={{color: 'grey', paddingLeft: '.5em', paddingBottom: '30em', background: "white", height: '100%', width: '100%'}} />
      
        </div>
        <div  className=' lg:-ml-24 lg:mb-12'  >
        <button onClick={handlePostSubmission} className="bg-black text-white mt-[2em] w-[12em] ml-[1em]  h-[4em] lg:ml-[30em] rounded-lg lg:w-[15em] " type="submit">
               <p className='font-[Mulish] text-xl font-semibold'>Publish</p>

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

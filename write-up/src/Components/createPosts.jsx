import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux';
import '../../node_modules/react-quill/dist/quill.bubble.css'
import mock from './mock.jpg'
import  axios  from "axios";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
// import { CustomImageHandler } from './CustomImageHandler';
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

const CreatePosts = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
 

    const  CustomImageHandler = () => {
        const input =  document.createElement("input")
          input.setAttribute("type","file");
          input.setAttribute("accept","image/*")
          input.click();
          input.onchange = async() => {
             const file = input.files[0]
             const range = quillRef.current.getEditor().getSelection(true)
             const imgRef = ref(storage, `blogImage/${v4()}`)
             uploadBytes(imgRef,file).then(()=> {
                getDownloadURL(imgRef).then((url) => {
                    console.log(url)
                 quillRef.current.getEditor().insertEmbed(range.index,'image',url)
                })
             })
          }}
     const quillRef = useRef()
      const excerptRef = useRef()

     useEffect(() => {
        const toolbar = quillRef.current.getEditor().getModule('toolbar')
        toolbar.addHandler('image',CustomImageHandler)
    }, [quillRef])

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
            setPost({...post, coverImageURL: url})
         })
    })
        
     

}  
 
    const user = useSelector((state) => state.user)
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
    const [post, setPost] = useState({
        title: '',
        body: '',
        tags: '',
        withExcerpt: '',
        coverImageURL: '',
        postId: v4(),
        draftId: v4(),
        readingTime: ''
       
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
   
}
const handleExcerpt = () => {
    
    
    if (excerptRef.current.checked == true) {
        setPost({
            ...post, withExcerpt: true
        })
          } else {
        setPost({
            ...post,  withExcerpt: false
        })
        }
   
}
const handlePostTags = (event) => {
    setPost({
        ...post, tags: event.target.value
    })
    console.log(post)
    }

    const estimateReadingTime = () => {
        const avgWPM = 250;
        const words = post.split(' ').length
        const minutes = Math.ceil(words/avgWPM)
         setPost({...post, readingTime: `${minutes} mins read`})
      }
    const handlePostSubmission = async() => {
        estimateReadingTime()
        console.log(post)
      let res = await (await axios.post('https://writeup-37ap.vercel.app/post/create', post,{headers: {Authorization: localStorage.getItem('token')}})).data
      console.log(res)
      if(res.message == 'Published'){
        setTimeout(() => {
            setLoading(true)
            navigate('/')
        }, 
        2000);
      }

    }
    const handlePostDraft = async() => {
        console.log(post)
        axios.post('https://writeup-37ap.vercel.app/post/draft', post,{headers: {Authorization: localStorage.getItem('token')}})

    }
    const handleRemoveImage = () => {
   setPost({...post, image: '' })
   setTempImage(null)
    }
    
    return (
        <div className="create ">
            {loading == true ?  
                      <ReactLoading className='fixed bg-white z-10' type="bubbles" color="#512bd4" height={'100%'} width={'100%'} />: ''
}
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

            
        <ReactQuill hanlders={modules.handlers} ref={quillRef} modules={modules} onChange={handlePostBody} placeholder='Start Inking' theme='bubble'  style={{color: 'black', paddingLeft: '.5em', paddingBottom: '30em', background: "white", height: '100%', width: '100%'}} />
      
        </div>
        <div className='ml-4 mt-4 flex gap-4'>
        <input ref={excerptRef} onChange={handleExcerpt} type="checkbox"/>
        <p className="font-[Mulish] font-bold">With Excerpt</p>
        </div>
        <div  className=' lg:-ml-24 lg:mb-12'  >
        <button onClick={handlePostSubmission} className="bg-black text-white mt-[2em] w-[12em] ml-[1em]  h-[4em] lg:ml-[30em] rounded-lg lg:w-[15em] " type="submit">
               <p className='font-[Mulish] text-xl font-semibold'>Publish</p>

          </button>
         <button onClick={handlePostDraft} type='submit' className='font-[Mulish] ml-8 font-bold'>Save as draft</button>
        </div>
        </div>
    );
}
export default CreatePosts;

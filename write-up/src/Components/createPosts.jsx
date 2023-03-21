import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill'
import { useDispatch, useSelector } from 'react-redux';
import '../../node_modules/react-quill/dist/quill.bubble.css'
import mock from './mock.jpg'
import  axios  from "axios";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
// import { CustomImageHandler } from './CustomImageHandler';
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import BounceLoader from "react-spinners/BounceLoader";
import { actions } from '../store';
const CreatePosts = () => {
    let URL
    const {posts} = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
     const [tagsError,setTagsError] = useState('')
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
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
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
        withExcerpt: false,
        coverImageURL: '',
        postId: v4(),
        draftId: v4(),
       
       
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
     const tags = event.target.value
     let tagsAmount = tags.split(' #').length
     console.log(tagsAmount)
     if (tagsAmount <= 4) {
        setTagsError('')
         setPost({
        ...post, tags: event.target.value
    })
     } else {
        setTagsError("You cannot use more than 4 tags")
     }

   
    console.log(post)
    }

    
    const handlePostSubmission = async() => {

        setLoading(true)
        if (tagsError == '' ) {
            console.log(post.readingTime)
            let res = await (await axios.post(`https://inkup-api.onrender.com/post/create`, post,{headers: {Authorization: localStorage.getItem('token')}})).data
            if(res.message == 'Published'){
             let temp = []
             temp = [res.data, ...posts]
             dispatch(actions.updatePosts(temp))

              setTimeout(() => {
                setLoading(false)
                  navigate('/')
              }, 
              2500);
            }
        }

    }
    const handlePostDraft = async() => {
        console.log(post)
        axios.post(`${URL}/post/draft`, post,{headers: {Authorization: localStorage.getItem('token')}})

    }
    const handleRemoveImage = () => {
   setPost({...post, image: '' })
   setTempImage(null)
    }
    
    
    return (
        <>
      
        <div className="create ">
            {loading == true ?  
            <div className='relative ml-[-7.5em] lg:m-0 bg-white flex flex-col'>
                
                      <BounceLoader
                      color="#cbcbcbeb"
                      loading={loading}
                      cssOverride={{ 
                          width: "100%",
                          height: "100%",
                          marginTop: '15em',
                          marginLeft: '40%',
                          zIndex: 10000,
                          paddingLeft: '4em',
                          position: "fixed",
                          display: "block"
                          
                        }}
                        size={300}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        />
                        <p className='fixed w-[85%] ml-[50%] lg:w-full z-[1000] text-2xl mt-[22.5em] lg:ml-[39%] text-black font-bold font-[Outfit]'>Wait! We are publishing your article.....</p>
                        </div>
                    : ''
}
 {/* <div className=" fixed border w-full top-0 pb-4 lg:ml-14">
      <p className="font-[Pacifico]   text-3xl mt-4 ml-4 font-extrabold lg:mt-5  lg:ml-52 ">Ink Up</p>
  </div> */}
        <div className='text-editor bg-white text-black  flex flex-col border w-[95%] m-auto lg:w-3/5  lg:ml-[20em] lg:mt-[5em] rounded-xl'>
        {
            post.coverImageURL !== '' ? <>  
            <img src={post.coverImageURL} className='w-full h-full lg:h-[30em] object-cover' /> 
           <div className='flex place-content-center'>
            <button onClick={handleUploadImage} type='button' className='font-[Outfit] rounded-md bg-yellow-500 text-white w-[15em] h-[4em]  font-bold border mt-[2em] mb-[2em] ml-3 mr-3 lg:ml-8'>Change</button>
            <button onClick={handleRemoveImage} type='button' className='font-[Outfit] rounded-md bg-red-500 text-white w-[15em] h-[4em]  font-bold border mt-[2em] mb-[2em] ml-3 mr-3 lg:ml-8'>Remove</button>
            </div>
            </>
            : 
            <button onClick={handleUploadImage} type='button' className='font-[Outfit]  w-[15em] h-[4em] ml-8 font-bold border mt-[2em] mb-[2em]'>Add Cover Image</button>
        

        }
       
        <input onChange={handleImageSelection} ref={titleImage} type="file" className='opacity-0' />
          <input onChange={handlePostTitle} name='title' placeholder='Add Post Title '
                  className="rounded-md pl-[.5em] outline-none   font-[Outfit]  w-full font-bold placeholder:font-[Outfit] placeholder:font-bold text-3xl h-[3em] lg:pl-[2.5em]" />
        <input onChange={handlePostTags} name='tags' placeholder='Add up to 4 tags '
                    className="rounded-md pl-[.5em] outline-none   font-[Sora]  w-full font-bold placeholder:font-[Sora] placeholder:font-extralight text-xl text-gray-400 h-[3em] lg:pl-[3em]" />

        {tagsError !== '' ? <p className='ml-[3.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsError}</p> : ''}
            
        <ReactQuill  handlers={modules.handlers} ref={quillRef} modules={modules} onChange={handlePostBody} placeholder='Start Inking' theme='bubble'  style={{color: 'black', fontFamily: 'Outfit', paddingLeft: '3em', paddingBottom: '30em', background: "white", height: '100%', width: '100%'}} />
      
        </div>
        <div className='lg:ml-[20em] ml-[2em] mt-4 flex gap-4'>
        <input ref={excerptRef} onChange={handleExcerpt} type="checkbox"/>
        <p className="font-[Outfit] font-bold">With Excerpt</p>
        </div>
        <div  className=' lg:ml-[-10em] lg:mb-12'  >
        <button onClick={handlePostSubmission} className="bg-black text-white mt-[2em] w-[12em] ml-[1em]  h-[4em] lg:ml-[30em] rounded-lg lg:w-[15em] " type="submit">
               <p className='font-[Outfit] text-xl font-semibold'>Publish</p>

          </button>
         <button onClick={handlePostDraft} type='submit' className='font-[Outfit] ml-8 font-bold'>Save as draft</button>
        </div>
        </div>
        </>
    );
}
export default CreatePosts;

import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill'
import { useDispatch, useSelector } from 'react-redux';
import '../../node_modules/react-quill/dist/quill.bubble.css'
import mock from './mock.jpg'
import  axios  from "axios";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
// import { CustomImageHandler } from './CustomImageHandler';
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import BounceLoader from "react-spinners/BounceLoader";
import { actions } from '../store';
const CreatePosts = () => {
    let URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector(state=> state.posts)
    const [loading,setLoading] = useState(false)
    const tagsRef = useRef()
    const [junkError,setJunkError] = useState(false)
    const [readingTime, setReadingTime] = useState('')
     const [tagsError,setTagsError] = useState(
        
            {
        alphabetErrors: [],
        numberErrors:  [],
        specialCharactersErrors: [],
        numberInTagsErrors: [],
        specialCharacterInTagsErrors: [],
        muchTagsError: ''
          
            })
     const [prevTag,setPrevTag] = useState(null)
     const [readingMinutesError,setReadingMinutesError] = useState(null)
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
      const avgWPM = 250;
    let words = value.split(' ').length       
    let minutes = Math.ceil(words/avgWPM)
    setReadingTime(minutes)
  
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
    
// const updateError = (index,type,message) => {
//   tagsError.map((tagError,tagErrorIndex) => {
//     if (tagErrorIndex == index) {
//         if (type == 'SPECIAL_CHARACTER_IN_TAGS') {
//             return {}
            
//         }
//     }
//   })
// }
    
     let tempTags = []
     const tags = event.target.value
     //start with tags
     let tagsRecurring = /^#{2,}/
     let hashtagsDisplaced  = /[#a-zA-Z#]/g
     let actualTag = /[#a-zA-Z]/g
     let specialCharacterRegex = /[^a-zA-Z]/g;
     


     let specialCharacterWithoutTags = /[@#$%&*(){}-~!]/g
     let alphabetRegex = /[a-zA-Z]/g
     let numberTagRegex = /[0-9]/g
     let realTags = tags.split(' ')
     
    console.log(realTags)
      console.log(tagsError)
      
      if(realTags[0] !== ''){
      realTags.map((tag,index) => {
          tag.trim()
        


            setPrevTag(tag)
            if (realTags.length > 4) {
                setTagsError({...tagsError,muchTagsError:  "You cannot use more than 4 tags"})
            }
            
           //ignore every white-space from the user's input and retain every words that start with #
            if(tag.startsWith('#')){
              console.log(index)
              console.log(tag.split('#'))
                if (tag.split('#')[1] == '' && index > -1) {
                    setTagsError(      {
                        alphabetErrors: [],
                        numberErrors:  [],
                        specialCharactersErrors: [],
                        numberInTagsErrors: [],
                        specialCharacterInTagsErrors: [],
                        muchTagsError: ''
                          
                            })
                }
                 //If cursor is not moved and the tag is incorrect
                 if(specialCharacterRegex.test(tag.split('#')[1]) === true && prevTag !== tag ){
                    //if the user keep typing in the incorrect tag despite receiving error
                     if ((tag.startsWith(prevTag) || prevTag.startsWith(tag) || tag.split('#')[0] == '' ) && tagsError.specialCharacterInTagsErrors.includes(`${tag} is invalid. A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`) == false) {
                        setTagsError({ ...tagsError,specialCharacterInTagsErrors: [`${tag} is invalid. A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
                     } else {
                        setTagsError({ ...tagsError,specialCharacterInTagsErrors: [...tagsError.specialCharacterInTagsErrors,`${tag} is invalid. A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
                     }
                }

             if(numberTagRegex.test(tag.split('#')[1]) === true && tag !== prevTag){
               
                  
                        if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.numberInTagsErrors.includes(
                            `${tag} is an invalid tag. Tag cannot contain number`
                        ) == false) {
                            setTagsError({...tagsError,numberInTagsErrors: [`${tag} is an invalid tag. Tag cannot contain number`]})
                        } else {
                        setTagsError({...tagsError,numberInTagsErrors: [...tagsError.numberInTagsErrors,`${tag} is an invalid tag. Tag cannot contain number`]})
                        }
               
              
             }
        
                
            if(specialCharacterRegex.test(tag.split('#')[1]) === false  && numberTagRegex.test(tag.split('#')[1]) === false && alphabetRegex.test(tag.split('#')[1]) === true ){
                setTagsError(      {
                    alphabetErrors: [],
                    numberErrors:  [],
                    specialCharactersErrors: [],
                    numberInTagsErrors: [],
                    specialCharacterInTagsErrors: [],
                    muchTagsError: ''
                      
                        })
                 tempTags.push(tag)
                
                let tagsAmount = tempTags.length
                    console.log(tagsAmount)
                    if (tagsAmount <= 4) {
                    
                        setPost({
                    ...post, tags: event.target.value
                })
                    } else {
                    setTagsError({muchTagsError: "You cannot use more than 4 tags"})
                    }
                
            }
            
                
                
            
        } else if(numberTagRegex.test(tag) && tag !== prevTag){
             if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.numberErrors.includes( `${tag} is an invalid tag. A valid tag cannot start with a number `) == false) {
                setTagsError({...tagsError,numberErrors: [ `${tag} is an invalid tag. A valid tag cannot start with a number `]})
             } else {

                 setTagsError({...tagsError,numberErrors: [...tagsError.numberErrors, `${tag} is an invalid tag. A valid tag cannot start with a number `]})
                
             }
           
        }   else if(alphabetRegex.test(tag) && tag !== prevTag ){
            if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.alphabetErrors.includes(`${tag} is an invalid tag. Tag cannot start with an alphabet`) == false) {
                setTagsError({...tagsError,alphabetErrors: [ `${tag} is an invalid tag. Tag cannot start with an alphabet`]})
            } else {
                setTagsError({...tagsError,alphabetErrors: [...tagsError.alphabetErrors, `${tag} is an invalid tag. Tag cannot start with an alphabet`]})
            }

        }    else if(specialCharacterWithoutTags.test(tag) && tag !== prevTag){
            if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.specialCharactersErrors.includes(`${tag} is an invalid tag.  A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`) == false) {
                setTagsError({...tagsError,specialCharactersErrors: [`${tag} is an invalid tag.  A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
            } else {

                setTagsError({...tagsError,specialCharactersErrors: [...tagsError.specialCharactersErrors, `${tag} is an invalid tag.  A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
          
            }
        
        }     
         
    })
} else {
  setTagsError(   
    {
alphabetErrors: [],
numberErrors:  [],
specialCharactersErrors: [],
numberInTagsErrors: [],
specialCharacterInTagsErrors: [],
muchTagsError: ''
  
    })
}
        
      
     }

     const tagsGenerator = async() => {
        const {title} = post
         const body = quillRef.current.unprivilegedEditor.getText();
         let tags = await (await axios.post('http://localhost:8000/ai/generateTags', {title:title, content:body})).data
         tags = tags.map((tag) => {return "#" + tag.word})
         tagsRef.current.value = tags.join(' ')
     }
 
    const handlePostSubmission = async() => {
        const avgWPM = 250;
        let words = post.body.split(' ').length
       
        let minutes = Math.round(words/avgWPM)
         if(minutes < 1){
            setReadingMinutesError('You cannot publish an article with less than One (1) minute reading time')
            console.log(readingMinutesError)
            console.log(tagsError)
         }
         const {title} = post
            const body = quillRef.current.unprivilegedEditor.getText();
           
         let junkRes = await(await axios.post('http://localhost:8000/ai/junkChecker', {content:body, title:title })).data
         console.log(junkRes)
         if (junkRes == true) {
             setJunkError('Junk words are detected in your content. Please revise your article')
         }
        if (tagsError == null && readingMinutesError == null && junkError == false) {
            setLoading(true)
            
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
           
        } else {
            setLoading(false)
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
        <Link to='/addPodcast' className='font-[Outfit] text-xl relative top-[-2em] text-blue-500 text-bold'>or add Podcast?</Link>
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
        <input ref={tagsRef} onChange={handlePostTags} name='tags' placeholder='Add up to 4 tags '
                    className="rounded-md pl-[.5em] outline-none   font-[Sora]  w-full font-bold placeholder:font-[Sora] placeholder:font-extralight text-xl text-gray-400 h-[3em] lg:pl-[3em]" />

        { tagsError.alphabetErrors && tagsError.alphabetErrors.length > 0 ?   tagsError.alphabetErrors.map((tagsErr) => {
            return <> <p  className='ml-[3.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) :''
    }
        { tagsError.muchTagsError && tagsError.muchTagsError !== '' ?   
             <> <p  className='ml-[3.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsError.muchTagsError}</p> <br /> </>
            
        : ''
    }
        { tagsError.numberErrors && tagsError.numberErrors.length > 0 ?  tagsError.numberErrors.map((tagsErr) => {
            return <> <p  className='ml-[3.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        { tagsError.numberInTagsErrors && tagsError.numberInTagsErrors.length > 0 ?  tagsError.numberInTagsErrors.map((tagsErr) => {
            return <> <p  className='ml-[3.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        { tagsError.specialCharacterInTagsErrors && tagsError.specialCharacterInTagsErrors.length > 0 ?  tagsError.specialCharacterInTagsErrors.map((tagsErr) => {
            return <> <p  className='ml-[3.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        {tagsError.specialCharacterInTagsErrors &&  tagsError.specialCharactersErrors.length > 0 ?  tagsError.specialCharactersErrors.map((tagsErr) => {
            return <> <p  className='ml-[3.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        <ReactQuill  handlers={modules.handlers} ref={quillRef} modules={modules} onChange={handlePostBody} placeholder='Start Inking' theme='bubble'  style={{color: 'black', fontFamily: 'Outfit', paddingLeft: '1em', paddingBottom: '30em', background: "white", height: '100%', width: '100%'}} />
       
        {/* <ReactQuill  handlers={modules.handlers} ref={quillRef} modules={modules} onChange={handlePostBody} placeholder='Add Collaborators @person' theme='bubble'  style={{color: 'black', fontFamily: 'Outfit', paddingLeft: '1em', paddingBottom: '30em', background: "white", height: '10%', width: '100%'}} /> */}
        </div>
        <div className=' relative left-[70%] mb-[1em] mr-[1em] mt-4 flex gap-4'>
        <p className="font-[Outfit] font-bold">{readingTime} mins read</p>
        </div>
       
       { readingMinutesError !== null? <p className='lg:ml-[20em] my-[2em] font-bold font-[Outfit] text-red-500'>{readingMinutesError}</p> :''}
        <div className='lg:ml-[20em] relative left-[5%] top-[-2em] mt-[0em] flex gap-4'>
        <input ref={excerptRef} onChange={handleExcerpt} type="checkbox"/>
        <p className="font-[Outfit] font-bold">With Excerpt</p>
        </div>
       { junkError !== null? <p className='lg:ml-[20em] my-[2em] ml-[1em] font-bold font-[Outfit] text-red-500'>{junkError}</p> :''}
        <div className='lg:ml-[20em] mt-4 flex gap-3'>
        <button onClick={tagsGenerator} className="bg-blue-500 text-white mt-[2em] w-[95%] ml-[.5em]  h-[4em]  rounded-lg lg:w-[15em] " type="submit">
        

        <p className="font-[Outfit] font-bold">Generate Tags</p>
        </button>
        
         <button onClick={handlePostSubmission} className="bg-green-500 text-white mt-[2em] w-[95%] ml-[.5em]  h-[4em]  rounded-lg lg:w-[15em] " type="submit">
               <p className='font-[Outfit] text-xl font-semibold'>Publish</p>

          </button>
         <button onClick={handlePostDraft} type='submit' className='bg-red-500 text-white mt-[2em] w-[95%] ml-[.5em]  h-[4em]  rounded-lg lg:w-[15em] font-[Outfit] font-bold'>Save as draft</button>
        </div>
        </div>
        </>
    );
}
export default CreatePosts;

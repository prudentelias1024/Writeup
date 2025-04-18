import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdOutlinePoll } from 'react-icons/md';
import { CiImageOn } from 'react-icons/ci';
import {MdCancel} from 'react-icons/md'
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import PollInput from './pollInput';
import { actions } from '../store';
import { FaPlus } from 'react-icons/fa'
import axios from 'axios';
import {v4} from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import mock from '../mock.jpg'
import _ from 'lodash'
import { ThreeDots } from 'react-loader-spinner';
import {SocketContext} from '../socketProvider' 
const ShortFormCreator = () => {
    const socket = useContext(SocketContext)

    // const  [URL,setURL] = useState("http://localhost:5000")
    const [disableAddMore, setDisableAddMore] = useState(false)
    const [formReset, setFormReset] = useState(false)
    const [postable, setPostable] = useState(false)
    const {user, reelsPlaceholder, showPollCreator, cancelImageStatus} = useSelector(state => state)
    const {reels, URL, aiURL} = useSelector(state => state)
    const tagsRef = useRef()
    const quillRef = useRef()
    const formRef = useRef(null)
    const {loadingShortFormCreator} = useSelector(state => state)
    const dispatch = useDispatch()
    const [tags, setTags] = useState('')
    const [prevTag,setPrevTag] = useState(null)
    const [errorInTag, setErrorInTag] = useState(false)
    const [compToDuplicate, setCompToDuplicate] = useState([])
    const [optionOne,setOptionOne] = useState('')
    const [optionTwo,setOptionTwo] = useState('')
    const [optionThree,setOptionThree] = useState('')
    const [optionFour,setOptionFour] = useState('')
    const reelImageRef = useRef()
    const [imageReelURL, setImageReelURL] = useState(null)
    const [safetyError, setSafetyError] = useState(null)
    const [tagsError,setTagsError] = useState(
        
        {
    alphabetErrors: [],
    numberErrors:  [],
    specialCharactersErrors: [],
    numberInTagsErrors: [],
    specialCharacterInTagsErrors: [],
    muchTagsError: ''
    
      
        })

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

    const checkEmptiness = () =>{
        let value = quillRef.current.value
        if (value == ' ') {
            let tokens =  value.split(' ')
            tokens.forEach((token) => {
              if(token !== ' '){
                  setPostable(true)
                  return true
              } else {
                setPostable(false)
                return false
              }
          })
       
        }else {
            setPostable(true)
            return true
        }   
    } 

    useEffect(() => {
        socket.on('new_notis_post',(reel) => {
            if(reel){
                let prevReels = _.cloneDeep(reels)
                prevReels.push(reel[0])
               let  newReels = prevReels.reverse()
               console.log(newReels)
                dispatch(actions.updateReels(newReels))
                // dispatch(actions.updatePosting(false))
    
            }
        })
    }, [])
    
        
    const handleShortContent = async(event) => {
      event.preventDefault()

      //checks if the post is safe enough
      
    //   const safe = await (await axios.post(`${aiURL}/api/postSafety`, {text:quillRef.current.value})).data.safe
       
      // if(safe){
        // dispatch(actions.updatePosting(true))
    
        
        //   let reel = await (await axios.post(`${URL}/reels/create`,
        //  {
        //  postId: v4(),
        //  tags: tags,
        //  type: showPollCreator == true? 'poll' : 'image',
        //  text: quillRef.current.value,
        //  options: optionFour == ''? [optionOne,optionTwo,optionThree]: [optionOne,optionTwo,optionThree, optionFour] ,
        //  reelImageURL: imageReelURL !== null ?imageReelURL : ''

        // }, {
        //     headers:{Authorization: localStorage.getItem('token')
        // }})).data


       const reel =  socket.emit('post_reels', {
             postId: v4(),
             tags: tags,
             type: showPollCreator == true? 'poll' : 'image',
             text: quillRef.current.value,
             options: optionFour == ''? [optionOne,optionTwo,optionThree]: [optionOne,optionTwo,optionThree, optionFour] ,
             reelImageURL: imageReelURL !== null ?imageReelURL : ''
    
            })
            
        setFormReset(true)
        console.log(reel)
   
        quillRef.current.getEditor().setText('')
        formRef.current.reset()
        dispatch(actions.setShowPollCreator(false))
           
    // } else{
    //     setSafetyError("Can't post ink! It contains unallowed words ")
    // }
}


    const addMorePollOption = () => {
        console.log(compToDuplicate)
        const componentToDuplicate = <PollInput index={4}  optionHandler={handleOptionFour}/>
        if (compToDuplicate !== null) {
            
            setCompToDuplicate([...compToDuplicate, componentToDuplicate])
        } else {
            setCompToDuplicate(componentToDuplicate)
        }
        setDisableAddMore(true)
    }
    const handleOptionOne = (event) => {
       setOptionOne(event.target.value)
    }
    const handleOptionTwo = (event) => {
       setOptionTwo(event.target.value)
    }
    const handleOptionThree = (event) => {
       setOptionThree(event.target.value)
    }
    const handleOptionFour = (event) => {
       setOptionFour(event.target.value)
    }
    const handleImageReel = () => {
        reelImageRef.current.click()
    }
    const handleReelImageUpload = (event) => {
        const imgRef = ref(storage,`reelImages/${v4()}`)
        uploadBytes(imgRef, event.target.files[0]).then(() => {
            getDownloadURL(imgRef).then((url) => {
                setImageReelURL(url)
            })
       })
      dispatch(actions.setShowPollCreator(false))
    }
    const cancelPoll = () => {
    dispatch(actions.setShowPollCreator(false))
    setOptionOne('')
    setOptionTwo('')
    setOptionThree('')
    setOptionFour('')
    setCompToDuplicate([])
    
    setDisableAddMore(false)
    }
    const handlePollCreator = () => {
     dispatch(actions.setShowPollCreator(true))
    }
    const cancelImage = () => {
        dispatch(actions.setCancelImage(true))
        //delete from firebase bucket
   
    }
    const checkPost = () => {
        checkEmptiness()
    }
    if( user !== null ){
        if (loadingShortFormCreator == false) {
            
        
    return (
            <div className=' border-[1px] bg-white  dark:bg-[#000] dark:text-white font-[Sen] lg:mt-[0em]  pb-[1em] px-[.5em] gap-[1em] h-fit'>
                {
                    safetyError !== null?
                    <p className="text-red-500 text-center mt-[1em] font-[Sen]">{safetyError}</p>:
                    ''
                }
                  <form ref={formRef}>
                    
            <img src={user.public_picture} alt={user.name} className="h-[2.5em] w-[2.5em] mt-[1em] rounded-full" />  
            <div className="creator flex flex-col font-[Outfit]">

            <ReactQuill onChange={checkPost}  className='bg-white text-black  dark:bg-[#000] dark:text-white w-[30em] font-[Sen] placeholder:font-[Sen] placeholder:text-[#717171] '  ref={quillRef} modules={modules}  placeholder={reelsPlaceholder} theme='bubble'  style={{ fontFamily: 'Sen',  paddingLeft: '2.5em',   height: '100%', width: '100%'}} />
         
                 <input type="file" onChange={handleReelImageUpload} ref={reelImageRef} className='opacity-0' />
               {cancelImageStatus == false? '':   <div>
                 <MdCancel className=' relative right-[2em] top-[1em] text-3xl ml-[-2em] mt-[.5em]' onClick={cancelImage}/>
   
             
                 </div> }
{
 showPollCreator == true ?  <div className="w-full">
    <MdCancel  className=' relative text-3xl left-[90%]' onClick={cancelPoll}/>
    <div className='flex flex-col w-full '>
  
     <PollInput index={1} optionHandler={handleOptionOne}/> 
     <PollInput index={2} optionHandler={handleOptionTwo}/> 
     <PollInput index={3} optionHandler={handleOptionThree}/> 
     {
        compToDuplicate.length !== 0 ? 
              compToDuplicate.map((comp) =>{
                return comp
              }) : ''

     }
  {disableAddMore ?
   <button disabled className=' cursor-not-allowed w-full h-[2em] mt-[1em] flex justify-center font-[Sen] rounded-md mb-[2em] bg-blue-200 text-white  gap-[1em] ml-0' onClick={addMorePollOption}>
     <FaPlus className='mt-[.35em]'/>
    <p className='mt-0.5'> Add More Choices</p></button>
  
  : <button className='w-full h-[2em] mt-[1em] flex justify-center font-[Sen] rounded-md mb-[2em] bg-blue-500 text-white  gap-[1em]' onClick={addMorePollOption}>
     <FaPlus className='mt-[.35em]'/>
    <p className='mt-0.5'> Add More Choices</p></button>
}
    </div>

 </div>
  : ''
}   
           <div className='flex flex-row justify-between '>
            {showPollCreator == false ? <div className="quick_tools flex flex-row gap-[1em] ml-[1em] lg:ml-[2em] ">
                <MdOutlinePoll className='text-2xl mt-[1em]  text-[rgba(0,0,0,0.5)]' onClick={handlePollCreator}/>
                <CiImageOn className='text-2xl mt-[1em] text-[rgba(0,0,0,0.5)]' onClick={handleImageReel} />
            </div> : ''}
            <div >
                {
                    postable == false ?
                <button disabled onClick={(event) => {handleShortContent(event)}} className={showPollCreator  ? "font-bold bg-blue-200 px-[1em]  lg:px-[2em] rounded-full text-white py-[.5em] lg:py-[.75em] mt-2  lg:ml-[5em] relative left-[11em]" :

                " font-bold bg-blue-200 px-[1em]  lg:px-[2em] rounded-full text-white py-[.5em] lg:py-[.75em] mt-2  lg:ml-[5em]"} >Post
                </button>:
                
                <button onClick={(event) => {handleShortContent(event)}} className={showPollCreator  ? "font-bold bg-blue-500 px-[1em]  lg:px-[2em] rounded-full text-white py-[.5em] lg:py-[.75em] mt-2  lg:ml-[5em] relative left-[11em]" :

                " font-bold bg-blue-500 px-[1em]  lg:px-[2em] rounded-full text-white py-[.5em] lg:py-[.75em] mt-2  lg:ml-[5em]"}>Post
                </button>

                }
                </div>
            </div>
            </div>
              
            </form>
            </div>
      
            );
        } else{
                        <>
            <div className='flex flex-col'>
              <ThreeDots 
  height="80" 
  width="80" 
  radius="9"
  color="#4fa94d" 
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
 />            </div>
            </>

        }
            
        } else {
            return ''
        }
        }
export default ShortFormCreator;

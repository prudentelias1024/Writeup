import React, { useEffect, useRef, useState } from 'react';
import { FaImage, FaPoll } from 'react-icons/fa';
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

const ShortFormCreator = () => {
    const  [URL,setURL] = useState(null)
    const [disableAddMore, setDisableAddMore] = useState(false)
    const {user, reelsPlaceholder, showPollCreator, cancelImageStatus} = useSelector(state => state)
    const tagsRef = useRef()
    const quillRef = useRef()
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
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            setURL("https://inkup-api.onrender.com")
          }else{
            setURL("http://localhost:5000")
                   
          }
    })
    const handlePostTags = (event) => {
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
                        setErrorInTag(true)
                             
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
                                setErrorInTag(true)
                                setTagsError({ ...tagsError,specialCharacterInTagsErrors: [`${tag} is invalid. A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
                             } else {
                                setErrorInTag(true)
                             
                                setTagsError({ ...tagsError,specialCharacterInTagsErrors: [...tagsError.specialCharacterInTagsErrors,`${tag} is invalid. A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
                             }
                        }
        
                     if(numberTagRegex.test(tag.split('#')[1]) === true && tag !== prevTag){
                       
                          
                                if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.numberInTagsErrors.includes(
                                    `${tag} is an invalid tag. Tag cannot contain number`
                                ) == false) {
                                    setTagsError({...tagsError,numberInTagsErrors: [`${tag} is an invalid tag. Tag cannot contain number`]})
                                    setErrorInTag(true)
                             
                                } else {
                                setTagsError({...tagsError,numberInTagsErrors: [...tagsError.numberInTagsErrors,`${tag} is an invalid tag. Tag cannot contain number`]})
                                setErrorInTag(true)
                             
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
                             setErrorInTag(false)
                             setTags(event.target.value)
                             
                            } else {
                            setTagsError({muchTagsError: "You cannot use more than 4 tags"})
                            setErrorInTag(true)
                             
                            }
                        
                    }
                    
                        
                        
                    
                } else if(numberTagRegex.test(tag) && tag !== prevTag){
                     if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.numberErrors.includes( `${tag} is an invalid tag. A valid tag cannot start with a number `) == false) {
                        setTagsError({...tagsError,numberErrors: [ `${tag} is an invalid tag. A valid tag cannot start with a number `]})
                        setErrorInTag(true)
                             
                     } else {
                        setErrorInTag(true)
                             
                         setTagsError({...tagsError,numberErrors: [...tagsError.numberErrors, `${tag} is an invalid tag. A valid tag cannot start with a number `]})
                        
                     }
                   
                }   else if(alphabetRegex.test(tag) && tag !== prevTag ){
                    if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.alphabetErrors.includes(`${tag} is an invalid tag. Tag cannot start with an alphabet`) == false) {
                        setTagsError({...tagsError,alphabetErrors: [ `${tag} is an invalid tag. Tag cannot start with an alphabet`]})
                        setErrorInTag(true)
                             
                    } else {
                        setTagsError({...tagsError,alphabetErrors: [...tagsError.alphabetErrors, `${tag} is an invalid tag. Tag cannot start with an alphabet`]})
                        setErrorInTag(true)
                             
                    }
        
                }    else if(specialCharacterWithoutTags.test(tag) && tag !== prevTag){
                    if ((tag.startsWith(prevTag) || prevTag.startsWith(tag)) && tagsError.specialCharactersErrors.includes(`${tag} is an invalid tag.  A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`) == false) {
                        setTagsError({...tagsError,specialCharactersErrors: [`${tag} is an invalid tag.  A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
                        setErrorInTag(true)
                             
                    } else {
                        setErrorInTag(true)
                             
                        setTagsError({...tagsError,specialCharactersErrors: [...tagsError.specialCharactersErrors, `${tag} is an invalid tag.  A valid tag cannot contain special characters like ?,$.%^*()!~|?<>'"`]})
                  
                    }
                
                }     
                 
            })
        } else {
            setErrorInTag(false)
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
        
    const handleShortContent = async() => {
       let reel = await (await axios.post(`${URL}/reels/create`,
         {
         reelId: v4(),
         tags: tags,
         type: showPollCreator == true? 'poll' : 'image',
         text: quillRef.current.value,
         options: [optionOne,optionTwo,optionThree, optionFour],
         reelImageURL: imageReelURL !== null ?imageReelURL : ''

        }, {
            headers:{Authorization: localStorage.getItem('token')
        }})).data
        let prevReels = reel
        dispatch(actions.updateReels([reel.reel, ...prevReels]))
        
    }
    const addMorePollOption = () => {
        console.log(compToDuplicate)
        const componentToDuplicate = <PollInput optionHandler={handleOptionFour}/>
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
    useEffect(() => {
           console.log(showPollCreator)
    }, []);
    if( user !== null){
    return (
            <div className='rounded-md border bg-white font-[Outfit]lg:mt-0 mt-[2em] py-[1em] px-[.5em] flex flex-row gap-[1em] h-fit'>
            {/* <img src={user.public_picture} alt={user.name} className="h-[3em] w-[3em] rounded-full" />   */}
            <div className="creator flex flex-col">
            <ReactQuill className='w-[30em] font-[Outfit]'  ref={quillRef} modules={modules}  placeholder={reelsPlaceholder} theme='bubble'  style={{color: 'black', fontFamily: 'Outfit', paddingLeft: '1em',  background: "white", height: '100%', width: '100%'}} />
            <input ref={tagsRef} onChange={handlePostTags} name='tags' placeholder='Add up to 4 tags '
                 className="rounded-md pl-[0em] outline-none ml-[.25em]   font-[Outfit]  w-full font-bold placeholder:font-[Outfit] placeholder:font-extralight text-lg text-gray-400 h-[3em] lg:pl-[0em]" />
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

                 <input type="file" onChange={handleReelImageUpload} ref={reelImageRef} className='opacity-0' />
               {cancelImageStatus ? '':   <div>
                 <MdCancel className=' relative left-[2em] top-[1em] text-3xl ml-[-2em] mt-[.5em]' onClick={cancelImage}/>
   
             
                 </div> }
{
 showPollCreator == true ?  <div className="flex flex-row gap-[2em]">
    <MdCancel className='text-3xl ml-[-2em] mt-[.5em]' onClick={cancelPoll}/>
    <div className='flex flex-col '>
   
     <PollInput optionHandler={handleOptionOne}/> 
     <PollInput optionHandler={handleOptionTwo}/> 
     <PollInput optionHandler={handleOptionThree}/> 
     {
        compToDuplicate.length !== 0 ? 
              compToDuplicate.map((comp) =>{
                return comp
              }) : ''

     }
  {disableAddMore ?
   <button disabled className=' cursor-not-allowed w-full h-[2em] mt-[1em] flex justify-center font-[Outfit] rounded-md mb-[2em] bg-green-200 text-white  gap-[1em] ml-[1em]' onClick={addMorePollOption}>
     <FaPlus className='mt-[.35em]'/>
    <p className='mt-0.5'> Add More Choices</p></button>
  
  : <button className='w-full h-[2em] mt-[1em] flex justify-center font-[Outfit] rounded-md mb-[2em] bg-green-500 text-white  gap-[1em]  ml-[1em]' onClick={addMorePollOption}>
     <FaPlus className='mt-[.35em]'/>
    <p className='mt-0.5'> Add More Choices</p></button>
}
    </div>

 </div>
  : ''
}   
           <div className='flex flex-row justify-between '>
            {showPollCreator == false ? <div className="quick_tools flex flex-row gap-[1em] ml-[-2em] lg:ml-[2em] ">
                <FaPoll className='text-2xl mt-[1em] text-[rgba(0,0,0,0.5)]' onClick={handlePollCreator}/>
                <FaImage className='text-2xl mt-[1em] text-[rgba(0,0,0,0.5)]' onClick={handleImageReel} />
            </div> : ''}
            <div >
                
                <button onClick={handleShortContent} className={showPollCreator  ? "font-bold bg-green-500 px-[1em] ml-[7em] lg:px-[2em] rounded-full text-white py-[.5em] lg:py-[.75em] mt-2  lg:ml-[7em] relative left-[11em]" :"font-bold bg-green-500 px-[1em] ml-[7em] lg:px-[2em] rounded-full text-white py-[.5em] lg:py-[.75em] mt-2  lg:ml-[5em]"}>Publish
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

import { useEffect, useState, useRef } from "react";
import { MdOutlineAudiotrack } from "react-icons/md";
import {v4} from  'uuid'
import { getDownloadURL, getMetadata, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import _ from 'lodash'
import { useNavigate } from "react-router-dom";
const CreatePodcast = () => {
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            setURL("https://inkup-api.onrender.com")
          }else{
            setURL("http://localhost:5000")
                   
          }
    },[])
    const [filename, setFilename] = useState(null)
    const [downloadURL, setDownloadURL] = useState(null)
    const podcasts = useSelector(state => state.podcasts)
    const audioRef = useRef()
    const dispatch = useDispatch()
    const [URL, setURL] = useState(null)
    const uploadRef = useRef()
    const titleRef = useRef()
    const tagsRef = useRef()
    const [tags,setTags] = useState(null)
    const [errorInTag, setErrorInTag] = useState(false)
    const [duration, setDuration] = useState(null)
    const [prevTag,setPrevTag] = useState(null)
    const navigate = useNavigate()
    const [tagsError,setTagsError] = useState(
        
        {
    alphabetErrors: [],
    numberErrors:  [],
    specialCharactersErrors: [],
    numberInTagsErrors: [],
    specialCharacterInTagsErrors: [],
    muchTagsError: ''
      
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
    const handleAudioUpload = () => {
    uploadRef.current.click()
    }
    const handleAudioSelection = (event) => {
    if(event.target.files[0].type == 'audio/mpeg'){
        setFilename(event.target.files[0].name)
        const imgRef = ref(storage,`podcasts/${v4()}`)
        uploadBytes(imgRef, event.target.files[0]).then(() => {
            getDownloadURL(imgRef).then((url) => {
               console.log(url)
               setDownloadURL(url)
            })
            
       })

    }
    
    }
   const uploadAudio = async(event) => {
 
    const newPodcast = await(await axios.post(`${URL}/podcast/create`, {
            podcastId: v4(),
            podcastURL: downloadURL,
            title: titleRef.current.value,
            tags: tags
     }, {headers: {Authorization: localStorage.getItem('token')}})).data.podcast[0]
     let previousPodcasts = _.cloneDeep(podcasts)
     previousPodcasts.push(newPodcast)
     let allPodcasts = previousPodcasts.reverse()
     dispatch(actions.updatePodcasts(allPodcasts))
     navigate('/')
   }
    return (
        <>
        <div className="podcast">
            
        <form>
        <input type="file" onChange={handleAudioSelection} name="podcast_audio" className="opacity-0" ref={uploadRef}  />    
        <audio ref={audioRef} className="opacity-0"  />
        <div onClick={handleAudioUpload} className="border border-blue-500 text-blue-500 w-[95%] ml-[1em]  lg:w-[80%]  lg:m-auto text-center py-[10em] rounded-lg">
            <MdOutlineAudiotrack className="text-4xl mx-auto"/>
            <p className="font-[Outfit] text-xl md:m-0 lg:m-0 font-bold">
                {filename == null?'No File Chosen': filename}
            </p>
        </div>
        <div className="additional_info">
        <input ref={titleRef} type="text" placeholder='Add Podcast title '
               className="rounded-md pl-[.5em] outline-none   font-[Outfit]  w-[85%] font-bold placeholder:font-[Outfit] placeholder:font-bold text-xl h-[3em] lg:pl-[5em] bg-inherit ml-[2em]"  />
        <input type="text" placeholder='Add Podcast tags '
              onChange={handlePostTags} className="rounded-md pl-[.5em] outline-none   font-[Outfit]  w-[85%] font-bold placeholder:font-[Outfit] placeholder:font-bold text-xl h-[3em] lg:pl-[5em] bg-inherit ml-[2em]"  />
        { tagsError.alphabetErrors && tagsError.alphabetErrors.length > 0 ?   tagsError.alphabetErrors.map((tagsErr) => {
            return <> <p  className='ml-[8.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) :''
    }
        { tagsError.muchTagsError && tagsError.muchTagsError !== '' ?   
             <> <p  className='ml-[8.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsError.muchTagsError}</p> <br /> </>
            
        : ''
    }
        { tagsError.numberErrors && tagsError.numberErrors.length > 0 ?  tagsError.numberErrors.map((tagsErr) => {
            return <> <p  className='ml-[8.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        { tagsError.numberInTagsErrors && tagsError.numberInTagsErrors.length > 0 ?  tagsError.numberInTagsErrors.map((tagsErr) => {
            return <> <p  className='ml-[8.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        { tagsError.specialCharacterInTagsErrors && tagsError.specialCharacterInTagsErrors.length > 0 ?  tagsError.specialCharacterInTagsErrors.map((tagsErr) => {
            return <> <p  className='ml-[8.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        {tagsError.specialCharacterInTagsErrors &&  tagsError.specialCharactersErrors.length > 0 ?  tagsError.specialCharactersErrors.map((tagsErr) => {
            return <> <p  className='ml-[8.5em] font-[Maven] text-md font-bold text-red-500 mb-[1em]'>{tagsErr}</p> <br /> </>
            
        }) : ''
    }
        </div>
        <div className="flex-row gap-[1em] flex pt-[1em] w-[95%] lg:w-[80%] m-auto">
        <button type="button" className="bg-yellow-500 text-white w-full font-bold font-[Outfit] p-[1em] rounded-lg" onClick={uploadAudio}>Publish </button>
        <button type="button" className="bg-green-500 text-white w-full font-bold font-[Outfit] p-[1em] rounded-lg" onClick={handleAudioUpload}> Upload  </button>
        </div>
        </form>    
        </div>
        
        
        </>
    )
}

export default CreatePodcast
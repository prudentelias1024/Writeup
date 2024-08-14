import React, { useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom';
import { HiBadgeCheck, HiBell, HiHashtag, HiMail, HiOutlineBell, HiOutlineMail } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'copy-to-clipboard'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { actions } from '../../store';
import { AiOutlineLink } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
export default function ProfileVitals({user, setUser, total}) {
    const currentUser = useSelector(state => state.user)  
    const [addedToNotis, setAddedToNotis] = useState(false)
    const dispatch = useDispatch()
    const {URL} = useSelector(state => state)  
    const follow = async() => {
       let res =  await axios.post(`${URL}/api/follow`, {username:user.username, id:user._id},{headers: {Authorization: localStorage.getItem('token') }})

        setUser(res.data.followee)
        console.log(res.data)
        let isAdmin = false
           if(currentUser.username == 'InkupOfficial' && currentUser.username == 'prudentelias'){
            isAdmin = false
           }
         dispatch(actions.updateUser({...res.data.user, isAdmin: isAdmin}))
        await axios.post(`${URL}/api/notification/follow`, {user:user},{headers: {Authorization: localStorage.getItem('token') }})

     }
    const unfollow = async() => {
       let res =  await axios.post(`${URL}/api/unfollow`, {username:user.username, id:user._id},{headers: {Authorization: localStorage.getItem('token') }})
       setUser(res.data.followee)
        console.log(res.data)
        let isAdmin = false
           if(currentUser.username == 'InkupOfficial' && currentUser.username == 'prudentelias'){
            isAdmin = false
           }
        dispatch(actions.updateUser({...res.data.user, isAdmin: isAdmin}))

    }

    const turnOnNotification = async() => {
        const res = await (await axios.post(`${URL}/api/notis/on`, {noticee: user._id},{headers: {Authorization: localStorage.getItem('token') }})).data
        console.log(res)
        if(res.status == 200){
            setAddedToNotis(true)
        }
    }

    const turnOffNotification = async() => {
        const res = await (await axios.post(`${URL}/api/notis/off`, {noticee: user.id},{headers: {Authorization: localStorage.getItem('token') }})).data
        if(res.status == 200){
            setAddedToNotis(false)
        }
    
    }
    const startConversation = async() => {
        const res = await (await axios.post(`${URL}/api/conversation` ,{receiver:user._id, sender: currentUser._id },{headers: {Authorization: localStorage.getItem('token') }})).data
        if(res.status == 200){
        console.log(res.conversation_id)
        navigate(`/message/${res.conversation_id}`,{state: {user:user, convo_id: res.conversation_id}})

    }
    }
    const navigate = useNavigate()
    const redirectToLogin = () => {
        navigate('/login')
    }
    const copyInClipboard = () => {
        copy(`http://writeup.vercel.app/${user.username}`)
        toast('Copied to Clipboard')

    }
    const redirectToUserLink = (link) => {
        window.location.replace(link)
    }
   return (
    <div className=" bg-white mb-[6em] pt-[2em] w-[100%] ml-[0em]  rounded-xl lg:top-[1.5em] relative flex-col lg:mt-[1em] lg:w-1/2 lg:ml-[1em]  lg:pt-[1em]">
    <div  className="activity_info flex flex-row justify-evenly lg:ml-[5em]">
        <img className='rounded-full w-[3.5em] h-[3.5em] lg:w-[7em] lg:h-[7em]' src={user.public_picture} alt={user.name}  />
           <div className="post_activity text-center">
               <p className='text-2xl font-[Sen] font-bold '> {total ? total : 0}</p>
               <p className='text-xs'>Posts</p>
               
           </div>
           <Link to={`/${user.username}/followers`} className="followers_activity text-center">
               <p className='text-2xl font-[Sen] font-bold'> {user ?user.followers.length: 0}</p>
               <p className='text-xs'>Followers</p>
               
           </Link>
           <Link to={`/${user.username}/following`} className="following_activity text-center">
               <p className='text-2xl font-[Sen] font-bold'> {user ?user.following.length: 0}</p>
               <p className='text-xs'>Following</p>
               
           </Link >
        </div>
    
       <div className="flex flex-col mt-[.75em] relative lg:left-[1em] left-[2em] lg:ml-[8em]">

        <div className='flex flex-row'>
        <div className='-ml-[1em]'> 
        <div className='inline-flex w-full'>
        <p className=" text-sm font-bold font-[Avenir] text-[#616161]  lg:text-2xl lg:mt-[1em] -ml-[.5em] w-max">{user.name}</p>
        {user.verified ==true?
        <HiBadgeCheck className="text-xl text-blue-500 lg:mt-[1.5em] mt-0"/>: ''
    }
        </div> 
        <p className=" text-xs font-[Avenir] mt-[0.5em] lg:mt-[1em] text-[#a2a2a2] font-semibold  -ml-[.5em]  mb-[1em] lg:text-xs">@{user.username}</p>
        </div>
        {

currentUser ?
currentUser !== null && user.username == currentUser.username   ? 
     <div className="profile_actions lg:mt-[0em] relative gap-[2em] w-full top-[7em] flex flex-row justify-evenl -ml-[9em] mb-[1em]">
                <Link to="/settings">
    <button className='border-purple-600 text-purple-500 font-[Sen] border-2 px-[1em]  h-[3em] font-bold text-sm   top-4 right-6 lg:right-[0em] lg:top-6 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[0em] lg:ml-[1.5em] lg:mt-[1.5em] '>Edit Profile</button>
    </Link>
                
    <button onClick={copyInClipboard} className='border-blue-600 text-blue-500 font-[Sen] border-2 px-[1em] w-fit h-[3em] bg:hidden font-bold text-sm lg:hidden   top-[20em] right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Share Profile</button>
    <ToastContainer/>


    </div>:
    currentUser.following.some((person) => person.username == user.username) ?
        <div className='flex flex-row gap-[1.5em]'>
        <HiOutlineMail onClick={startConversation}   className='text-xl lg:text-3xl absolute mt-[.25em] lg:ml-[2.5em] ml-[1.75em] ' />
    
    <button onClick={unfollow} className='text-black border-black 
     font-[Sen] border-2 px-[.5em] w-fit lg:ml-[9em] ml-[5.5em] -mt-[.5em] h-[3em] font-bold text-xs  lg:right-0  rounded-lg lg:p-3 lg:w-[10em] lg:mr-[0em] '>Following</button>
    {
        currentUser.notis.some((person) => person.username == user.username)  || addedToNotis ?
        <HiBell onClick={turnOffNotification}  className='text-xl lg:text-3xl absolute lg:mt-[1em] mt-[.25em] lg:ml-[.75em] ml-[.5em]' />
        :

        <HiOutlineBell onClick={turnOnNotification}  className='text-xl lg:text-3xl mt-[2.5em] absolute lg:ml-[.75em] ml-[.5em]' />
        
        
    
    }
  </div>
:
<div className='flex'>
<HiOutlineMail onClick={startConversation} className='text-xl lg:text-3xl absolute mt-[1.5em] lg:ml-[1.5em] ml-[.5em]' />
    
 <button onClick={follow} className='text-white bg-blue-500 font-[Sen] border-2 px-[1em] w-[90%] 
 ml-[7em] mt-[2em] h-[3em] font-bold text-sm    rounded-lg lg:p-3 lg:w-[10em]  '>Follow</button>
 </div>
:   <button onClick={redirectToLogin} className='text-white bg-blue-500 font-[Sen] border-2 px-[1em] w-[90%] ml-[1.2em] h-[3em] font-bold text-sm   top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Follow</button>
}
    </div>
        <p className=" text-xs font-[Avenir] w-[90%] text-[#aaa] font-semibold  mb-[1em] -ml-[2em] -mt-[.5em] lg:text-xl">{user.bio ?user.bio: ''}</p>
        <div>

        <div className='flex flex-row gap-[.5em] -ml-[1.5em] lg:ml-[0em]'>
        {user.location ? 
        <div className='inline-flex flex-row gap-[.25em]'>
            <CiLocationOn className="text-[#333] text-base lg:text-2xl" /> 
        <p className='text-sm font-[Avenir] w-[90%] text-[#aaa] font-semibold  mb-[1em] lg:text-xl'>{user.location}</p> 
        </div> : ''
}
{
    user.websiteUrl ?

        <div className='inline-flex flex-row w-[15em]  overflow-hidden text-ellipsis  gap-[.25em]'>
            <AiOutlineLink className="text-blue-500 text-lg lg:text-2xl " /> 
        <a href={user.websiteUrl.startsWith('https://')? user.websiteUrl :"https://"+user.websiteUrl} target='_blank' rel='noopener norefferer' className='text-sm font-[Avenir] w-[90%] text-blue-500 font-semibold  mb-[1em] lg:text-xl'>{user.websiteUrl}</a> 
        </div> : ''
}        
        </div>
        
             </div>
       </div>
       {

         
         user.following.some((person) => person.username == currentUser.username) && 
         currentUser.following.some((person) => person.username == user.username) ?
         <p className='text-xs text-[#a2a2a2] font-[Sen] font-bold mt-[.5em] ml-[1.5em]  lg:ml-[10.5em] pb-[1em]'>You follow each other</p>: 
         
         user.following.some((person) => person.username == currentUser.username) ?
         <p className='text-xs text-[#a2a2a2] font-[Sen] font-bold ml-[10.5em] mt-[-2.5em] pb-[1em]'> Follows you</p> :''
        
        
       }

     
    </div>
)
}

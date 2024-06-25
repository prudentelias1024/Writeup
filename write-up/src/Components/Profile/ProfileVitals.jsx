import React from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom';
import { HiBadgeCheck, HiBell, HiHashtag, HiOutlineBell } from 'react-icons/hi';
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
        const res = axios.get(`${URL}/api/notis/on`, {noticee: user.id},{headers: {Authorization: localStorage.getItem('token') }})
    }

    const turnOffNotification = async() => {
        const res = axios.get(`${URL}/api/notis/off`, {noticee: user.id},{headers: {Authorization: localStorage.getItem('token') }})
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
    <div className=" bg-white mb-[6em] pt-[2em] w-[100%] ml-[0em]  rounded-xl lg:top-[1.5em] relative flex-col lg:mt-[1em] lg:w-4/5  lg:ml-[1em]  lg:pt-[1em]">
    <div  className="activity_info flex flex-row justify-evenly">
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
    
       <div className="flex flex-col mt-[.75em] relative left-[2em] lg:ml-[8em]">
        <div className='inline-flex'>
        <p className=" text-lg font-bold font-[Avenir] text-[#616161]  lg:text-2xl lg:mt-[1em]">{user.name}</p>
        {user.verified ==true?
        <HiBadgeCheck className="text-xl text-blue-500 lg:mt-[1.5em] mt-1"/>: ''
        }
        </div> 
        <p className=" text-sm font-[Avenir]  text-[#a2a2a2] font-semibold  mb-[1em] lg:text-xl">@{user.username}</p>
        <p className=" text-sm font-[Avenir] w-[90%] text-[#aaa] font-semibold  mb-[1em] lg:text-xl">{user.bio ?user.bio: ''}</p>
        <div>

        <div className='flex flex-row gap-[.5em]'>
        {user.location ? 
        <div className='inline-flex flex-row gap-[.25em]'>
            <CiLocationOn className="text-[#333] text-base lg:text-2xl" /> 
        <p className='text-sm font-[Avenir] w-[90%] text-[#aaa] font-semibold  mb-[1em] lg:text-xl'>{user.location}</p> 
        </div> : ''
}
{
    user.websiteUrl ?

        <div className='inline-flex flex-row gap-[.25em]'>
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
         <p className='text-xs text-[#a2a2a2] font-[Sen] font-bold ml-[2.5em] pb-[1em]'>You follow each other</p>: 
         
         user.following.some((person) => person.username == currentUser.username) ?
         <p className='text-xs text-[#a2a2a2] font-[Sen] font-bold ml-[2.5em] pb-[1em]'> Follows you</p> :''
        
        
       }

        {

       currentUser ?
       currentUser !== null && user.username == currentUser.username   ? 
            <div className="profile_actions left-[2em] flex flex-row justify-evenly mt-[1em]">
                       <Link to="/settings">
       <button className='border-purple-600 text-purple-500 font-[Sen] border-2 px-[1em] w-fit h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-[-10em] lg:top-6 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Edit Profile</button>
       </Link>
                       
       <button onClick={copyInClipboard} className='border-blue-600 text-blue-500 font-[Sen] border-2 px-[1em] w-fit h-[3em] bg:hidden font-bold text-sm lg:hidden  lg:absolute top-[20em] right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Share Profile</button>
       <ToastContainer/>

       
       </div>:
        currentUser.following.some((person) => person.username == user.username) ?
            <div className='flex flex-row gap-[1.5em]'>
         
         <button onClick={unfollow} className='text-black border-black font-[Sen] font-[Sen] border-2 px-[1em] w-[75%] ml-[1.2em] h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Following</button>
       {
        currentUser.length > 0 ?
            currentUser.notis.map((noticer) => {
            
             if(noticer.username == user.username){
            return <HiBell onClick={turnOffNotification}  className='text-3xl mt-1.5  -ml-[.2em]' />
            
            } else{

            return <HiOutlineBell onClick={turnOnNotification}  className='text-3xl mt-1.5  -ml-[.2em]' />
            }
            })
            :
             <HiOutlineBell onClick={turnOnNotification}  className='text-3xl mt-1.5  -ml-[.2em]' />
            
        
       }
         </div>
       :
        <button onClick={follow} className='text-white bg-blue-500 font-[Sen] border-2 px-[1em] w-[90%] ml-[1.2em] h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Follow</button>
      :   <button onClick={redirectToLogin} className='text-white bg-blue-500 font-[Sen] border-2 px-[1em] w-[90%] ml-[1.2em] h-[3em] font-bold text-sm  lg:absolute top-4 right-6 lg:right-0 lg:top-7 rounded-lg lg:p-3 lg:w-[10em] lg:mr-[5em] '>Follow</button>
    }
    </div>
)
}

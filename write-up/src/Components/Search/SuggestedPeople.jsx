import React, {useEffect} from 'react'
import Mock from '../../mock.jpg'
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { actions } from '../../store';

export default function SuggestedPeople({people}) {
    const {user} = useSelector(state => state)
    const {URL} = useSelector(state => state)
    const dispatch = useDispatch()
     
     const follow = async() => {
        let res =  await axios.post(`${URL}/api/follow`, {username:people.username, id:people._id},{headers: {Authorization: localStorage.getItem('token') }})
         let isAdmin = false
            if(user.username == 'InkupOfficial' && user.username == 'prudentelias'){
             isAdmin = false
            }
         dispatch(actions.updateUser({...res.data.user, isAdmin: isAdmin}))
         await axios.post(`${URL}/api/notification/follow`, {user:user},{headers: {Authorization: localStorage.getItem('token') }})
         console.log(user)
      }
     const unfollow = async() => {
        let res =  await axios.post(`${URL}/api/unfollow`, {username:people.username, id:people._id},{headers: {Authorization: localStorage.getItem('token') }})
         let isAdmin = false
            if(user.username == 'InkupOfficial' && user.username == 'prudentelias'){
             isAdmin = false
            }
         dispatch(actions.updateUser({...res.data.user, isAdmin: isAdmin}))
          console.log(user)
     }

    useEffect(() => {
       
        }, [])
    
  return (
    <div className='flex flex-row justify-between lg:w-[50%] lg:ml-[7em]'>
     <Link to={'/'+people.username} className="flex flex-row justify-between border-b-[1px] w-full">
     <div className="flex flex-row ml-[.5em]  py-[1em]">
        <img src={people.public_picture} className='h-9 w-9 rounded-full'/>
        <div className="profile ml-[.5em] flex flex-col gap-[.25em] ">
            <div className='flex flex-row'>
            <p className="name text-[.75em] font-[Sen] font-bold">{user && user.name == people.name? 'You':people.name}</p>
            {
                people.verified !== true ? '':
            <HiBadgeCheck className='text-sm text-blue-500 relative top-[.25em]'/>
            }
            </div>
            <p className="username text-[.75em] font-[Sen] text-[#9e9e9e] font-bold -mt-[.45em]">@{people.username}</p>
        </div>
         
     </div>
     </Link>
        {
            

            user && user.username == people.username ? <div></div> :
        user && user.following.length !== 0 && user.following.some((followee) => followee.username == people.username)?
        <button onClick={unfollow} className='font-[Sen] w-fit h-fit  relative right-[0em] mr-[.5em] top-[1.5em] border-black  text-xs px-[1em] rounded-md py-[.5em] border font-bold'>Following</button>:
        <button onClick={follow} className='font-[Sen] w-fit h-fit  relative right-[0em] mr-[.5em] top-[1em] bg-blue-500 text-white text-xs px-[1.5em] rounded-md py-[.5em] border font-bold'>Follow</button>
        }

     </div>

    )
}

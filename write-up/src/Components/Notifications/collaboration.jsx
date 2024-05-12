import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../../store';
import { HiBadgeCheck } from 'react-icons/hi';
import { FcCollaboration } from 'react-icons/fc';
import { time } from "../../time";

const Collaboration = ({notification}) => {
    const {notifications,URL} = useSelector(state => state)
    const dispatch = useDispatch()
    const [timeCreated,setTimeCreated] = useState()
    const [verified,setVerified] = useState(false)
    const markAsRead = async(_id) => {
       
        let temp = []
        console.log(URL)
        const newNotification = await (await axios.post(`${URL}/api/notification/read`,{_id:_id}, {headers:{Authorization: localStorage.getItem('token')}})).data
          let index = notifications.findIndex((notification) =>{return notification._id === newNotification._id})
        temp = [...notifications]
        temp[index] = newNotification
        
        dispatch(actions.updateNotifications(temp))
       }
    
    useEffect(() => {
      
      
        setTimeout(() => {
            markAsRead(notification._id)
        }, 3000);
        
        setInterval(() => {
            setTimeCreated(time(notification.createdAt))  
        }, 500);
    }, []);
    return (
        <Link to={notification.message[0].post[1].link}>
            <div className='flex flex-row lg:flex-row  lg:border-[.4px] gap-3  w-[115%] border-b-[1px] border-t-[1px] lg:w-[60%] bg-white p-[.5em]   lg:pl-[2em] hover:scale-110'>
       
        <FcCollaboration  className='text-2xl text-red-500 mt-[1em]'/>
        
        <div className=' flex flex-col w-fit font-[Sen] ml-0  gap-[.05em]  lg:ml-[2em]'>
        <img src={notification.message[0].user[2].public_picture} alt={notification.message[0].user[0].name} className='h-[2.5em] w-[2.5em]  lg:mt-[1em] rounded-full' />

        <div className='font-bold font-[Sen] text-sm flex inline-flex flex-wrap pr-[4em] '>
        
      <Link  to={notification.message[0].user[1].link}>
        <p className='flex inline-flex'> 
        {notification.message[0].user[0].name}  {  notification.actionUserVerified? <HiBadgeCheck  className="text-lg text-blue-500 m"  />: ''} </p>
      </Link> 
         <p> added you as a Collaborator. Click to edit the content </p> 
            </div>        
         
        </div>
         
  </div>
        </Link>
    );
}


export default Collaboration

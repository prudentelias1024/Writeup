import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoMention } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";
import { HiBadgeCheck } from 'react-icons/hi';
import { actions } from '../../store';
import { time } from "../../time";
const Commented = ({notification}) => {
    let URL;
    const {notifications} = useSelector(state => state)
    const dispatch = useDispatch()
    const [timeCreated,setTimeCreated] = useState()
    const markAsRead = async(_id) => {
        let temp = []
        const newNotification = await (await axios.post(`${URL}/api/notification/read`,{_id:_id}, {headers:{Authorization: localStorage.getItem('token')}})).data
          let index = notifications.findIndex((notification) =>{return notification._id === newNotification._id})
        temp = [...notifications]
        temp[index] = newNotification
        
        dispatch(actions.updateNotifications(temp))
       }
    useEffect(() => {
      
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
        setTimeout(() => {
            markAsRead(notification._id)
        }, 3000);
        setInterval(() => {
            setTimeCreated(time(notification.createdAt))  
        }, 500);
    }, [timeCreated]);
    return (
        <div>
        <div className='flex flex-row lg:flex-row gap-3 dark:border-[#515151] w-[115%] border-b-[1px] border-t-[1px] lg:w-[60%]  bg-white dark:bg-[#000] dark:text-white p-[.5em]  lg:border-[.4px]  lg:pl-[2em] hover:scale-110'>
   
    <GoMention  className='text-xl text-blue-500 mt-[1em]'/>
    
    <div className=' flex flex-col w-fit font-[Sen] ml-0  gap-[.05em]  lg:ml-[2em]'>
    <img src={notification.message[0].user[2].public_picture} alt={notification.message[0].user[0].name} className='h-[30px] w-[30px] lg:w-[2em]  lg:mt-[1em] rounded-full' />

    <div className='[.125em]'>
  <Link className=' font-bold font-[Sen] text-xs inline-flex flex-wrap gap-[0.2em] ' to={'/'+notification.message[0].user[1].link.split('@')[1]}>
    <p className='inline-flex'> 
    {notification.message[0].user[0].name}  {  notification.actionUserVerified? <HiBadgeCheck  className="text-lg text-blue-500 m"  />: ''} </p>
     <p>commented on your post </p> 
  </Link> 
        </div>        
     
    </div>
     
</div>
    </div>

    );
}

export default Commented;

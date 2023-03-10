import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../../store';

import { time } from "../../time";
const Liked = ({notification}) => {
    const {notifications} = useSelector(state => state)
    const dispatch = useDispatch()
    const [timeCreated,setTimeCreated] = useState()
    const markAsRead = async(_id) => {
        let temp = []
        const newNotification = await (await axios.post('http://localhost:5000/api/notification/read',{_id:_id}, {headers:{Authorization: localStorage.getItem('token')}})).data
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
    }, [timeCreated]);
    return (
        <div>
            <div className='flex flex-col lg:flex-row gap-3 m-auto w-[115%] lg:w-[57.6%] lg:m-auto bg-white p-[1em]  justify-between lg:pl-[7em] hover:scale-110'>
        {
            notification.read == false? 
        <p className='lg:ml-[-6em] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg'>Unread </p>
:
                 <p className='lg:ml-[-6em] bg-red-200 text-red-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg'>Read </p> }

        <img src={notification.message[0].user[2].public_picture} alt={notification.message[0].user[0].name} className='h-[3em] w-[3em] m-auto lg:m-0 rounded-full' />
        
        <p className=" relative m-auto  left-[.7em] lg:left-[-1.5em] lg:top-3 -top-10 text-red-600 text-3xl">💖</p>
        <div className=' w-[80%] font-[Mulish] m-auto lg:ml-[-2em]'>

        
         <p className=' text-xl font-[Mulish] -mt-[1.6em] lg:ml-[-.5em] lg:mt-[.5em]'><Link to={"/"+ notification.message[0].user[1].link} className='font-bold font-[Mulish] text-xl'>{notification.message[0].user[0].name}  </Link> liked <Link className='text-blue-600 font-bold text-xl' to={"/"+notification.message[0].post[1].link}>{notification.message[0].post[0].name}</Link> </p> 
         
        </div>
        <p className=" font-[Mulish] relative top-0 text-gray-400 my-auto m-auto lg:ml-[-1em] font-bold">{timeCreated}</p>
         
  </div>
        </div>
    );
}

export default Liked;

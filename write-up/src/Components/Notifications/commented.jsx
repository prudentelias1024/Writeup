import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
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
            <div className='flex flex-col lg:flex-row gap-3 lg:w-[60%] w-[115%] lg:m-auto bg-white p-[1em] m-auto justify-between lg:pl-[7em] hover:scale-110'>
            {
            notification.read == false? 
            <p className='font-[Outfit] lg:ml-[-6em] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg mb-[1em]'>Unread </p>
           : <p className='font-[Outfit] lg:ml-[-6em] bg-red-200 text-red-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg mb-[1em]'>Read </p> }
        <img src={notification.message[0].user[2].public_picture} alt={notification.message[0].user[0].name} className='h-[3em] w-[3em] rounded-full m-auto' />
        <p className='relative left-[.5em] lg:left-[-1.75em] lg:top-2 m-auto -top-10 text-gray-600 text-3xl'>✍</p>
        <div className='lg:-ml-[2.5em] w-[85%] font-[Outfit] m-auto '>

        
         <p className='font-[Outfit] text-xl lg:ml-[-.5em] lg:mt-[.5em] -mt-[.75em]'><Link className='font-bold font-[Outfit] text-xl' to={notification.message[0].user[1].link}><p>{notification.message[0].user[0].name} </p>  {  notification.actionUserVerified? <HiBadgeCheck  className="text-xl text-blue-500 mt-1"  />: ''}   </Link> commented <Link className='text-blue-600 font-bold text-xl' to={"/"+notification.message[0].post[1].link}>{notification.message[0].post[0].name}
         </Link></p> 
         
        </div>
        <p className="font-[Outfit] text-gray-400 lg:my-auto m-auto lg:ml-[-2em] font-bold">{timeCreated}</p>
  </div>
        </div>
    );
}

export default Commented;

import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import io from 'socket.io-client'
import Followed from './Notifications/followed';
import Liked from './Notifications/liked';
import Bookmarked from './Notifications/bookmarked';
import Commented from './Notifications/commented';
import Welcome from './Notifications/welcome';
import {useSelector} from 'react-redux'
import Collaboration from './Notifications/collaboration';
import UserNav from './Navbar/UserNav';
import Header from './header';
import axios from 'axios';

//Notification types
//follow 
//likes 
//comment
//bookmark
//welcome
//achievements/milestone
//system
const Notifications = () => {
    const {notifications} = useSelector(state => state)
    const {URL} = useSelector(state=>state)
    const socket = io(URL)
    // useEffect(async() => {
    //     console.log(notifications)
    //     const read =  notifications.filter((notification) => {
    //       return notification.read === false
    //    })
    //    read.forEach(async(notification) => {
    //      let newNotifications = await(await axios.post(`${URL}/api/notification/read`,{_id:notification._id},{headers:{Authorization: localStorage.getItem('token')}})).data
         
    //    })
    //    console.log(read)
       
    // },[])
      
    
    return (
        <>
        <Header/>
        <div className='pt-[.75em] lg:pt-[8em] w-[100%] z-0 flex flex-col '>
            {
            notifications && notifications.length !== 0?
            
              notifications.map((notification) => {
                if(notification.type == 'like'){
                  return <Liked notification={notification}/>
                }
                if(notification.type == 'comment'){
                  return   <Commented notification={notification}/>
                }
                if(notification.type == 'bookmark'){
                  return   <Bookmarked notification={notification}/>
                }
                if(notification.type == 'follow'){
                  return  <Followed notification={notification}/>
                }
                if(notification.type == 'collaboration'){
                  return  <Collaboration notification={notification}/>
                }
              }) : ''   
        }
           
         
          
            <Welcome/>
        </div>
        <UserNav/>
        </>
    );
}

export default Notifications;

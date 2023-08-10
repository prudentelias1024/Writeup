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
// const socket = io('https://writeup-37ap.vercel.app')
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
  
    
    return (
        <>
        <NavBar/>
        <div className='pt-[1em] lg:pt-[8em] w-[100%] z-0 flex flex-col gap-[.75em]'>
            {
            notifications && notifications.length !== 0?
            
              notifications.map((notification) => {
                console.log(notification)
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

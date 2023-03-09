import React from 'react';
import NavBar from './NavBar';
import io from 'socket.io-client'
import Followed from './Notifications/followed';
import Liked from './Notifications/liked';
import Bookmarked from './Notifications/bookmarked';
import Commented from './Notifications/commented';
import Welcome from './Notifications/welcome';
const socket = io('http://localhost:5000')
//Notification types
//follow 
//likes 
//comment
//bookmark
//welcome
//achievements/milestone
//system
const Notifications = () => {
    return (
        <>
        <NavBar/>
        <div className='pt-[6em] lg:pt-[8em] w-[100%]  flex flex-col gap-[.75em]'>
            <Followed/>
            <Liked/>
            <Bookmarked/>
            <Commented/>
            <Welcome/>
        </div>
        </>
    );
}

export default Notifications;

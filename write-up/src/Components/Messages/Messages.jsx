import React, { useState, useRef } from 'react';
import UserNav from '../Navbar/UserNav';
import MessagersList from './MessagersList';
import MessageRoom from './MessageRoom';


const Messages = () => {
    return (
        <>
        
        <div className=' lg:ml-[10em] w-full lg:w-full '>
        <div className='lg:grid lg:grid-cols-2  lg:ml-[7em] lg:w-full'>
       
        <MessagersList/>
        <MessageRoom />
    </div>

        <UserNav/>
        </div>
        </>
    )
}



export default Messages
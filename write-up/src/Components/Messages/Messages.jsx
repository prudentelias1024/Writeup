import React, { useState, useRef } from 'react';
import UserNav from '../Navbar/UserNav';
import MessagersList from './MessagersList';
import MessageRoom from './MessageRoom';


const Messages = () => {
    return (
        <>
        
        <div className=' lg:ml-[10em] w-full lg:w-full '>
        <div className='lg:grid lg:grid-cols-2  lg:ml-[7em] lg:w-full'>
       
        <div className='flex flex-col w-full lg:w-fit' >
        <p className='relative lg:ml-[63m]  lg:mt-[1.5em] ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Messages</p>
        <MessagersList/>
    </div>
        <MessageRoom />
    </div>

        <UserNav/>
        </div>
        </>
    )
}



export default Messages
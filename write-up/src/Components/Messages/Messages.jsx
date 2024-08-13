import React, { useState, useEffect, useRef } from 'react';
import UserNav from '../Navbar/UserNav';
import MessagersList from './MessagersList';
import MessageRoom from './MessageRoom';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {io} from 'socket.io-client'

const Messages = () => {
  const {URL, user, closeRoom} = useSelector(state => state)
  const [conversations , setConversations] = useState(null)
  const [messages , setMessages] = useState(null)
  const [displayRoom, setDisplayRoom] = useState(false)
  const [recipient, setRecipient] = useState(false)
  

    const location = useLocation()
    
    
    
        return (
        <>
        
        <div className=' lg:ml-[10em] w-full lg:w-full '>
        <div className='lg:grid lg:grid-cols-2  lg:ml-[7em] lg:w-full'>
       
        <MessagersList setRecipient={setRecipient}  openRoom={setDisplayRoom} setConversations={setConversations}/>
        {
          
          //Click from conversation list
          (displayRoom  && conversations !== null) && (closeRoom == false) ?

          <MessageRoom enterRoom={displayRoom} updateConvo={setConversations}  recipient={recipient} conversationId={conversations} setRecipient={setRecipient}  />:


          //loading using message icon
            location.state !== null  ?
            <MessageRoom enterRoom={displayRoom} recipient={location.state.user} conversationId={location.state.convoId}  />
            :
            //loading using URL
        <MessageRoom enterRoom={displayRoom}  recipient={null} conversationId={location.state == undefined || location.state == null ? null : location.state.convoId} />
        }
    </div>

        <UserNav/>
        </div>
        </>
    )
}



export default Messages
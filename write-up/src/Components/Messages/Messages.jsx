import React, { useState, useEffect, useRef } from 'react';
import UserNav from '../Navbar/UserNav';
import MessagersList from './MessagersList';
import MessageRoom from './MessageRoom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actions } from '../../store';

const Messages = () => {
  
  const {URL, user, closeRoom, enterRoom, roomChanges} = useSelector(state => state)
  const [conversations , setConversations] = useState(null)
  const [messages , setMessages] = useState(null)
  const [recipient, setRecipient] = useState(false)
  console.log(enterRoom, closeRoom, conversations)
  const dispatch = useDispatch()
  
 
  const location = useLocation()
    
  console.log(location.state)  
    
        return (
        <>
        
        <div className=' lg:ml-[10em] w-full lg:w-full '>
        <div className='lg:grid lg:grid-cols-2  lg:ml-[7em] lg:w-full'>
       
        <MessagersList setRecipient={setRecipient}  setConversations={setConversations}/>
        {
         //Click from conversation list
          (enterRoom  && conversations !== null) && (closeRoom == false) ?

          <MessageRoom updateConvo={setConversations}  recipient={recipient} conversationId={conversations} setRecipient={setRecipient}  />:


          //loading using message icon
           location.state !== null  ?
            <MessageRoom enterRoom={true} recipient={location.state.user} conversationId={location.state.convo_id}  />
            :
            //loading using URL
        <MessageRoom  recipient={null} conversationId={location.state == undefined || location.state == null ? null : location.state.convo_id} />
        }
    </div>

        <UserNav/>
        </div>
        </>
    )
}



export default Messages
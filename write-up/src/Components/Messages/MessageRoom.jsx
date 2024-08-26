import moment from 'moment'
import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageInput from './MessageInput'
import SentMessage from './sentMessage'
import ReceivedMessage from './receivedMessage'
import {io } from 'socket.io-client'
import {  IoMdArrowRoundBack } from 'react-icons/io'
import { actions } from '../../store'
export default function MessageRoom({  recipient, conversationId, updateConvo , setRecipient}) {
 const [allMessages, setAllMessages] = useState(null)
  const {user,URL, openMobileRoom, currentChatRecipient, enterRoom, closeRoom} = useSelector(state => state)
  const dispatch = useDispatch()
  const socket = io(URL, {
    auth: {
      token: localStorage.getItem('token')
    }
    }) 
    
    const backToMessageList = () => {

      socket.emit('leave-one-v-one',{roomId: conversationId})
      dispatch(actions.updateMobileRoom(false))
      dispatch(actions.updateCloseRoom(true))
      // setAllMessages(null)
      
      
    }
    useEffect(() => { 
      setAllMessages(null)
      socket.on('send-message', (new_message) => {
        console.log(new_message)
        setAllMessages(message => [...message, new_message])
       
      })

      socket.on('get-conversations', (convo) => {
        console.log(convo)
        updateConvo(convo)
       
      })
      if (enterRoom && conversationId !== null) {
      socket.emit('get_messages', {sender: user._id, receiver: recipient})
      socket.on('get-messages', (data) => {
        console.log(data)
        setAllMessages(data)
        console.log(data)
        console.log(user)
         })
        socket.emit('join-one-v-one', {roomId: conversationId })

        }
     
 
       return () => {
      
        socket.off('leave-one-v-one',{roomId: conversationId})
        socket.off('get-messages')
        socket.off('send-message')
        socket.off('get-conversations')
    
    };
    }, [closeRoom, recipient])
    console.log(recipient, allMessages)
  
     if(allMessages !== null && recipient !== null){

    
  return (
    
    <div className={openMobileRoom == true || enterRoom == true?
       " lg:flex flex-col ml-[1em] overflow-y-auto  lg:ml-[-10em] pt-[1.5em]":
       " hidden lg:flex flex-col ml-[1em] overflow-y-auto   lg:ml-[-10em] pt-[1.5em]"
    }>
        
     
        <div className="flex flex-row gap-1">
       <IoMdArrowRoundBack onClick={backToMessageList}
         className='text-3xl mt-2 mr-3'
         ></IoMdArrowRoundBack>
    <img src={recipient.public_picture} alt={recipient.name} className='rounded-full h-12 w-12 mr-[1em] '  />
    <div>

      <p className="font-[Avenir] font-semibold">{recipient.name}</p>
      <p className="font-[Avenir] text-[#a0a0a0] font-semibold">Last seen  {
      moment().diff(recipient.lastActive, 'day') > 1?
    
       'on ' +  moment(recipient.lastActive).format('MMM DD YYYY h:mm a') :
      
      moment().diff(recipient.lastActive, 'hour') + ' ago'
      

      }  </p>

     </div>
    
    </div>
    <div className="flex flex-col text-center lg:pr-[20em] pt-[2em] lg:pt-[5em] gap-2 -indent-8">
    <img src={recipient.public_picture} alt={recipient.name} className='rounded-full m-auto h-20 w-20  '  />
    <p className="font-[Avenir] font-semibold">{recipient.name}</p>
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold">@{recipient.username}</p>
    <p className="font-[Avenir] font-semibold ">{recipient.bio}</p>
    
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold text-center">{ recipient.followers.length} Followers</p>

    {/* </div> */}
   
    </div>
    <div className="messages   relative lg:w-[60%] w-full mt-[4em] overflow-x-hidden overflow-y-auto flex flex-col gap-4 mb-[8em] pr-[1em]  lg:mb-[8em]">
    {
     allMessages !== null ?
      allMessages.map((message,index) => {
       if(message.sender == user._id){
       return <SentMessage key={index} text={message.text}/>
       } else {
        return <ReceivedMessage key={index} text={message.text}/> 

       }
      }): ''
    }
   
   
  
  
   
    </div>
    <MessageInput 
    recipient={recipient} 
    
    message={allMessages}
    
    setMessage={setAllMessages} 
    
    conversationId={conversationId} />
    </div>
  )
} else {
  return(
  <div className='lg:pt-[15em] hidden w-full lg:ml-[-2em] '>
    <p className="font-[Sen] text-2xl font-bold">Select a message </p>
    <p className='font-[Sen] text-base'> Choose from your conversations list  </p>
  </div>
  )
}
}

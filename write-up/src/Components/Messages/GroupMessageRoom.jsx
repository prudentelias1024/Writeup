import moment from 'moment'
import React, { useState , useEffect, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageInput from './MessageInput'
import SentMessage from './sentMessage'
import ReceivedMessage from './receivedMessage'
import {  IoMdArrowRoundBack } from 'react-icons/io'
import { actions } from '../../store'
import { SocketContext } from '../../socketProvider'
export default function GroupMessageRoom({   conversation, updateConvo }) {
 const [allMessages, setAllMessages] = useState(null)
 const [typingStatus, setTypingStatus] = useState(null)
  const {user,URL, openMobileRoom, enterGroupRoom, closeGroupRoom} = useSelector(state => state)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext);

    
    const backToMessageList = () => {

      socket.emit('leave-room',{roomId: conversation._id})
      dispatch(actions.updateMobileRoom(false))
      dispatch(actions.updateEnterGroupRoom(false))
      // dispatch(actions.updateCloseGroupRoom(false))
      // setAllMessages(null)
      
      
    }
    useEffect(() => { 
      // setAllMessages(null)
      socket.on('send-group-message', (new_message) => {
        console.log(new_message)
        setAllMessages(message => [...message, new_message])
       
      })

      //When a message is sent
      socket.on('get-group-conversations', (convo) => {
        console.log(convo)
        updateConvo(convo)
       
      })
      if (enterGroupRoom && conversation._id !== null) {
        socket.emit('join-group-convo', {roomId: conversation._id })

      socket.emit('get_group_messages', {convo_id: conversation._id})
      
      socket.on('get-group-messages', (data) => {
        console.log(data)
        setAllMessages(data)
        console.log(data)
        console.log(user)
         })
       

        }
     
 
       return () => {
        socket.emit('unactive',{roomId: conversation._id})
        socket.off('leave-one-v-one',{roomId: conversation._id})
        socket.off('get-group-messages')
        socket.off('send-group-message')
        socket.off('get-group-conversations')
    
    };
    }, [closeGroupRoom, ])
    console.log(enterGroupRoom, conversation, allMessages)
     if( conversation !== null){

    
  return (
    
    <div className={ enterGroupRoom == true?
       " lg:flex flex-col ml-[1em] overflow-y-auto  lg:ml-[-10em] pt-[1.5em]":
       " hidden lg:flex flex-col ml-[1em] overflow-y-auto  lg:ml-[-10em] pt-[1.5em]"
    }>
        
     
        <div className="flex flex-row gap-1">
       <IoMdArrowRoundBack onClick={backToMessageList}
         className=' text-xl lg:text-3xl mt-2 mr-3'
         ></IoMdArrowRoundBack>
    <img src={conversation.icon} alt={conversation.name} className='rounded-full h-[2.5em]  w-[2.5em] lg:h-12 lg:w-12 mr-[1em] '  />
    <div>

      <p className="font-[Avenir] text-sm -ml-[0.5em] lg:ml-0 lg font-semibold">{conversation.name}</p>
     
      <p className="font-[Avenir] text-xs -ml-[0.5em] lg:ml-0 text-[#7b7b7b] overflow-ellipsis font-semibold max-w-[40em] overflow-hidden whitespace-nowrap w-fit  mr-[2em] mt-1 ">
      {conversation.participants.map((member) => {
        if(conversation.participants.indexOf(member) !== conversation.participants.length -1 ){
          return member.name + ", ";
        } else {
          return member.name ;

        }
      })}
      </p>
     
     </div>
    
    </div>
    <div className="flex flex-col text-center lg:pr-[20em] pt-[2em] lg:pt-[5em] gap-2 -indent-8">
    <img src={conversation.icon} alt={conversation.name} className='rounded-full m-auto lg:h-20 lg:w-20  '  />
    <p className="font-[Avenir] text-base font-semibold">{conversation.name}</p>
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold">@{conversation.name}</p>
    {/* <p className="font-[Avenir] font-semibold ">{recipient.description}</p> */}
    
    <p className="font-[Avenir] text-[#a0a0a0] font-semibold text-center">{ conversation.participants.length} Members</p>

    {/* </div> */}
   
    </div>
    <div className="messages   relative lg:w-[60%] w-full mt-[4em] overflow-x-hidden overflow-y-auto flex flex-col gap-4 mb-[8em] pr-[1em]  lg:mb-[8em]">
    {
     allMessages !== null ?
      allMessages.map((message,index) => {
       if(message.sender == user._id){
       return <SentMessage key={index} socket={socket} messageSetter={allMessages} conversationId={conversation._id}  allMessages={setAllMessages} message={message} />
       } else {
        return <ReceivedMessage key={index} socket={socket}  messageSetter={allMessages} conversationId={conversation._id} allMessages={setAllMessages} message={message}/> 

       }
      }): ''
    }
   
   
  
  
   
    </div>

    {
      conversation.adminLocked && conversation.admins.indexOf(user._id) == -1? 
      <p className='font-[Sen] text-2xl font-bold'>Only admins are allowed to send a message</p>
:
    <MessageInput 
    roomType='group'
    socket={socket}
    recipient={conversation} 
    setTypingStatus={setTypingStatus}
    message={allMessages}
    roomId={conversation._id}
    setMessage={setAllMessages} 
    
    conversationId={conversation._id} />
     }
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

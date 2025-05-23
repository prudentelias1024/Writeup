import moment from 'moment'
import React, { useState , useEffect, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageInput from './MessageInput'
import SentMessage from './sentMessage'
import ReceivedMessage from './receivedMessage'
import {  IoMdArrowRoundBack } from 'react-icons/io'
import { actions } from '../../store'
import { SocketContext } from '../../socketProvider'
export default function MessageRoom({  recipient, conversationId, updateConvo , setRecipient}) {
 const [allMessages, setAllMessages] = useState(null)
 const [typingStatus, setTypingStatus] = useState(null)
 console.log(recipient)
 const [recipientActiveStatus, setRecipientActiveStatus] = useState('')
  const {user,URL, openMobileRoom, currentChatRecipient, enterRoom, closeRoom} = useSelector(state => state)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext);

    
    const backToMessageList = () => {

      socket.emit('leave-room',{roomId: conversationId})
      dispatch(actions.updateMobileRoom(false))
      dispatch(actions.updateCloseRoom(true))
      // setAllMessages(null)
      
      
    }
    useEffect(() => { 
      setAllMessages(null)
      if(recipient != null){

        setRecipientActiveStatus(recipient.lastActive)
      }
      socket.on('send-p2p-message', (new_message) => {
        console.log(new_message)
        setAllMessages(message => [...message, new_message])
       
      })

      socket.on('online', ({recipientStatus}) => {
        setRecipientActiveStatus(recipientStatus)
      })
      socket.on('get-conversations', (convo) => {
        console.log(convo)
        updateConvo(convo)
       
      })
      if (enterRoom && conversationId !== null) {
        socket.emit('join-one-v-one', {roomId: conversationId, userId: recipient._id })
      socket.emit('get_messages', {sender: user._id, receiver: recipient})
      socket.emit('check_recipient_activeness',{userId: recipient._id, roomId: conversationId})

      socket.on('recipient_status',({recipientStatus}) =>{
         
        setRecipientActiveStatus(recipientStatus)

    })
      socket.on('get-messages', (data) => {
        console.log(data)
        setAllMessages(data)
        console.log(data)
        console.log(user)
         })
       

        }
     
        socket.on('recipient_inactive', ({recipientStatus}) => {
          console.log(recipientStatus)
          setRecipientActiveStatus(recipientStatus)
        })
 
       return () => {
        socket.emit('unactive',{roomId: conversationId})
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
       " hidden lg:flex flex-col ml-[1em] overflow-y-auto  lg:ml-[-10em] pt-[1.5em]"
    }>
        
     
        <div className="flex flex-row gap-1">
       <IoMdArrowRoundBack onClick={backToMessageList}
         className=' text-xl lg:text-3xl mt-2 mr-3'
         ></IoMdArrowRoundBack>
    <img src={recipient.public_picture} alt={recipient.name} className='rounded-full h-[2.5em]  w-[2.5em] lg:h-12 lg:w-12 mr-[1em] '  />
    <div>

      <p className="font-[Avenir] text-sm -ml-[0.5em] lg:ml-0 lg font-semibold">{recipient.name}</p>
      <p className="font-[Avenir] text-sm -ml-[0.5em] lg:ml-0 text-[#a0a0a0] font-semibold">  {
      typingStatus == null?
      recipientActiveStatus == 'Online'? recipientActiveStatus:
     moment().diff(recipientActiveStatus, 'day') > 1?
    
       'Last seen on ' +  moment(recipientActiveStatus).format('MMM DD YYYY h:mm a') :
      
      'Last seen today at '+ moment(recipientActiveStatus).format(' h:mm a')
      : typingStatus

      }  </p>

     </div>
    
    </div>
    <div className="flex flex-col text-center lg:pr-[20em] pt-[2em] lg:pt-[5em] gap-2 -indent-8">
    <img src={recipient.public_picture} alt={recipient.name} className='rounded-full m-auto lg:h-20 lg:w-20  '  />
    <p className="font-[Avenir] text-base font-semibold">{recipient.name}</p>
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
       return <SentMessage key={index} socket={socket} messageSetter={allMessages} conversationId={conversationId}  allMessages={setAllMessages} message={message} />
       } else {
        return <ReceivedMessage key={index} socket={socket}  messageSetter={allMessages} conversationId={conversationId} allMessages={setAllMessages} message={message}/> 

       }
      }): ''
    }
   
   
  
  
   
    </div>
    <MessageInput 
    
    roomType='p2p'
    socket={socket}
    recipient={recipient} 
    setTypingStatus={setTypingStatus}
    message={allMessages}
    roomId={conversationId}
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

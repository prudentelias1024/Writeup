import React, {useEffect, useState} from 'react'
import { IoCheckmarkDone, IoCheckmark } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import {io} from 'socket.io-client'
import moment from 'moment'
export default function ReceivedMessage({message, socket,  messageSetter, allMessages}) {
  const [msg, setMsg] = useState(message)
  const {user} = useSelector(state => state)
 
  
    useEffect(() => {
      if ( message.seen == false) {
      
      socket.emit('mark_as_read',{messageId: message._id})

      socket.on('marked_as_read', (updatedMessage) => {
        console.log(updatedMessage);
        
        setMsg(updatedMessage)
      })
}
    }, [msg])
    
     

  return (
    <div className="sent relative flex flex-col ml-[0.15em]  h-fit w-fit right-auto bg-gray-500  text-white  max-w-[20em] rounded-lg">
    <p className="font-[Sen] text-xs h-fit w-fit p-[.5em] "> {msg.text}</p>
    <div className="receipt_and_timestamp flex flex-row relative mb-[.25em] ml-1">
    
      <p className="font-[Sen] text-[0.5rem]  text-white  p-[.5em] rounded-lg">{moment(msg.sent_on).format('h:s a')} </p>
      {/* {
        message.seen ?
        <IoCheckmarkDone className='text-base text-white -mt-[0.13em]  ' />:
        message.delivered && message.seen?
        < IoCheckmark className='text-base text-gray-500 -mt-[0.13em] ' />: ''
      } */}
   </div>
   </div>

    
  )
}

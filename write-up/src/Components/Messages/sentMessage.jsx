import React, {useEffect, useState} from 'react'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import {io} from 'socket.io-client'
import moment from 'moment'
export default function SentMessage({message, socket, messageSetter, conversationId, allMessages}) {
  const [msg, setMsg] = useState(message)
  const {user} = useSelector(state => state)
 
  


    useEffect(() => {
    if ( message.seen == false ) {
      
    
     socket.emit('mark_as_read',{messageId: message.id,
      roomId: conversationId
     })

      socket.on('marked_as_read', (updatedMessage) => {
        
        setMsg(updatedMessage)
      })
    }
    }, [msg])

  return (
    <div className="received relative flex flex-col bg-blue-500 text-white self-end max-w-[20em] rounded-lg ">
    <p className="font-[Sen] text-xs h-fit w-fit p-[.5em] ">{msg.text}

      <div className="receipt_and_timestamp flex flex-row relative left-0">
      <p className="font-[Sen] text-[0.5rem]  h-fit w-fit p-[.5em] ">{moment(msg.sent_on).format('h:s a')} </p>
      {
        msg.seen ?
        <IoCheckmarkDone className='text-base text-white mt-[0.2em]  ' />:
        msg.delivered?
        < IoCheckmark className='text-base text-white mt-[0.2em]' />: ''
      }
      </div>
    </p>
   </div>
   
   )
}

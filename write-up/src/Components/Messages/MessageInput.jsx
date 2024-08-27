import React, {useState, useEffect, useRef} from 'react'
import { IoIosImage, IoIosSend } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from "../../store/index";
export default function MessageInput({ recipient, conversationId, socket}) {
  const dispatch = useDispatch()
   
  const {user,URL} = useSelector(state => state)
  const messageTextRef = useRef()
 

 
  useEffect(() => {
   
 
  //   return () => {
  //     socket.close()
  // };
  }, [])
  

  const sendMessage = (e) => {
    e.preventDefault()
    const text = messageTextRef.current.value
    socket.emit('send_message',  {sender: user._id, receiver: recipient._id, text: text, roomId: conversationId })
    messageTextRef.current.value = ''
     }
     actions.updateRefreshConvo(true)
      

  
  return (
    <form className='' onSubmit={sendMessage}>
    <div className='flex flex-row fixed bottom-[4em] lg:bottom-2 p-[.35em] gap-[1em] bg-[#eff3f4] -ml-[0.5em]  lg:w-[30em] w-[95%] lg:ml-[1em] rounded-md'>
    <IoIosImage className='text-2xl text-[#1D9BF0] mt-1.5' />

    <input  ref={messageTextRef} type="text" name="message_box" className='h-[2em] outline-none w-full font-[Sen] bg-inherit' placeholder='Send Message' />
     <IoIosSend onClick={sendMessage} className='text-2xl text-[#1d9BF0] mt-1.5 '/>

    </div>
    </form>
  )
}

import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../../store'
import { IoIosBackspace } from 'react-icons/io'
import { BsDot } from "react-icons/bs";
export default function Message({convo,  setConversations, roomPermission,setRecip}) {
  const [recipient, setRecipient] = useState(null)
  const navigate = useNavigate()
  const {user, roomChanges} = useSelector(state => state)
  const dispatch = useDispatch()
    
  const openRoom = () => {
   
   setConversations(convo._id)
   setRecip(recipient)
   dispatch(actions.updateCloseRoom(false))
   dispatch(actions.updateEnterRoom(true))
   
    const isMobile = window.innerWidth <= 768;
   if (isMobile){
        dispatch(actions.updateMobileRoom(true))
        //   socket.close()
      } 
  }
  useEffect(() => {
    

     if(convo.participants[0]._id == user._id){
      setRecipient(convo.participants[1])
    } else{
      setRecipient(convo.participants[0])
    }
    console.log(recipient)
  }, [convo])

  if(recipient !== null){
   return (
    <div onClick={openRoom} className='hover:bg-[#f4f4f4] hover:scale-[.5em] w-full py-[1em] px-[.5em] lg:px-[2em]'>
     <div className="flex flex-row">
      <img src={recipient.public_picture} alt={recipient.name} className='rounded-full h-10 w-10 lg:h-12 lg:w-12 mr-[1em] '  />
     
       
      <div className="flex flex-col lg:w-full overflow-x-hidden ">  
      <div className="flex flex-row gap-1 mt-2 ml-[0.25em]  w-max ">
      <p className="font-[Avenir] overflow-ellipsis w-fit font-bold text-sm -ml-1 -mt-1.5">{recipient.name}</p>
      <p className="font-[Avenir] overflow-ellipsis overflow-hidden w-fit max-w-[8em] text-[#a0a0a0] text-xs font-semibold -mt-1" >@{recipient.username}</p>
      <p className="font-[Avenir]  text-[#a0a0a0] text-xs  font-semibold -mt-1">5h</p>
      </div>
      {
        convo.lastMessage == undefined?
     
        <div className='last_message relative '>
      <p className="text-[#a2a2a2] font-semibold text-sm"></p>

      <BsDot  className='text-4xl absolute right-0 lg:left-[6.25em] lg:top-[0.4em] -mt-[.75em] text-blue-500'/>
       </div> 
       
        :
        //
       convo.lastMessage.seen == true?
      <p className="text-[#a2a2a2] text-sm">{convo.lastMessage.text}</p>
      :    
      //If message is not seen and read
       <div className='last_message relative overflow-hidden'>
      <p className="text-[#000]  font-[Sen] font-extrabold text-sm">{convo.lastMessage.text}</p>

      <BsDot  className='text-4xl absolute right-0 -mt-[.75em] text-blue-500'/>
       </div> 
      
      }
      </div>
      
      </div>
    </div>
  )
}
}

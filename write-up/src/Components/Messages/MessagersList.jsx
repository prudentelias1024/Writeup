import React, {useEffect,useState} from 'react'
import Message from './Message'
import { Link } from 'react-router-dom'
import {io} from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import {actions} from '../../store/index'

export default function MessagersList({openRoom, setRecipient, setConversations}) {
 
  const {URL, user, refreshConvos} = useSelector(state => state)
  const [convo , setConvo] = useState([])
  const dispatch = useDispatch
  const socket = io(URL, {
  auth: {
    token: localStorage.getItem('token')
  }
  })
  useEffect(() => {
    if(user != null){

      console.log(user);
      socket.emit('get_conversations', {user: user._id})
      socket.on('get-conversations',(conversation) => {
        setConvo(conversation)
        console.log(convo)
        actions.updateRefreshConvo(false)
      })
    }

    
    // return () => {
    //   socket.close()
    // }
  }, [refreshConvos])  

  return (
    <div className='flex flex-col  w-full overflow-y-auto lg:w-fit' >
    <p className='relative lg:ml-[63m]  lg:mt-[1.5em] ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Messages</p>
   
    <div className='flex flex-col gap-[.5em] '>
    {
     convo.length > 0?  
      

    convo.map((conversation, index) => {
      console.log(conversation)
      return   <Message 
       key={index}

       setConversations={setConversations}

       roomPermission={openRoom} 
       
       convo={conversation}
       
     
        
       setRecip={setRecipient}
       />
     
  
    }): 
    
  <div className='lg:pt-[10em] w-full inline-flex gap-2  '>
  <p className='font-[Sen] text-base text-[#b5b4b4]'> Search for users to start a convo with.  </p>
  <Link to='/search' className='text-blue-500'>Click here</Link>
</div>
    } 
    </div>
    </div>
  )
}

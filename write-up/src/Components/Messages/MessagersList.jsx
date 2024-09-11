import React, {useEffect,useState} from 'react'
import Message from './Message'
import { Link, useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import {actions} from '../../store/index'

export default function MessagersList({openRoom, setRecipient, setConversations}) {
 
  const {URL, user, openMobileRoom, refreshConvos} = useSelector(state => state)
  const [convo , setConvo] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const socket = io(URL, {
  auth: {
    token: localStorage.getItem('token')
  }
  })
    // const sendToGroupCreator = () => {
    //   navigate('/message/groupCreator')
    // }
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

    
    return () => {
      
      const isMobile = window.innerWidth <= 768;
      if (isMobile){
          dispatch(actions.updateMobileRoom(false))
    //   socket.close()
    }
    }
  }, [refreshConvos])  

  return (
    <div className={
      !openMobileRoom ? 
     "flex flex-col  w-full overflow-y-auto lg:w-fit" :"hidden" } >
      <div className="flex flex-row justify-between">

      <p className='relative lg:ml-[63m]  lg:mt-[1.5em] ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Messages</p>

      <Link to='/message/createGroup' className='cursor-pointer relative lg:ml-[63m]  lg:mt-[2.25em] mt-[1.5em] text-blue-500 ml-[1em] my-[.5em] font-bold font-[Avenir] text-sm '>Create Group</Link> 

      </div>
   
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
    
  <div className='lg:pt-[10em] pt-[10em] w-full lg:inline-flex gap-2 px-[1.5em] '>
  <p className='font-[Sen] text-base text-[#b5b4b4]'> Search for users to start a convo with.  </p>
  <Link to='/search' className='text-blue-500'>Click here</Link>
</div>
    } 
    </div>
    </div>
  )
}

import React, {useEffect,useState} from 'react'
import Message from './Message'
import { Link, useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import {actions} from '../../store/index'
import GroupMessageRoom from './GroupMessageRoom'
import GroupMessage from './GroupMessage'

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

      socket.emit('get_all_conversations', {user: user._id})
      
      socket.on('get-all-conversations',(allConversations) => {
        console.log(allConversations)
        setConvo(allConversations)
        actions.updateRefreshConvo(false)
      })
    
      // socket.emit('get_p2p_conversations', {user: user._id})

      // socket.emit('get_group_conversations', {user: user._id}

      // )

      // socket.on('get-p2p-conversations',(conversation) => {
      //   setConvo([...conversation, ...convo])
      //   console.log(convo)
      //   actions.updateRefreshConvo(false)
      // })
    
      // socket.on('get-group-conversations',(conversation) => {
      //     if(conversation.length >0){
      //     setConvo([...conversation, ...convo])

      //   } 

      //   console.log(convo)
      //   actions.updateRefreshConvo(false)
      // })
    
    
    
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

      <Link to='/message/createGroup' className='cursor-pointer relative lg:ml-[63m] mr-[1.5em] lg:mt-[2.25em] mt-[1em] text-blue-500 ml-[1em] my-[.5em] font-bold font-[Avenir] text-sm '>Create Group</Link> 

      </div>
   
    <div className='flex flex-col gap-[.5em] '>
    {
     convo.length > 0?  
      

    convo.map((conversation, index) => {
      if(conversation.type == 'p2p'){
      return   <Message 
       key={index}

       setConversations={setConversations}

       roomPermission={openRoom} 
       
       convo={conversation}
       
     
        
       setRecip={setRecipient}
       />
      } else {
        return   <GroupMessage 
        key={index}
 
        setConversations={setConversations}
 
        roomPermission={openRoom} 
        
        convo={conversation}
        
      
         
        />
      }
  
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

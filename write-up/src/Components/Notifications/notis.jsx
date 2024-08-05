import React , {useEffect, useState} from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

export default function Notis() {

  useEffect(() => {
     setMostRecentNotis(user.notis[0].name)
  }, [])
  
    const {user} = useSelector((state => state) )
    const {URL} = useSelector(state=>state)
    const socket = io(URL)
 
    const [mostRecentNotis, setMostRecentNotis] = useState('')
      return (
    <div className='flex flex-row lg:flex-row gap-3 lg:border-[.2px]  w-[115%] border-b-[1px] border-t-[1px] lg:w-[60%]  bg-white p-[.5em] pl-0  lg:pl-[2em]'>
      
    <Link  to="/notis/timeline"   className='flex flex-col l'>
    
        {user.notis &&
          user.notis.length > 0 ?
          <>
    <div className='flex flex-row gap-[.5em]  '>
        <IoIosNotifications className='text-3xl mr-2 ml-2  mt-[1em] text-blue-500 ' />
          <div className="flex flex-col">
        <div className="notis flex flex-row gap-[.5em] ml-[0em] mt-[.75em]">
          
        {
          user.notis.map((user_in_notis) => {
            return    <img src={user_in_notis.public_picture}  className='h-[30px] w-[30px] lg:w-[2em] lg:h-[2em]  lg:mt-[1em] rounded-full' />
    
          })       
        }
                  

      </div>
    <p className="font-[Sen] text-xs ml-[0em] lg:ml-[0em] pb-2 mt-[.5em] lg:mt-[1em] font-semibold pr-[5em]">New Post Notification from {mostRecentNotis} and 2 others</p>
      </div>
        </div>

        
      
    </>   
          :

          <>  
        
        <div className='flex flex-row gap-[.5em]  '>
          <IoIosNotifications className='text-3xl ml-2  text-blue-500  ' />
   
           <p className="font-[Sen] text-xs ml-[em] lg:ml-[4em] pb-2 mt-[0em] lg:mt-[.5em] font-semibold pr-[5em]">No Post Notifications now. Add your favourite creators  </p>
        </div>    
          </>
      }

    </Link>
    </div>
  )
}

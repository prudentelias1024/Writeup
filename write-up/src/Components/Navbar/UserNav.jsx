import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline, IoIosMail, IoIosNotifications, IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import { VscBellDot, VscFlame } from "react-icons/vsc";
import {AiOutlineHome} from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import {  useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import axios from "axios";
import { locale } from "moment";
import MobileSearch from "./mobileSearch";

import { HiBadgeCheck } from 'react-icons/hi';
import { io } from "socket.io-client";
import { FaRegBookmark } from "react-icons/fa";
export default function UserNav(){
  let socket
    const {URL} = useSelector(state => state)
    const { user, showMobileSearch} = useSelector((state) => state)
    const [toggled, setToggled] = useState(true) 
    const [allRead, setAllRead] = useState(true) 
   const dispatch = useDispatch()
   const navigate = useNavigate()
     const helperRef   = useRef()
    useEffect(() => {
      
             socket = io(URL)
             console.log(URL)
          
        setInterval(() => {
        if (localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== null) {
            
            pollNotifications()
        }
       }, 50000);
       if (localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== null) {
       
            
              pollNotifications()
         
       }
       
    },[])
    const pollNotifications = async() => {
        socket.emit('getNotifications', {headers:{Authorization: localStorage.getItem('token')}})
          let newNotifications = await(await axios.get(`${URL}/api/notifications`,{headers:{Authorization: localStorage.getItem('token')}})).data
       
        dispatch(actions.updateNotifications(newNotifications))
         const read =  newNotifications.filter((notification) => {
            return notification.read === false
         })
       
       if(read.length == 0) {
         setAllRead(true)
       } else {
         setAllRead(false)
       }
      
    
      
     
    }
    const toggleHelper = () => {
         setToggled(!toggled)
        if (toggled == false) {
            helperRef.current.className = 'hidden'
        }
        if (toggled == true) {
            helperRef.current.className = "dropdown fixed right-5 mt-16 bg-white flex flex-col  border gap-2 w-[17em] py-4 rounded-lg lg:right-32"
        }
     }
     const handleMobileSearch = () => {
      dispatch(actions.showMobileSearch(!showMobileSearch))
     }
     if(user !== null){

     
    return(
        <>
       {
      
             <div className=" lg:fixed lg:flex-col lg:h-full  lg:mt-[2.5em] lg:w-fit lg:justify-between flex flex-row justify-around w-full p-[.5em] py-[1em] z-100 border-t bg-white  fixed bottom-[0em]">
                
            <Link to="/" >
            <AiOutlineHome className="text-3xl mt-1 block "  />
            </Link>
                
                
            <Link to="/trends" >
            <VscFlame className="text-3xl mt-1 block "  />
            </Link>

            <Link to="/Bookmarks" >
            <FaRegBookmark className="text-2xl mt-1  hidden lg:block "  />
            </Link>

            <Link to='/search'>
            <IoIosSearch onClick={handleMobileSearch}   className=" text-3xl mt-[.125em]"/>  
            </Link>
        
           <Link to="/create">
            <IoIosAddCircleOutline className="text-3xl mt-1 block "/>
           </Link>

           <Link to="/messages">
            <IoIosMail className="text-3xl mt-1 block "/>
           </Link>


            <Link to="/notifications">
           {
             allRead == false ?
             <VscBellDot className="text-3xl mt-0" />:
            <IoIosNotificationsOutline className="text-3xl mt-1"/>
        }
            
            </Link>
          <Link to='/Profile'>
            <img src={user.public_picture} alt={user.name} className='rounded-full h-8 w-8  mr-[1em] '  />
          </Link>
            </div>
        }
        {/* <MobileSearch/> */}
        </>
        
       
    );
}
}
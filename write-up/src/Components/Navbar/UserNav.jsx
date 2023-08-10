import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline, IoIosNotifications, IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
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
export default function UserNav(){
  let socket
    let URL;
    const { user, showMobileSearch} = useSelector((state) => state)
    const [toggled, setToggled] = useState(true) 
    const [allRead, setAllRead] = useState(true) 
   const dispatch = useDispatch()
   const navigate = useNavigate()
     const helperRef   = useRef()
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            dispatch(actions.updateURL("https://inkup-api.onrender.com"))
            URL = "https://inkup-api.onrender.com"
             socket = io(URL)
          }else{
            
            dispatch(actions.updateURL("http://localhost:5000"))
            URL =  "http://localhost:5000" 
             socket = io(URL)
          }
          if(user == undefined || user == null){
            navigate('/login')
             
          }
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
      
      //  ( user == undefined || user.name == undefined) 
      //  ? <div className="flex lg:flex-row ">
        
      //       <Button additionalStyles=" hidden lg:block" to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
     
      //       <Button additionalStyles="" to="/signup" name="Create account" borderColor="border-pink-500" textColor=" text-pink-500"/>
        
      //       </div> :
             <div className="flex flex-row justify-around w-full p-[.5em] py-[1em] z-100 border-t bg-white fixed bottom-[0em]">
                
            <Link to="/" >
            <AiOutlineHome className="text-3xl mt-1 block lg:hidden"  />
            </Link>
                
            <Link to="/trends" >
            <VscFlame className="text-3xl mt-1 block lg:hidden"  />
            </Link>

            <Link to='/search'>
            <IoIosSearch onClick={handleMobileSearch}   className="lg:hidden text-3xl mt-[.125em]"/>  
            </Link>
        
           <Link to="/create">
            <IoIosAddCircleOutline className="text-3xl mt-1 block lg:hidden"/>
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
            {/* <div ref={helperRef} style={{zIndex: 10}} className="hidden dropdown  fixed left-12  mt-16 bg-white  flex-col  border gap-2 w-[17em] py-4 rounded-lg lg:right-32">
                <Link to='/profile' className=" block px-2 py-3 ml-4 font-[Maven] font-semibold  hover:bg-gray-100 hover:underlineflex flex-col gap-1"><div className="flex flex-row">
                {user.verified ? <HiBadgeCheck className="text-xl text-blue-500 mt-1"/> : ''} </div> <p>@{user.username}</p></Link>
                <p>{user.name}</p>
                <hr />
                <Link to='/Dashboard' className="block px-2  py-3 ml-4 font-[Maven] font-semibold  hover:bg-gray-100 hover:underline">Dashboard</Link>
                <Link to='/create' className="block px-2 py-3  ml-4 font-[Maven] font-semibold hover:bg-gray-100 hover:underline">Create Post</Link>
                <Link to='/readlater' className="block px-2 py-3  ml-4 font-[Maven] font-semibold hover:bg-gray-100 hover:underline">Read Later</Link>
                <Link to='/settings' className="block px-2 py-3  ml-4 font-[Maven] font-semibold hover:bg-gray-100 hover:underline">Settings</Link>
                <hr />
                <Link to='/logout'  className="block px-2 py-2  text-start ml-4 font-[Maven]  font-semibold hover:bg-gray-100 hover:underline">Logout</Link >
            </div>
            */}
          
           
            </div>
        }
        {/* <MobileSearch/> */}
        </>
        
       
    );
}
}
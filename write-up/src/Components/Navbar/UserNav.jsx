import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline, IoIosNotifications, IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import { VscBellDot } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import {  useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import axios from "axios";
export default function UserNav(){
   
    const { user} = useSelector((state) => state)
    const [toggled, setToggled] = useState(true) 
    const [allRead, setAllRead] = useState(true) 
    const {notifications} = useSelector(state => state)
    const dispatch = useDispatch()
    const [newNotification, setNewNotification] = useState(false)
     const helperRef   = useRef()
    useEffect(() => {
       setInterval(() => {
           pollNotifications()
       }, 300000);
       pollNotifications()
    })
    const pollNotifications = async() => {
     const oldNotificationsLength = notifications.length
   
     const newNotificationsLength = await( await axios.get('https://writeup-37ap.vercel.app/api/notifications/length',{headers:{Authorization: localStorage.getItem('token')}})).data.length
     if(newNotificationsLength > oldNotificationsLength) { 
        let newNotifications = await(await axios.get('https://writeup-37ap.vercel.app/api/notifications',{headers:{Authorization: localStorage.getItem('token')}})).data
        dispatch(actions.updateNotifications(newNotifications))

         setNewNotification(true)
         const result =  notifications.filter((notification) => {
            return notification.read == true
         })
       if(result.length == notifications.length) {
         setAllRead(true)
       }
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
   
    return(
        <>
       {
      
       ( user == undefined || user.name == undefined) 
       ? <div className="flex lg:flex-row ">
        
            <Button additionalStyles=" hidden lg:block" to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
     
            <Button to="/signup" name="Create an account" borderColor="border-pink-500" textColor=" text-pink-500"/>
        
            </div> :
             <div className="profile flex flex-row gap-2.5 mt-4 lg:ml-[64em]">
            
            <Button to="/create" additionalStyles="hidden lg:block" name="Create Posts" borderColor="border-pink-500 -mt-2" textColor="text-pink-500"/>
            <IoIosSearch    className="lg:hidden text-4xl mt-[.125em]"/>  
        
           <Link to="/create">
            <IoIosAddCircleOutline className="text-4xl mt-1 block lg:hidden"/>
           </Link>
            <Link to="/notifications">
           {
            newNotification == true && allRead == false ?
            <VscBellDot className="text-4xl mt-0" />:
            <IoIosNotificationsOutline className="text-4xl mt-0"/>
        }
            
            </Link>
            <button onClick={toggleHelper}>

            <img src={user.public_picture} alt={user.name} className='rounded-full h-12 w-12 -mt-4 mr-[1em] '  />
            </button >
            <div ref={helperRef} className="hidden dropdown fixed left-32  mt-16 bg-white  flex-col  border gap-2 w-[17em] py-4 rounded-lg lg:right-32">
                <Link to='/profile' className=" block px-2 py-3 ml-4 font-[mulish] font-semibold  hover:bg-gray-100 hover:underlineflex flex-col gap-1"><p>{user.name}</p> <p>@{user.username}</p></Link>
                <hr />
                <Link to='/Dashboard' className="block px-2  py-3 ml-4 font-[mulish] font-semibold  hover:bg-gray-100 hover:underline">Dashboard</Link>
                <Link to='/create' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Create Post</Link>
                <Link to='/readlater' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Read Later</Link>
                <Link to='/settings' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Settings</Link>
                <hr />
                <Link to='/logout'  className="block px-2 py-2  text-start ml-4 font-[mulish]  font-semibold hover:bg-gray-100 hover:underline">Logout</Link >
            </div>
           
          
           
            </div>
        }
        </>
        
       
    );
}
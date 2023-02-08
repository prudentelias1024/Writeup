import { useRef, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Contexts/userContext";
import Button from "./Button";
import { useSelector } from "react-redux";

export default function UserNav(){

    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
   const [toggled, setToggled] = useState(true) 
    const helperRef   = useRef()
     const toggleHelper = () => {
         setToggled(!toggled)
        if (toggled == false) {
            helperRef.current.className = 'hidden'
        }
        if (toggled == true) {
            helperRef.current.className = "dropdown fixed right-32 mt-16 bg-white flex flex-col  border gap-2 w-[17em] py-4 rounded-lg"
        }
     }
   
    return(
        <>
       {
      
       ( user == undefined || user.name == undefined) 
       ? <div className="">
        
            <Button to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
     
            <Button to="/signup" name="Create an account" borderColor="border-pink-500" textColor="text-pink-500"/>
            </div> : <div className="profile flex flex-row gap-5 mt-2 ml-[50em]">
            
            <Button to="/create" name="Create Posts" borderColor="border-pink-500 -mt-2" textColor="text-pink-500"/>
            
            <Link to="/notifications">
            <IoIosNotificationsOutline className="text-4xl mt-1"/>
            </Link>
            <button onClick={toggleHelper}>

            <img src={user.public_picture} alt={user.name} className='rounded-full h-12 w-12 -mt-2'  />
            </button >
            <div ref={helperRef} className="hidden dropdown fixed right-32 mt-16 bg-white  flex-col  border gap-2 w-[17em] py-4 rounded-lg">
                <Link to='/profile' className=" block px-2 py-3 ml-4 font-[mulish] font-semibold  hover:bg-gray-100 hover:underlineflex flex-col gap-1"><p>{user.name}</p> <p>@{user.username}</p></Link>
                <hr />
                <Link to='/Dashboard' className="block px-2  py-3 ml-4 font-[mulish] font-semibold  hover:bg-gray-100 hover:underline">Dashboard</Link>
                <Link to='/create' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Create Post</Link>
                <Link to='/' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Read Later</Link>
                <Link to='/settings' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Settings</Link>
                <hr />
                <Link to='/logout'  className="block px-2 py-2  text-start ml-4 font-[mulish]  font-semibold hover:bg-gray-100 hover:underline">Logout</Link >
            </div>
           
          
           
            </div>
        }
        </>
        
       
    );
}
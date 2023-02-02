import { useRef, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Contexts/userContext";
import Button from "./Button";

export default function UserNav(){
   const {user} = useContext(userContext)
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
     const logout = () => {
        localStorage.removeItem("token")
        navigate('/')
     }
    return(
        <>
       {
      
       ( user == undefined) 
       ? <div className="">
        
            <Button to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
     
            <Button to="/signup" name="Create an account" borderColor="border-pink-500" textColor="text-pink-500"/>
            </div> : <div className="profile flex flex-row gap-5 mt-2 ml-[50em]">
            
            <Button to="/create" name="Create Posts" borderColor="border-pink-500 -mt-2" textColor="text-pink-500"/>
            <IoIosNotifications className="text-4xl mt-1"/>
            <button onClick={toggleHelper}>

            <img src={user.public_picture} alt={user.name} className='rounded-full h-12 w-12 -mt-2'  />
            </button >
            <div ref={helperRef} className="hidden dropdown fixed right-32 mt-16 bg-white  flex-col  border gap-2 w-[17em] py-4 rounded-lg">
                <Link to='/' className=" block px-2 py-3 ml-4 font-[mulish] font-semibold  hover:bg-gray-100 hover:underlineflex flex-col gap-1"><p>{user.name}</p> <p>@{user.username}</p></Link>
                <hr />
                <Link to='/Dashboard' className="block px-2  py-3 ml-4 font-[mulish] font-semibold  hover:bg-gray-100 hover:underline">Dashboard</Link>
                <Link to='/' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Create Post</Link>
                <Link to='/' className="block px-2 py-3  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Reading List</Link>
                <hr />
                <Link onClick={logout} to='/' className="block px-2 py-2  ml-4 font-[mulish] font-semibold hover:bg-gray-100 hover:underline">Logout</Link>
            </div>
           
          
           
            </div>
        }
        </>
        
       
    );
}
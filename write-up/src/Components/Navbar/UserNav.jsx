import { useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import { userContext } from "../../Contexts/userContext";
import Button from "./Button";

export default function UserNav({user}){
     user = useContext(userContext)
    console.log(user);
    return(
        <>
       {
      
       ( user.user == undefined) 
       ? <div className="">
        
            <Button to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
     
            <Button to="/signup" name="Create an account" borderColor="border-pink-500" textColor="text-pink-500"/>
            </div> : <div className="profile flex flex-row gap-5 mt-2 ml-[50em]">
            
            <Button to="/create" name="Create Posts" borderColor="border-pink-500 -mt-2" textColor="text-pink-500"/>
            <IoIosNotifications className="text-4xl mt-1"/>
            <img src={user.user.public_picture} alt={user.user.name} className='rounded-full h-14 w-14 -mt-2'  />
          
           
            </div>
        }
        </>
        
       
    );
}
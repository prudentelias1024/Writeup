import SideNavLink from "./Sidenav/SideNavLink";
import { AiOutlineHome, AiOutlineBulb } from "react-icons/ai";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaHashtag } from "react-icons/fa";
import TrendingTags from "./Sidenav/TrendingTags";
import Button from "./Navbar/Button";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export default function SideNavBar(){
   const {navStatus} =  useSelector((state) => state)
   console.log(navStatus)
   const navRef = useRef()
  useEffect(
    () => {
        if (navStatus == true) {
            navRef.current.classList.remove("hidden")
         
         } else {
            navRef.current.classList.add("hidden")
          
     
         }
    },[navStatus]
  )
    
    return(
        <div ref={navRef} className=" lg:bg-[#f6f6f6] hidden overflow-y-auto  pt-[8em]  text-center  z-30  pl-[em] fixed bg-white lg:flex lg:flex-col lg:gap-4 lg:ml-80 lg:mt-32 lg:p-2 lg:h-[60em] lg:w-[15em] lg:relative ">
            <div className=" border pt-3 -ml-9 lg:hidden ">
            <p className="font-[Pacifico] text-3xl text-center ">Inkup Community</p>
            <p className="font[Mulish] -mt-4 text-lg leading-9 tracking-wide p-6 text-center">We allow content creators, developers and bloggers content to share their contents and grow in our community</p>
            <Button to="/signup" name="Create an account" borderColor="border-pink-500" textColor="text-pink-500"/>
             <Button additionalStyles="ml-[1em] block lg:hidden" to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
            
            </div>
                
        <div className="flex  flex-col gap-3">

            <SideNavLink link="/" additionalStyles="m-auto mt-6"  icon={<AiOutlineHome className="text-2xl"/>} name="Home"/>
            <SideNavLink link='/tags' additionalStyles="m-auto" icon={<HiOutlineHashtag className="text-2xl"/>} name=" Tags"/>
            <SideNavLink link='/' additionalStyles="m-auto mb-[5em]" icon={<AiOutlineBulb className="text-2xl"/>} name="FAQ"/>
  
        </div>
            <TrendingTags/>
            
        </div>
    );
}
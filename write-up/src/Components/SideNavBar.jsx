import SideNavLink from "./Sidenav/SideNavLink";
import { AiOutlineHome, AiOutlineBulb, AiFillFire } from "react-icons/ai";
import { FcHome, FcQuestions } from "react-icons/fc";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaHashtag, FaTwitter } from "react-icons/fa";
import TrendingTags from "./Sidenav/TrendingTags";
import Button from "./Navbar/Button";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
        <div ref={navRef} className=" lg:bg-[#f6f6f6] hidden overflow-y-auto  pt-[8em]  text-center  z-30  pl-[em] fixed bg-white lg:flex lg:flex-col lg:gap-4 lg:ml-321 maxlg:ml-80 lg:mt-32 lg:p-2 lg:h-[60em] lg:w-[15em] lg:relative ">
            <div className=" border pt-3 -ml-9 lg:hidden ">
            <p className="font-[Pacifico] text-3xl text-center ">Inkup </p>
            <p className="font-[Outfit]   text-lg leading-9 tracking-wide p-6 m-auto ml-[1em]">We allow content creators, developers and bloggers to share their contents and grow in our community</p>
          <div className="m-auto">
          <Button to="/signup" name="Create an account" borderColor="border-pink-500" textColor="text-pink-500"/>
             <Button additionalStyles="ml-[1em] block lg:hidden" to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
          </div>
            
            </div>
                
        <div className="flex  flex-col gap-3">

            <SideNavLink link="/" additionalStyles="m-auto mt-6"  icon={<FcHome className="text-2xl"/>} name="Home"/>
            <SideNavLink link='/tags' additionalStyles="m-auto" icon={<AiFillFire className="text-2xl text-red-500"/>} name=" Tags"/>
            <SideNavLink link='/faq' additionalStyles="m-auto mb-[5em]" icon={<FcQuestions className="text-2xl"/>} name="FAQ"/>
          <div className="flex flex-row mt-[-5em] ml-[2em]  mb-[2em]">
          <a href="https://twitter.com/InkUp1024" target="_blank">
          <FaTwitter className="text-3xl text-sky-500" />
          </a>
          </div>
        </div>
            <TrendingTags/>
          
            
        </div>
    );
}
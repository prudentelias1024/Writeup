import Logo from "./Navbar/Logo";
import Posts from "./Posts";
import Search from "./Search/Search";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  actions } from "../store/index";
import { useSelector } from "react-redux";
import MobileNav from "./Navbar/mobileSearch";
import { useEffect } from "react";
export default function NavBar({searchWords}) {
  const dispatch =   useDispatch()

  const {navStatus, showMobileSearch} =  useSelector((state) => state)
  useEffect(() => {
      console.log(showMobileSearch)
  }, [showMobileSearch]);
 return(
    <div className="w-full gap-[1em] lg:gap-[0em]  pl-[1em] md:justify-around lg:justify-around flex flex-row z-[4em]  bg-[#fff] border lg:pt-4 lg:pb-4 lg:pl-[12em]">
    <div className="flex flex-row  ">
    {/* <RxHamburgerMenu onClick={() => {dispatch(actions.updateMobileNavStatus(!navStatus))}} className="text-4xl lg:-ml-4 mt-[.5em] lg:hidden" /> */}
  
    <Logo />
        </div>
  {/* <Search  content={searchWords}/> */}
    </div>
 );

}
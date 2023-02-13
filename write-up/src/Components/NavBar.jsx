import Logo from "./Navbar/Logo";
import Posts from "./Posts";
import Search from "./Navbar/Search";
import UserNav from "./Navbar/UserNav";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  actions } from "../store/index";
import { useSelector } from "react-redux";
import MobileNav from "./Navbar/mobileNav";
import { useEffect } from "react";
export default function NavBar() {
  const dispatch =   useDispatch()

  const {navStatus, showMobileSearch} =  useSelector((state) => state)
  useEffect(() => {
      console.log(showMobileSearch)
  }, [showMobileSearch]);
 return(
    <div className=" w-full justify-between lg:justify-around flex flex-row z-50 fixed bg-[#fff] border lg:pt-4 lg:pb-4">
    <div className="flex flex-row m-auto ">
    <RxHamburgerMenu onClick={() => {dispatch(actions.updateMobileNavStatus(!navStatus))}} className="text-4xl -ml-4 mt-[.5em] lg:hidden" />
    <Logo />
       {/* <MobileNav /> */}
        </div>
  <Search  
   />
    <UserNav  />
    </div>
 );

}
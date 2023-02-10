import Logo from "./Navbar/Logo";
import Posts from "./Posts";
import Search from "./Navbar/Search";
import UserNav from "./Navbar/UserNav";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  actions } from "../store/index";
import { useSelector } from "react-redux";
export default function NavBar() {
  const dispatch =   useDispatch()

  
  const {navStatus} =  useSelector((state) => state)
  console.log(navStatus)
 return(
    <div className=" w-full justify-between lg:justify-around flex flex-row z-50 fixed bg-[#fff] border lg:pt-4 lg:pb-4">
    <div className="flex flex-row m-auto ">
    <RxHamburgerMenu onClick={() => {dispatch(actions.updateMobileNavStatus(!navStatus))}} className="text-4xl -ml-4 mt-[.5em] lg:hidden" />
    <Logo />
    </div>
  <Search   />
    <UserNav  />
    </div>
 );

}
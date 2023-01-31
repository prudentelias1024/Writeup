import Logo from "./Navbar/Logo";
import Posts from "./Posts";
import Search from "./Navbar/Search";
import UserNav from "./Navbar/UserNav";
import { userContext } from "../Contexts/userContext";

import { useContext } from "react";

export default function NavBar() {
  const user = useContext(userContext)
 
  
 return(
    <div className="flex flex-row justify-around z-50 fixed w-full  bg-white pt-4 pb-4">
    <div className="flex flex-row -ml-20">
    
    <Logo/>
  <Search   />
    </div>
    <UserNav user={user} />
    </div>
 );

}
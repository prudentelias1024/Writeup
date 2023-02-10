import Logo from "./Navbar/Logo";
import Posts from "./Posts";
import Search from "./Navbar/Search";
import UserNav from "./Navbar/UserNav";

export default function NavBar() {
 return(
    <div className=" w-full gap-1 lg:justify-around flex flex-row z-50 fixed bg-white lg:pt-4 lg:pb-4">
    <div className="flex flex-row -ml-20 sm">
    
    <Logo />
  <Search   />
    </div>
    <UserNav  />
    </div>
 );

}
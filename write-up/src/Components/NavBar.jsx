import Logo from "./Navbar/Logo";
import Posts from "./Posts";
import Search from "./Navbar/Search";
import UserNav from "./Navbar/UserNav";

export default function NavBar({showSearchBar,showAuthAction}) {
 return(
    <div className="flex flex-row justify-around z-50 fixed w-full  bg-white pt-4 pb-4">
    <div className="flex flex-row -ml-20">
    
    <Logo/>
  <Search   hidden={showSearchBar}/>
    </div>
    <UserNav hidden={showAuthAction}/>
    </div>
 );

}
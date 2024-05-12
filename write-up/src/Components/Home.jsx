import axios from 'axios';
import { useEffect } from 'react';
import LoginModal from './loginModal';
import NavBar from './NavBar';
import UserNav from './Navbar/UserNav';
import Posts from './Posts';
import SideNavBar from './SideNavBar';
import TagTopics from './TagTopics';
import Podcast from './Podcast'
import { useSelector } from 'react-redux';

export default function Home(){
   const {user} = useSelector(state => state)
    useEffect(() => {
     
   },[<UserNav/>, <SideNavBar/>])
    return(
        <>
         
        {/* <NavBar /> */}
        <div className=' flex flex-row gap-3 w-full overflow-x-hidden lg:overflow-x-hidden lg:pl-[10em] '>
        <UserNav  />
          
        
        {/* <Podcast/> */}
       <div className="ml-[10em] w-full">
        
     <Posts/>
       </div>
  
     {/* <TagTopics/> */}
</div>
        <div className="lg:hidden">
     <UserNav  />
        </div>
       
        </>
    );
}
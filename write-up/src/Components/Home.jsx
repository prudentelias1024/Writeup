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
         
        <NavBar />
        <div className=' flex flex-row gap-3 overflow-x-hidden lg:overflow-x-hidden lg:ml-4'>
          
        <SideNavBar/>
        
        {/* <Podcast/> */}
       
     <Posts/>
  
     {/* <TagTopics/> */}
</div>
     <UserNav  />
       
        </>
    );
}
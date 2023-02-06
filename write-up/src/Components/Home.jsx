import axios from 'axios';
import { useEffect } from 'react';
import NavBar from './NavBar';
import Posts from './Posts';
import SideNavBar from './SideNavBar';
import TagTopics from './TagTopics';
import { actions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
export default function Home(){
   
    return(
        <>
        <NavBar />
        <div className='flex flex-row gap-2 ml-4'>
        <SideNavBar/>
     <Posts/>
     <TagTopics/>
</div>
        </>
    );
}
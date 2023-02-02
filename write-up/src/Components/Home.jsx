import axios from 'axios';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { userContext } from '../Contexts/userContext';
import NavBar from './NavBar';
import Posts from './Posts';
import SideNavBar from './SideNavBar';
import TagTopics from './TagTopics';

export default function Home(){
    const {setUser,user} = useContext(userContext);
    const loadUser = async() => {
        setUser(await (await axios.get('http://localhost:5000/api/user',{headers: {Authorization: localStorage.getItem('token')}}
        )).data);
    }
    
    useEffect(() => {
    loadUser() 
    }
    , []);
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
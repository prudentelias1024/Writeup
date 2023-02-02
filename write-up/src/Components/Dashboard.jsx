import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { userContext } from '../Contexts/userContext';
import DetailsCard from './Dashboard/DetailsCard';
import  NavBar  from "./NavBar";
const Dashboard = () => {
    const {setUser,user} = useContext(userContext);
    const loadUser = async() => {
        setUser(await (await axios.get('http://localhost:5000/api/user',{headers: {Authorization: localStorage.getItem('token')}}
        )).data);
    }
    
    useEffect(() => {
    loadUser() 
    }
    , []);
    return (
        <>
            <NavBar/>
            <div className="top-32 relative">
               <p className="flex flex-col font-[Montserrat] font-semibold ml-44 text-4xl">Dashboard</p>
               <div className="flex flex-row pt-[4em] gap-6  pl-[10em]">
                <DetailsCard/>
                <DetailsCard/>
                <DetailsCard/>
                <DetailsCard/>
               </div>
            </div>
        </>
    );
}

export default Dashboard;

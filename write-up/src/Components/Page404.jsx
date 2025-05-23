import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const Page404 = () => {
    return (
        <div className='flex flex-col bg-white  dark:bg-[#000] dark:text-white '>
            <NavBar/>
    
        <div className="404">
            <p className="text-[8em] lg:text-[15em] font-bold text-center font-[Montserrat] mt-44 ">404</p>
            <p className="text-[2em] lg:text-[3em] font-bold text-center font-[Outfit] -mt-5">Page Not Found</p>
            <p className=" text-[1em] lg:text-[1.5em] font-medium text-center font-[Outfit] mt-12 mb-[14em]  ">We couldn't get the page you're looking for. Go to <Link className='text-blue-500' to="/">Homepage</Link> </p>
            
        </div>
        </div>
    );
}

export default Page404;

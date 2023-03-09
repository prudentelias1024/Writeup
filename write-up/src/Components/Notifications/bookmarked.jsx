import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";
const Bookmarked = () => {
    return (
        <div>
            <div className='flex flex-col lg:flex-row lg:gap-3 w-[115%] lg:w-1/2 lg:m-auto bg-white p-[1em] ml-auto justify-between lg:pl-[7em] hover:scale-110'>
                <p className='lg:ml-[-6em] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg mb-[1em]'>New </p>
        <img src={img} className='h-[3em] w-[3em] rounded-full m-auto lg:m-0 ' />
       <p className='relative left-[.5em] m-auto lg:left-[-1.6em] lg:top-3  -top-8 text-gray-600 text-3xl'>📌</p>
        <div className='m-auto lg:-ml-[2.5em] lg:mt-[.25em] w-[85%] font-[Mulish] mt-[-1.5em]'>

        
         <p className='font-[Mulish] text-xl m-auto lg:ml-[-.5em] lg:mt-[.5em]'><Link to='/' className='font-bold font-[Mulish]'>Jace  </Link> bookmarked   
         <Link className='text-blue-600 font-bold' to="/"> Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
         </p> 
        
        </div>
        <p className="font-[Mulish] text-gray-400 my-auto m-auto lg:ml-[-3em] font-bold">2 mins ago</p>
         
  </div>
        </div>
    );
}

export default Bookmarked;

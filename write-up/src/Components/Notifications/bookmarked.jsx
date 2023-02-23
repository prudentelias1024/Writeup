import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";
const Bookmarked = () => {
    return (
        <div>
            <div className='flex flex-row gap-3 bg-white p-[1em] ml-0 justify-between'>
        <img src={img} className='h-[3em] w-[3em] rounded-full' />
       <p className='relative left-[-1.4em] top-6 text-gray-600 text-3xl'>📌</p>
        <div className='-ml-[2.5em] w-[85%] font-[Mulish]'>

        
         <p><Link to='/' className='font-bold font-[Mulish]'>Jace  </Link> bookmarked   
         <Link className='text-blue-600 font-bold' to="/"> Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
         </p> 
         
        </div>
  </div>
        </div>
    );
}

export default Bookmarked;

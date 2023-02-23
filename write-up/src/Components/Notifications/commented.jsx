import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";

const Commented = () => {
    return (
        <div>
            <div className='flex flex-row gap-3 bg-white p-[1em] ml-0 justify-between'>
        <img src={img} className='h-[3em] w-[3em] rounded-full' />
        <p className='relative left-[-1.6em] top-3 text-gray-600 text-3xl'>✍</p>
        <div className='-ml-[2.5em] w-[85%] font-[Mulish]'>

        
         <p><Link to='/' className='font-bold font-[Mulish]'>Jace  </Link> commented  <Link className='text-blue-600 font-bold' to="/">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link></p> 
         
        </div>
  </div>
        </div>
    );
}

export default Commented;

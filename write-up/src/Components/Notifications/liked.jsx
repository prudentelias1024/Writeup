import React from 'react';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";

const Liked = () => {
    return (
        <div>
            <div className='flex flex-row gap-3 bg-white p-[1em] ml-0 justify-between'>
        <img src={img} className='h-[3em] w-[3em] rounded-full' />
        <p className=" relative left-[-1.5em] top-4 text-red-600 text-3xl">💖</p>
        <div className='-ml-[2.5em] w-[85%] font-[Mulish]'>

        
         <p><Link to='/' className='font-bold font-[Mulish]'>Jace  </Link> liked Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> 
         
        </div>
  </div>
        </div>
    );
}

export default Liked;

import React from 'react';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";
const Followed = () => {
    return (
        <div className='flex flex-row gap-3 bg-white p-[1em] ml-0 justify-between'>
        <img src={img} className='h-[3em] w-[3em] rounded-full' />
        <div className='text-left w-[50%] font-[Mulish]'>

        <Link to='/' className='font-bold'>Lorem  ipsum</Link>
         <p>followed you !</p>
        </div>
         <button className='border-2 shadow-md border-gray-500 bg-white p-2 font-[Mulish] rounded-md font-bol'>Follow Back</button>
        </div>
    );
}

export default Followed;

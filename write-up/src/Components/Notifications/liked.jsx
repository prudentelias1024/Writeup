import React from 'react';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";

const Liked = () => {
    return (
        <div>
            <div className='flex flex-col lg:flex-row gap-3 m-auto w-[115%] lg:w-1/2 lg:m-auto bg-white p-[1em]  justify-between lg:pl-[7em] hover:scale-110'>
        <p className='lg:ml-[-6em] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg'>New </p>
        <img src={img} className='h-[3em] w-[3em] m-auto lg:m-0 rounded-full' />
        
        <p className=" relative m-auto  left-[.7em] lg:left-[-1.5em] lg:top-3 -top-10 text-red-600 text-3xl">💖</p>
        <div className=' w-[85%] font-[Mulish] m-auto lg:ml-[-2em]'>

        
         <p className=' text-xl font-[Mulish] -mt-[1.6em] lg:ml-[-.5em] lg:mt-[.5em]'><Link to='/' className='font-bold font-[Mulish] text-xl'>Prudent Elias  </Link> liked <Link className='text-blue-600 font-bold text-xl' to="/">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link> </p> 
         
        </div>
        <p className=" font-[Mulish] relative top-0 text-gray-400 my-auto m-auto lg:ml-[-3em] font-bold">2 mins ago</p>
         
  </div>
        </div>
    );
}

export default Liked;

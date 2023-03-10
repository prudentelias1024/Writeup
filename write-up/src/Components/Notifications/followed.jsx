import React from 'react';
import { Link } from 'react-router-dom';
import   img  from "../../mock.jpg";
const Followed = ({notification}) => {
    return (
        <div className='flex flex-col lg:flex-row gap-3 w-[115%] lg:w-[57.6%] lg:m-auto bg-white p-[1em] ml-0 justify-between lg:px-[1em] hover:scale-110'>
          <p className=' bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg lg:ml-[0em]'>Unread </p>
            {/* <p className='lg:ml-[0em] bg-red-200 text-red-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg'>Read </p> */}
        <img src={img} className='h-[3em] w-[3em] rounded-full m-auto lg:ml-[2em]' />
          <div className='text-left w-[50%] font-[Mulish] m-auto  lg:ml-[7em] lg:mt-2 lg:flex lg:flex-row '>

        <Link to='/' className='font-bold text-xl lg:text-xl lg:ml-[-5em]'>Lorem  ipsum</Link>
         <p className='lg:ml-2  text-xl'>followed you !</p>
        </div>
         {/* <button className='border-2 shadow-md border-gray-500 bg-white p-2 font-[Mulish] rounded-md font-bol'>Follow Back</button> */}
         <button className=' m-auto lg:ml-[1em] text-green-500 w-[7em] hover:border-green-500 hover:border p-2 font-[Mulish] rounded-md font-bold'>Follow</button>
         <p className="font-[Mulish] text-gray-400 m-auto lg:my-auto   font-bold">2 mins ago</p>
         
        </div>
    );
}

export default Followed;

import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        
        <div className='flex flex-col lg:flex-row gap-3 w-[115%] lg:w-[60%] lg:m-auto bg-white p-[1em] ml-0 justify-between hover:scale-110'>
            <p className='lg:ml-[0em] font-[Outfit] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg'>Unread </p>
            {/* <p className='lg:ml-[0em] font-[Outfit] bg-red-200 text-red-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg'>Read </p> */}
    <div className=' w-[85%] font-[Outfit] lg:m-auto font-semibold leading-8 mb-[1em]'>

    <p className='text-4xl text-center mb-[1em] mt-[1em] m-auto'>🎈🎉🎁</p>
     <p className='w-[95%] ml-[1em]'>Welcome to Inkup! 👏👏👏. We offer Writers of all kind, the platform to showcase their writing and mentorship ability to others </p> 
     
    </div>
    </div>
    );
}

export default Welcome;

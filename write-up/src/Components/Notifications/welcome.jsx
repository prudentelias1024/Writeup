import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        
        <div className=' lg:border-[.4px] flex flex-col dark:border-[#515151] lg:flex-row gap-3 w-[115%] lg:w-[60%]  bg-white dark:bg-[#000] dark:text-white p-[1em] ml-0 justify-between hover:scale-110'>
            
    <div className=' w-[85%] font-[Outfit] lg:m-auto font-semibold leading-8 mb-[1em]'>

    <p className='text-4xl text-center mb-[1em] mt-[1em] m-auto'>🎈🎉🎁</p>
     <p className='w-[95%] ml-[1em]'>Welcome to Inkup! 👏👏👏. We offer Writers of all kind, the platform to showcase their writing and mentorship ability to others </p> 
     
    </div>
    </div>
    );
}

export default Welcome;

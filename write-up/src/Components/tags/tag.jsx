import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tag = ({tag, count}) => {
   
    return (
        <div className='  border border-t-[1em] bg-white  border-t-red-500 p-[1em] lg:rounded-xl leading-8 '>
           <Link  className='hover:border-red-500 hover:border-2 hover:rounded-full hover:px-5 hover:text-red-500 hover:border-full p-3 font-[Mulish]' to={"/tag/"+tag}>#{tag}</Link> 
           
               <p className='font-[Mulish] ml-3 font-bold mt-2'>{count} Posts Published</p> 
           <button className='text-red-500 rounded-full px-6 border-2 ml-3 mt-[1.5em] border-red-500 mb-4'>Follow</button>
        </div>
    );
}

export default Tag;

import React from 'react';

const Poll = () => {
    return (
        <div className='poll w-full border bg-white font-[Outfit] rounded-md'>

            <div className='poll_text text-xl p-[1em] leading-8'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum perspiciatis nam, aliquam unde suscipit asperiores blanditiis ipsa dignissimos placeat porro cumque ad rem explicabo repudiandae sint vel assumenda exercitationem temporibus!
            </div>
            <div className='h-[3.25em] cursor-pointer hover:scale-110 '>
            <div className="poll_one border py-[.75em] px-[1em] z-1 bg-white flex flex-row justify-between">
                
                <p className='option_one text-xl text-[#333] z-10'>One</p>
                <p className='percentage  mr-[1em] z-10'>0%</p>
                
            </div>
            <div className='bg-[#f2f2f2]  w-[10%] relative top-[-3.25em] z-0 py-[.85em] px-[1em] '>
                    &nbsp;
                </div>
            </div>
           
             
                
        
       
        </div>
    );
}

export default Poll;

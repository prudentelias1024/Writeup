import React from 'react';

const Poll = () => {
    return (
        <div className='poll w-full border bg-white font-[Outfit] '>

            <div className='poll_text text-xl p-[1em] leading-8'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum perspiciatis nam, aliquam unde suscipit asperiores blanditiis ipsa dignissimos placeat porro cumque ad rem explicabo repudiandae sint vel assumenda exercitationem temporibus!
            </div>
            <div className="poll_one border py-[.75em] px-[.25em]  cursor-pointer hover:scale-110 bg-white flex flex-row justify-between">
                
                <p className='option_one text-xl text-[#333] z-10'>One</p>
                <p className='percentage  mr-[1em] z-10'>0%</p>
            </div>
            <div className="poll_two border py-[.75em] px-[.25em] cursor-pointer hover:scale-110 bg-white flex flex-row justify-between">
                
                <p className='option_two text-xl text-[#333]'>Two</p>
                <p className='percentage  mr-[1em]'>0%</p>
            </div>
            <div className="poll_three border py-[.75em] px-[.25em] cursor-pointer hover:scale-110 bg-white flex flex-row justify-between">
                <p className='option_three text-xl text-[#333]'>Three</p>
                <p className='percentage  mr-[1em]'>0%</p>
             
            </div>
            <div className="poll_four border py-[.75em] px-[.25em] cursor-pointer hover:scale-110 bg-white flex flex-row justify-between">
                <p className='option_four text-xl text-[#333]'>Four</p>
                <p className='percentage  mr-[1em]'>0%</p>
            </div>
        </div>
    );
}

export default Poll;

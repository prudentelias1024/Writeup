import React from 'react';

const ProfileSearchResult = ({user}) => {
    return (
        <div>
             <div className='profile mt-[2em] w-full lg:ml-[20em] pl-[1em]'>
            <div className='flex flex-col lg:flex-row gap-[1em]'>
                <img className='h-[4em] w-[4em]   rounded-full mr-[1em]' src={user.public_picture} alt="" />
                <div className="flex flex-col m-auto ">
                    <p className="font-[Mulish] w-fit text-xl font-bold">{user.name}</p>
                    <p className="font-[Mulish] w-full lg:w-3/4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. dam. Qui sequi neque quod molestias?</p>
                </div>
                <button className='font-[Mulish] bg-green-500 text-white lg:px-[1.5em] lg:w-[15em] h-[3em] rounded-full mt-[.5em] w-[90%]'>Follow</button>
            </div>
            
        </div>
        </div>
    );
}

export default ProfileSearchResult;

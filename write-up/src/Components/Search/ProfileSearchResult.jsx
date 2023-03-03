import React from 'react';

const ProfileSearchResult = ({user}) => {
    return (
        <div>
             <div className='profile mt-[2em] w-full ml-[20em]'>
            <div className='flex flex-row gap-[1em]'>
                <img className='h-[4em] w-[4em]  rounded-full mr-[1em]' src={user.public_picture} alt="" />
                <div className="flex flex-col m-auto ">
                    <p className="font-[Mulish] w-fit text-xl font-bold">{user.name}</p>
                    <p className="font-[Mulish] w-3/4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. dam. Qui sequi neque quod molestias?</p>
                </div>
                <button className='font-[Mulish] bg-green-500 text-white px-[1.5em] h-[3em] rounded-full mt-[.5em]'>Follow</button>
            </div>
            
        </div>
        </div>
    );
}

export default ProfileSearchResult;

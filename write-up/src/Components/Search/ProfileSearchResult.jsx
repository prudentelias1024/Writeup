import React from 'react';
import { useSelector } from 'react-redux';

const ProfileSearchResult = ({people}) => {
    const {user} = useSelector(state => state)
    return (
        <div>
             <div className='profile mt-[2em] w-full lg:ml-[20em] pl-[1em]'>
            <div className='flex flex-col lg:flex-row gap-[1em]'>
                <img className='h-[4em] w-[4em]   rounded-full mr-[1em]' src={people.public_picture} alt="" />
                <div className="flex flex-col  ">
                    <p className="font-[Mulish] w-fit mt-[.5em] text-xl font-bold">{people.name == user.name? 'You' : people.name}</p>
                    <p className="font-[Mulish] w-full lg:w-3/4">{people.bio}</p>
                </div>
                {people.username !== user.username?
                     user.following.length !== 0 &&  user.following.some((followee)=> followee.username == people.username) ?
                    
                      (<button className='font-[Mulish] m-auto text-red-500 px-[1em] mt-[0em] ml-[1em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-red-500 hover:border'>Unfollow</button>)
                      :  (<button  className='font-[Mulish] m-auto text-green-500 px-[1em] mt-[0em] ml-[1em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-green-500 hover:border'>Follow</button>)
                      : ''
                     }
             
            </div>
            
        </div>
        </div>
    );
}

export default ProfileSearchResult;

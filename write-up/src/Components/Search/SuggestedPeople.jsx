import React from 'react'
import Mock from '../../mock.jpg'
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';
import { useSelector } from 'react-redux';

export default function SuggestedPeople({people}) {
    const {user} = useSelector(state => state)

  return (
     <div className="flex flex-row justify-between border-b-[1px]">
     <div className="flex flex-row ml-[.5em]  py-[1em]">
        <img src={people.public_picture} className='h-9 w-9 rounded-full'/>
        <div className="profile ml-[.5em] ">
            <div className='flex flex-row'>
            <p className="name text-base font-[Sen] font-bold">{people.name}</p>
            {
                people.verified !== true ? '':
            <HiBadgeCheck className='text-base text-blue-500 relative top-[.25em]'/>
            }
            </div>
            <p className="username text-sm font-[Sen] -mt-[.45em]">@{people.username}</p>
        </div>
         
     </div>
        <button className='font-[Sen] w-fit h-fit  relative right-[0em] mr-[.5em] top-[1em] bg-blue-500 text-white text-sm px-[2.5em] rounded-md py-[.5em] border font-bold'>Follow</button>
        {/* {
            user.username !== people.username ?


        } */}
        {/* {user == null ?
              (<button  className='font-[Outfit] lg:m-auto text-white w-[100%] rounded-md mt-[-.5em] bg-green-500 lg:bg-white lg:text-green-500 px-[1em] lg:mt-[0em] lg:ml-[1em] lg:w-[7em] h-[3em] p-1.5 lg:rounded-full align-middle lg:hover:border-green-500 lg:hover:border'>Follow</button>) : 
                people.username !== user.username?
                     user.following.length !== 0 &&  user.following.some((followee)=> followee.username == people.username) ?
                    
                      (<button className='font-[Outfit] lg:m-auto text-white w-full rounded-md mt-[-.5em] bg-red-500 lg:bg-white lg:text-red-500 px-[1em] lg:mt-[0em] lg:ml-[1em] lg:w-[7em] h-[3em] p-1.5 lg:rounded-full align-middle lg:hover:border-red-500 lg:hover:border'>Unfollow</button>)
                      :  (<button  className='font-[Outfit] lg:m-auto text-white w-[100%] rounded-md mt-[-.5em] bg-green-500 lg:bg-white lg:text-green-500 px-[1em] lg:mt-[0em] lg:ml-[1em] lg:w-[7em] h-[3em] p-1.5 lg:rounded-full align-middle lg:hover:border-green-500 lg:hover:border'>Follow</button>)
                      : ''
                     }
              */}

     </div>

    )
}

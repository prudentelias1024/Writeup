import React from 'react';
import { useSelector } from 'react-redux';

const ProfileSearchResult = ({people}) => {
    const {user} = useSelector(state => state)
    return (
        <div>
             <div className='profile mt-[2em] w-full lg:ml-[20em] pl-[1em]'>
            <div className='flex flex-col lg:flex-row gap-[1em]'>
                <img className='h-[4em] w-[4em]  rounded-full mr-[1em]' src={people.public_picture} alt="" />
                <div className="flex flex-col  ">
                    <p className="font-[Mulish] w-fit mt-[.5em] text-xl font-bold">{user == null? 
                   people.name :
                    people.name == user.name? 'You' : people.name}</p>
                    <p className="font-[Mulish]  text-ellipsis h-[35px] w-[310px] overflow-hidden whitespace-nowrap  lg:w-3/4">{peeople.bio}</p>
                </div>
                {user == null ?
              (<button  className='font-[Mulish] lg:m-auto text-white w-[100%] rounded-md mt-[-.5em] bg-green-500 lg:bg-white lg:text-green-500 px-[1em] lg:mt-[0em] lg:ml-[1em] lg:w-[7em] h-[3em] p-1.5 lg:rounded-full align-middle lg:hover:border-green-500 lg:hover:border'>Follow</button>) : 
                people.username !== user.username?
                     user.following.length !== 0 &&  user.following.some((followee)=> followee.username == people.username) ?
                    
                      (<button className='font-[Mulish] lg:m-auto text-white w-full rounded-md mt-[-.5em] bg-red-500 lg:bg-white lg:text-red-500 px-[1em] lg:mt-[0em] lg:ml-[1em] lg:w-[7em] h-[3em] p-1.5 lg:rounded-full align-middle lg:hover:border-red-500 lg:hover:border'>Unfollow</button>)
                      :  (<button  className='font-[Mulish] lg:m-auto text-white w-[100%] rounded-md mt-[-.5em] bg-green-500 lg:bg-white lg:text-green-500 px-[1em] lg:mt-[0em] lg:ml-[1em] lg:w-[7em] h-[3em] p-1.5 lg:rounded-full align-middle lg:hover:border-green-500 lg:hover:border'>Follow</button>)
                      : ''
                     }
             
            </div>
            
        </div>
        </div>
    );
}

export default ProfileSearchResult;

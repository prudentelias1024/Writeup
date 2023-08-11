import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
const ProfileSearchResult = ({people}) => {
    const {user} = useSelector(state => state)
    return (
        <div>
             <div className='profile mt-[2em] w-full lg:ml-[20em] pl-[1em]'>
            <div className='flex flex-col lg:flex-row gap-[1em]'>
                <img className='h-[4em] w-[4em]  rounded-full mr-[1em]' src={people.public_picture} alt="" />
                <div className="flex flex-col  ">
                <Link to={"/"+people.username}  className="font-[Outfit] w-fit mt-[.5em] text-xl font-bold">{user == null? 
                   people.name :
                    people.name == user.name? 'You' : people.name}</Link>
                    <p className="font-[Outfit]  text-ellipsis h-[35px] w-[310px] overflow-hidden whitespace-nowrap  lg:w-3/4">{people.bio}</p>
                </div>
            </div>
            
        </div>
        </div>
    );
}

export default ProfileSearchResult;

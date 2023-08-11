import React, {useEffect} from 'react'
import Mock from '../../mock.jpg'
import { HiBadgeCheck, HiHashtag } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SuggestedPeople({people}) {
    const {user} = useSelector(state => state)
     let URL
    const follow = () => {
    //     axios.post(`${URL}/api/follow`,{author:user, user:people}, {headers: {'Authorization': localstorgs.getItem('token')}})
    //     axios.post(`${URL}/api/follow`,{author:user, user:people}, {headers: {'Authorization': localstorgs.getItem('token')}})
    }
    const unfollow = () => {
    //     axios.post(`${URL}/api/unfollow`,{author:user, user:people}, {headers: {'Authorization': localstorgs.getItem('token')}})
    //     axios.post(`${URL}/api/follow`,{author:user, user:people}, {headers: {'Authorization': localstorgs.getItem('token')}})
    }
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
    
        }, [])
    
  return (
     <Link to={'/'+user.username} className="flex flex-row justify-between border-b-[1px]">
     <div className="flex flex-row ml-[.5em]  py-[1em]">
        <img src={people.public_picture} className='h-9 w-9 rounded-full'/>
        <div className="profile ml-[.5em] flex flex-col gap-[.25em] ">
            <div className='flex flex-row'>
            <p className="name text-sm font-[Sen] font-bold">{user.name == people.name? 'You':people.name}</p>
            {
                people.verified !== true ? '':
            <HiBadgeCheck className='text-sm text-blue-500 relative top-[.25em]'/>
            }
            </div>
            <p className="username text-sm font-[Sen] text-[#9e9e9e] font-bold -mt-[.45em]">@{people.username}</p>
        </div>
         
     </div>
        {
            
/* user.following.length !==  0 && user.following.some((followee)=> people.username == followee.username) 
                           ? (<button  className='font-[Sen] m-auto text-green-500 px-[1em]  ml-[0em] mt-[-.751em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-green-500 hover:border'>Follow</button>)
                            : (<button className='font-[Sen] m-auto text-red-500 px-[1em]  ml-[0em] mt-[-1.75em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-red-500 hover:border'>Following</button>): '' :<button  className='font-[Sen] m-auto text-green-500 px-[1em] ml-[0em] mt-[-.75em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-green-500 hover:border'>Follow</button>
                     }*/

            user.username == people.username ? ' ' :
         user.following.length !== 0 && user.following.some((user) => user.username == people.username)?
        <button onClick={unfollow} className='font-[Sen] w-fit h-fit  relative right-[0em] mr-[.5em] top-[1em] bg-red-500 text-white text-sm px-[1.5em] rounded-md py-[.5em] border font-bold'>Unfollow</button>:
        <button onClick={follow} className='font-[Sen] w-fit h-fit  relative right-[0em] mr-[.5em] top-[1em] bg-blue-500 text-white text-sm px-[1.5em] rounded-md py-[.5em] border font-bold'>Follow</button>
        }
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

     </Link>

    )
}

import React, {useEffect, useState} from 'react'
import Header from '../header'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SuggestedPeople from '../Search/SuggestedPeople';
import { ThreeDots } from 'react-loader-spinner';
import Page404 from '../Page404';

export default function Following() {
    const {username} = useParams()
    const [userExists,setUserExists] = useState(true)
    const [following,setFollowing] = useState(null)
    const URL = useSelector(state => state.URL)
    useEffect(() => {
        getUser()
    },[])
    const getUser = async() => {

    
    const info = await (await axios.get(`${URL}/api/user/${username}`)).data;
    if (info == null){
      setUserExists(false)
    } else{
        setUserExists(true)
    }
     setFollowing(info.following)
 }
  if(userExists == true){
  return (
    <>
     <div className="w-full z-[4em] bg-[#fff] border-b-[1px] font-[Maven] text-xl font-bold mt-[.25em] p-[.5em] pl-[.75em] ">
       Following
    </div>
    <ul className='flex flex-row ml-[0.3em] justify-around lg:gap-[7em] w-full p-0 h-[2.6em] border-gray-300 border-b-[1px] mt-[1em] lg:ml-[20em]'>

    <Link to={`/${username}/followers`} className='block font-[Avenir] flex inline-flex h-min text-gray-500 cursor-pointer'>Followers
                </Link>
 
                <li  className='block font-[Avenir] underline decoration-blue-500 decoration-2 underline-offset-[1.5em] flex inline-flex h-min text-gray-500 cursor-pointer'>Following
                </li>
    </ul>
    {
       following ? following.map((user) => {
           return <SuggestedPeople people={user} key={user._id} />
        }): <>
                      <ThreeDots 
  height="80" 
  width="80" 
  radius="9"
  color="#4fa94d" 
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
 />      </>
    }
    </>
)
} else {
    return <Page404/>
}
 }

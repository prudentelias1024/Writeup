import React, { useEffect } from 'react'
import UserNav from '../Navbar/UserNav'
import Header from '../header'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Bookmarks() {
    const {URL} = useSelector(state=> state)
    const [bookmarks,setBookmarks] = useState([])
    const getBookmarks = async()=> {
        const res =  await (await axios.get(`${URL}/bookmarks`, {headers:{Authorization: localStorage.getItem('token')}})).data
        
        setBookmarks(res)

    }
    useEffect(() => {
        // getBookmarks()
    },[])
  return (
      <div className="lg:ml-[10em]">
        <UserNav/>
    <div className="flex flex-col ">
    <Header/>
     {bookmarks && bookmarks.length > 0 ?  '':
 <p className="font-[Sen] text-xl  h-full m-auto text-[#a2a2a2]">No Bookmarks</p>
     } 

    </div>
    </div>
  )
}

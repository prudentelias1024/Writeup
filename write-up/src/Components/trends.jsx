import React from 'react'
import NavBar from './NavBar'
import UserNav from './Navbar/UserNav'
import { Link } from 'react-router-dom'
import TrendLinks from './Trends/TrendLinks'

export default function Trends() {
  
  return (
    <>
    <div className='flex flex-col'>
        <p className='relative ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Trending🔥🔥</p>
        <TrendLinks tag={"react"} count={500}/>
        <TrendLinks tag={"poll"} count={50}/>
        <TrendLinks tag={"reels"} count={50}/>
    </div>
    <UserNav/>
    </>
  )
}

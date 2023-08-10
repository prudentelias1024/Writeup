import React from 'react'
import NavBar from './NavBar'
import UserNav from './Navbar/UserNav'
import { Link } from 'react-router-dom'
import TrendLinks from './Trends/TrendLinks'

export default function 
() {
  return (
    <>
        <NavBar />
    <div className='flex flex-col'>
        <p className='relative ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Trending🔥</p>
        <TrendLinks />
        <TrendLinks />
        <TrendLinks />
    </div>
    <UserNav/>
    </>
  )
}

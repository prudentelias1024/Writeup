import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Podcast from "./Podcast";
import SideNavBar from "./SideNavBar";
import axios from "axios";
import { useSelector } from "react-redux";


const Podcasts = () => {
  
   const podcasts = useSelector(state => state.podcasts)

    return (
        <>
        <NavBar />
        <div className=' flex flex-row gap-[3em] overflow-x-hidden lg:overflow-x-hidden lg:ml-4'>
          <div>

        <SideNavBar/>
          </div>
        <div className="podcasts  flex flex-col gap-[.25em]">
            <Podcast/>
            <Podcast/>
            <Podcast/>
        </div>

        
        </div>
        </>
    )
}

export default Podcasts;
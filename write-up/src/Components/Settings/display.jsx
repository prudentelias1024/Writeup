import React, { useState } from 'react'
import UserNav from '../Navbar/UserNav'
import DisplaySettings from './DisplaySettings'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../store'
import axios from 'axios'
export default function Display() {
  
    const {darkMode, lightMode, URL} = useSelector(state => state)
    const dispatch = useDispatch()
    
    const toggleMode = () => {
        const root = window.document.documentElement
        if (darkMode === true) {

            root.classList.add("light");
            root.classList.remove("dark");
           
           dispatch(actions.updateLightMode(true))
           dispatch(actions.updateDarkMode(false))
           axios.post(`${URL}/api/settings/display`,{mode: 'light'},  {headers: {Authorization: localStorage.getItem('token') }})

            // localStorage.setItem("theme", "light")
        } else {
            root.classList.add("dark");
            root.classList.remove("light");
            dispatch(actions.updateLightMode(false))
            dispatch(actions.updateDarkMode(true))
            axios.post(`${URL}/api/settings/display`,{mode: 'dark'},  {headers: {Authorization: localStorage.getItem('token') }})
          
            // localStorage.setItem("theme", "dark")
        }
    
    }
    return (
      <div className='lg:ml-[7em] w-full'>
         <UserNav />
         <div className='lg:flex lg:flex-row'>
         
         <div className='hidden lg:block lg:w-[35%] mr-[5em] '>
             <DisplaySettings additionalStyle={"lg:w-[70%]"}/>
             </div>
        
         <div classname='flex flex-col p-0 lg:pl-[1em] pl-[2em] mx-[3em] ml-[10em] w-[45%] ' >
    
                <p className='text-2xl mt-[1em] font-[Sen] font-bold ml-[1em]'>Display</p>
        
                <div className="flex flex-col lg:mt-[2em] mt-[1em] -ml-[0.5em] w-[100%]  lg:border border-t border-b border-[#515151]  p-[2em]">

                <p className='text-lg font-[Sen] font-bold'>Background</p>
             
             <div className='flex flex-col lg:flex-row  gap-[1EM] pt-[1em]'>

                 <div className="light_mode lg:w-[10em] w-[100%] border flex flex-row p-2 gap-2 bg-[#fff] border-blue-500 text-black rounded-md">

                     <input type="checkbox" checked={lightMode} onChange={toggleMode}/>
                     <p className='text-lg font-[Sen] font-bold'>Light mode</p>
                
                 </div>

                 
                 <div className="dark_mode lg:w-[10em] w-[100%] border flex flex-row p-2 gap-2 bg-[#000] text-white rounded-md">

                 <input type="checkbox" checked={darkMode} onChange={toggleMode}/>
                 <p className='text-lg font-[Sen] font-bold'>Dark mode</p>
                
                 </div>
                 </div>
                 
                 </div>
        
     </div>
     </div>


        </div>    


  )
}

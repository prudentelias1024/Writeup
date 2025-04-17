import React, { useState } from 'react'
import UserNav from '../Navbar/UserNav'
import DisplaySettings from './DisplaySettings'

export default function Display() {
    const [darkmode, setDarkMode] = useState(false)
    const [lightmode, setLightMode] = useState(true)
    const toggleMode = () => {
        const root = window.document.documentElement
        if (darkmode === true) {

            root.classList.add("light");
            root.classList.remove("dark");
    
            setLightMode(true)
            setDarkMode(false)
            localStorage.setItem("theme", "light")
        } else {
            root.classList.add("dark");
            root.classList.remove("light");
            
            setLightMode(false)
            setDarkMode(true)
            localStorage.setItem("theme", "dark")
        }
    
    }
    return (
      <>
           <UserNav className="lg:ml-[7em]"/>
     
        <div className='flex flex-row w-full'>
            
            <div className='hidden lg:block'>
                <DisplaySettings/>
                </div>
           
            <div classname='flex flex-col p-0 lg:pl-[1em] pl-[2em] lg:w-[80%] w-full mx-[3em]  '>
       
                   <p className='text-2xl mt-[1em] font-[Sen] font-bold ml-[1em]'>Display</p>
           
                   <div className="flex flex-col lg:mt-[2em] mt-[1em] -ml-[0.5em] w-[100%]  lg:border border-t border-b border-[#515151] p-[2em]">
                   <p className='text-lg font-[Sen] font-bold'>Background</p>
                
                <div className='flex flex-col lg:flex-row  gap-[1EM] pt-[1em]'>

                    <div className="light_mode lg:w-[10em] w-[100%] border flex flex-row p-2 gap-2 bg-[#fff] border-blue-500 text-black rounded-md">

                        <input type="checkbox" checked={lightmode} onChange={toggleMode}/>
                        <p className='text-lg font-[Sen] font-bold'>Light mode</p>
                   
                    </div>

                    
                    <div className="dark_mode lg:w-[10em] w-[100%] border flex flex-row p-2 gap-2 bg-[#000] text-white rounded-md">

                    <input type="checkbox" checked={darkmode} onChange={toggleMode}/>
                    <p className='text-lg font-[Sen] font-bold'>Dark mode</p>
                   
                    </div>
                    </div>
                    
                    </div>
           
        </div>
        </div>
        </>
    
  )
}

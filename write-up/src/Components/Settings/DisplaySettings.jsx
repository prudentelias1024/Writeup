import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export default function DisplaySettings() {
    const navigate = useNavigate()
    
    const sendToDisplay = () => {
        navigate('display')
    }

    const sendToEditProfile = () => {
        navigate('edit_profile')
    }
  return (
        <div className='flex flex-col lg:ml-[10em] pt-[1em] lg:w-[40%] w-full pl-[1em] lg:pl-0'>

        <p className='text-2xl font-[Sen] font-bold'>Settings</p>

        <div onClick={sendToEditProfile} className="flex flex-row mt-[2em] hover:bg-[#ebebeb] dark:hover:bg-[#121212] -ml-[0.5em] p-[0.5em] justify-between">
            <p className='text-xl font-medium w-[90%] cursor-pointer'> Edit your Profile</p>
            <FaAngleRight className='text-2xl text-[#71767B]
            mt-1 w-[10%]' />
        </div>


        <div className="flex flex-row mt-[1em] hover:bg-[#ebebeb] dark:hover:bg-[#0c0c0c] -ml-[0.5em] p-[0.5em] justify-between">
            <p className='text-xl font-medium w-[90%] cursor-pointer'> Your account</p>
            <FaAngleRight className='text-[#71767B] text-2xl mt-1 w-[10%]' />
        </div>

        <div onClick={sendToDisplay} className="flex flex-row mt-[1em] hover:bg-[#ebebeb] dark:hover:bg-[#0c0c0c]  -ml-[0.5em] p-[0.5em] justify-between">
            <p className='text-xl font-medium w-[90%] cursor-pointer'> Display </p>
            <FaAngleRight className='text-[#71767B] text-2xl mt-1 w-[10%]' />
        </div>

        <div className="flex flex-row mt-[1em] hover:bg-[#ebebeb] dark:hover:bg-[#0c0c0c]  -ml-[0.5em] p-[0.5em] justify-between">
            <p className='text-xl font-medium w-[90%] cursor-pointer'> Security </p>
            <FaAngleRight className='text-[#71767B] text-2xl mt-1 w-[10%]' />
        </div>

        <div className="flex flex-row mt-[1em] hover:bg-[#ebebeb] dark:hover:bg-[#0c0c0c] -ml-[0.5em] p-[0.5em] justify-between">
            <p className='text-xl font-medium w-[90%] cursor-pointer'> Privacy </p>
            <FaAngleRight className='text-[#71767B] text-2xl mt-1 w-[10%]' />
        </div>
      
    </div>
  )
}

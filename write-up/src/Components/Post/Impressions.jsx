import React from 'react'
import { IoIosStats } from 'react-icons/io'

export default function Impressions({count,additionalStyles}) {
     return(
        <div className="flex flex-row gap-3">
        <IoIosStats  className={additionalStyles ? additionalStyles + "text-xl":"text-xl text-green-500"}/> 
        <div className="flex gap-2">
        <p className="font-[Outfit] text-green-500 -mt-[.09em]">
            {
                count.length
            } 
        </p>
        <p className="hidden md:block lg:block font-[Outfit] -mt-[.09em]">Likes</p>
            </div>
    </div>
     )
}

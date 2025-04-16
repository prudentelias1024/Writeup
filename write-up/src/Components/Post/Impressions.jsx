import React from 'react'
import { IoIosStats } from 'react-icons/io'

export default function Impressions({count,additionalStyles}) {
     return(
        <div className="flex flex-row gap-1 text-[#a4a4a4]">
        <IoIosStats  className={additionalStyles ? additionalStyles + "text-base":"text-lg text-[#a4a4a4]"}/> 
        <div className="flex gap-1">
        <p className=" -mt-[.1em]">
            {
                count.length
            } 
        </p>
            </div>
    </div>
     )
}
    
import React from 'react'
import { IoIosStats } from 'react-icons/io'

export default function Impressions({count,additionalStyles}) {
     return(
        <div className="flex flex-row gap-3 text-[#a4a4a4]">
        <IoIosStats  className={additionalStyles ? additionalStyles + "text-xl":"text-xl text-[#a4a4a4]"}/> 
        <div className="flex gap-2">
        <p className="font-[Outfit]  -mt-[.09em]">
            {
                count.length
            } 
        </p>
            </div>
    </div>
     )
}

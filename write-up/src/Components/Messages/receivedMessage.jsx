import React from 'react'

export default function ReceivedMessage({text}) {
  return (
    <div className="sent relative right-auto max-w-[8em] ">
    <p className="font-[Sen] bg-gray-500  text-white h-fit w-fit p-[.5em] rounded-lg"> {text}</p>
   </div>

    
  )
}

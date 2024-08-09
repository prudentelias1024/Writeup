import React from 'react'

export default function SentMessage({text}) {
  return (
    <div className="received relative self-end max-w-[20em]  ">
    <p className="font-[Sen] bg-blue-500 text-white h-fit w-fit p-[.5em] rounded-lg">{text}</p>
   </div>
   
   )
}

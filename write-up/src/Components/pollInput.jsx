import React from 'react'

 const PollInput = ({index}) => {
  return (
    <div className='ml-[1em] mt-[1em] '>
   <input className='w-full border rounded-md h-[2em] font-[Outfit] mb-[0em] font-bold placeholder:font-bold border-2 ' placeholder={"Choice " + index} type="text" /> 
    </div>

    
  )
}

export default PollInput
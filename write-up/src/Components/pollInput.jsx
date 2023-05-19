import React from 'react'

 const PollInput = ({index, optionHandler, ref}) => {

  return (
    <div className='ml-[1em] mt-[1em] w-full'>
   <input ref={ref} onBlur={optionHandler} className='w-full border rounded-md h-[2em] font-[Outfit] mb-[0em] font-bold placeholder:font-bold border-2 ' placeholder={"Choice " + index} type="text" /> 
    </div>

    
  )
}

export default PollInput
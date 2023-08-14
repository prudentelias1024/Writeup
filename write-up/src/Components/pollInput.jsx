import React from 'react'

 const PollInput = ({index, optionHandler, ref}) => {

  return (
    <div className=' mt-[1em] w-full'>
   <input ref={ref} onBlur={optionHandler} className='w-full  rounded-md h-[2em] font-[Sen] mb-[0em] font-bold placeholder:font-bold border-2 ' placeholder={"Choice " + index} type="text" /> 
    </div>

    
  )
}

export default PollInput
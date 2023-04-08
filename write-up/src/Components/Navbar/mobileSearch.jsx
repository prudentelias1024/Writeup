import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MobileSearch = ({content}) => {
    const navigate =   useNavigate()
    const [searchWords, setSearchWords] = useState(null)
   const {showMobileSearch} = useSelector(state => state)
    const handleSearch = async(event) => {
    event.preventDefault()
   
    navigate(`/search?q${searchWords}`)
   }
  
   const handleSearchWords = (event) => {
    console.log(event.target.value)
    setSearchWords(event.target.value)
   }
    return(
        <>  {
            showMobileSearch == true?
       
         <form action="/search" className='absolute top-[4em] w-[95%] ml-[-0.5em]'>
             <input onChange={(event) => {handleSearchWords(event)}} onSubmit={(event) =>{handleSearch(event)}
             } className=" lg:hidden  h-12 w-[100%] mt-4 border rounded-md font-[Maven] pl-5 font-bold placeholder:font-[Maven] placeholder:font-bold placeholder:ml-5" value={searchWords == null ?content: searchWords } type="text" placeholder="Enter your search here" name="search"  />
             </form> : ''
}
        </>

    );
    
}

export default MobileSearch;

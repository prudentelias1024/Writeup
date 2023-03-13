import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search({content}) {
   
    const navigate =   useNavigate()
    const [searchWords, setSearchWords] = useState(null)
   
    const handleSearch = async(event) => {
    event.preventDefault()
   
    navigate(`/search?q${searchWords}`)
   }
  
   const handleSearchWords = (event) => {
    console.log(event.target.value)
    setSearchWords(event.target.value)
   }
    return(
        <>   <form action="/search">
             <input onChange={(event) => {handleSearchWords(event)}} onSubmit={(event) =>{handleSearch(event)}
             } className="hidden lg:ml-[-15em] lg:block h-12 w-auto mt-4 border rounded-3xl ml-12 font-[Mulish] pl-5 font-bold placeholder:font-[Mulish] placeholder:font-bold placeholder:ml-5" value={searchWords == null ?content: searchWords } type="text" placeholder="Enter your search here" name="search"  />
             </form>
        </>

    );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const navigate =   useNavigate()
    const [searchWords, setSearchWords] = useState("")
   const handleSearch = (event) => {
    event.preventDefault()
    console.log(searchWords)
    navigate({pathname: '/search',searchWords: `${searchWords}`})
   }
   const handleSearchWords = (event) => {
    console.log(event.target.value)
    setSearchWords(event.target.value)
   }
    return(
        <>   <form action="/search">
             <input onChange={(event) => {handleSearchWords(event)}} onSubmit={(event) =>{handleSearch(event)}
             } className="hidden lg:block h-12 w-auto mt-4 border rounded-3xl ml-12 font-[Mulish] pl-5 font-bold placeholder:font-[Mulish] placeholder:font-bold placeholder:ml-5" type="text" placeholder="  Search for Articles" name="search"  />
             </form>
        </>

    );
}


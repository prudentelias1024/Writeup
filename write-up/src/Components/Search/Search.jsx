import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserNav from "../Navbar/UserNav";
import {BsFilter} from "react-icons/bs"
import SearchResults from "./SearchResults";
import SuggestedPeople from "./SuggestedPeople";
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
        <>
        <div className="flex flex-col gap-[.5em] mt-[.5em] bg-white">    
           <p className="text-2xl font-[Avenir] mx-[.5em] my-[.25em] font-bold ">Search</p> 
            <form action="/search/results" className="flex flex-row">
             <input onChange={(event) => {handleSearchWords(event)}} onSubmit={(event) =>{handleSearch(event)}
             } className=" lg:ml-[0em] w-[95%] mx-[2%] lg:block h-10 bg-[#f6f6f6]  border rounded-md  font-[Maven] pl-5 font-bold placeholder:font-[Sen] placeholder:font-semibold placeholder:p-[1em] placeholder:text-sm placeholder:ml-5" value={searchWords == null ?content: searchWords } type="text" placeholder="Enter your search here" name="search"  />
             <Link to='results'>
             <BsFilter className="lg:hidden text-3xl mt-[.125em] mr-[.4em]"/>
             </Link>
             </form>
             <div >
             <SuggestedPeople/>

             </div>
        </div>
        <UserNav />
        </>

    );
}


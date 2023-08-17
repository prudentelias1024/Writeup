import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserNav from "../Navbar/UserNav";
import {BsFilter} from "react-icons/bs"
import SuggestedPeople from "./SuggestedPeople";
export default function Search({content}) {
    const [suggestedUser, setSuggestedUser] = useState([])
    let URL;
    const getUsers = async() => {
        let users = await (await axios.get(`${URL}/api/users`)).data
        setSuggestedUser(users)
       }
    const navigate =   useNavigate()
    const [searchWords, setSearchWords] = useState(null)
   
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
        getUsers()
      
    }, [])
    
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
                {
                    suggestedUser?
                    suggestedUser.map((user) => {
                       return( <SuggestedPeople key={user.id} people={user}/>)

                    }): ''
                }

             </div>
        </div>
        <UserNav />
        </>

    );
}


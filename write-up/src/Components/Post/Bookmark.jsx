import { FaRegBookmark } from "react-icons/fa";
export function Bookmark(){
    return(
        <div className="flex flex-row gap-3 m-auto ">
        <FaRegBookmark className="text-xl mt-[-.1em] ml-[0.25em] "/> 
        <p className="font-[Mulish] -mt-[.09em]">0 </p> 
        <p className="hidden lg:block font-[Mulish] -mt-[.09em]">Bookmarks </p> 
        
    </div>
    )
}
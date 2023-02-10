import { FaBookmark } from "react-icons/fa";
import { Bookmark } from "./Bookmark";
import { Comments } from "./Comments";
import { Like } from "./Like";

export function Reactions(){
    return(
        <div className="flex flex-row justify-between ml-[.75em] mt-5 mb-[1em] lg:mt-3 lg:ml-8 lg:mb-4">
       <div className="flex flex-row gap-3">
        
        <Like/>
        <Comments/>
        <Bookmark/>
       </div>
       </div>
    )
}
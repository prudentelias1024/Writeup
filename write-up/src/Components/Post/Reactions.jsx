import { FaBookmark } from "react-icons/fa";
import { Bookmark } from "./Bookmark";
import { Comments } from "./Comments";
import { Like } from "./Like";

export function Reactions(){
    return(
        <div className="flex flex-row justify-between mt-3 ml-8 mb-4">
       <div className="flex flex-row gap-4">
        
        <Like/>
        <Comments/>
       </div>
        <Bookmark/>
       </div>
    )
}
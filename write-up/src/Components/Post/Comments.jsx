import { FaRegComment } from "react-icons/fa";
export function Comments({comments,postId,username, setReel}){
    return(
        <div className="flex flex-row gap-1">
        <FaRegComment  className="text-base text-[#a4a4a4]"/> 
        <div className="flex flex-row gap-2">
        <p className="text-[#a4a4a4] -mt-[.2em]">{
           comments ? comments.length : 0
        } </p> 
        {/* <p className="hidden md:block lg:block font-[Outfit] -mt-[.09em]">Comments </p>  */}
        
            
            </div>
    </div>
    )
}
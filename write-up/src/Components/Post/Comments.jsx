import { FaRegComment } from "react-icons/fa";

export function Comments({comments,postId,username}){
    return(
        <div className="flex flex-row gap-3">
        <FaRegComment className="text-xl "/> 
        <div className="flex flex-row gap-2">
        <p className="font-[Mulish] -mt-[.09em]">{
            comments.length
        } </p> 
        <p className="hidden lg:block font-[Mulish] -mt-[.09em]">Comments </p> 
        
            
            </div>
    </div>
    )
}
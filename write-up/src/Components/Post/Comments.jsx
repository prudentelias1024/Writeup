import { FaRegComment } from "react-icons/fa";

export function Comments(){
    return(
        <div className="flex flex-row gap-3">
        <FaRegComment className="text-xl "/> 
        <div className="flex flex-row gap-2">
        <p className="font-[Mulish] -mt-[.09em]">0 </p> 
        <p className="hidden lg:blockfont-[Mulish] -mt-[.09em]">Comments </p> 
        
            
            </div>
    </div>
    )
}
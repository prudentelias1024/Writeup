import { FaRegComment } from "react-icons/fa";

export function Comments(){
    return(
        <div className="flex flex-row gap-3">
        <FaRegComment className="text-xl "/> <p className="font-[Mulish] -mt-[.09em]">0 Comments</p>
    </div>
    )
}
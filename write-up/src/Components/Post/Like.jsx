import { FaRegHeart } from "react-icons/fa";
export function Like(){
    return(
        <div className="flex flex-row gap-3">
            <FaRegHeart className="text-xl "/> <p className="font-[Mulish] -mt-[.09em]">0 Likes</p>
        </div>
    )
}
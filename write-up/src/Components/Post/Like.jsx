import { FaRegHeart } from "react-icons/fa";
export function Like(){
    return(
        <div className="flex flex-row gap-3">
            <FaRegHeart className="text-xl "/> <div className="flex gap-2">
            <p className="font-[Mulish] -mt-[.09em]">0 
            </p>
            <p className="hidden lg:block font-[Mulish] -mt-[.09em]">Likes</p>
                </div>
        </div>
    )
}
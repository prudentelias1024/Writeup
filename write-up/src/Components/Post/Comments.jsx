import { GoMention } from 'react-icons/go';

export function Comments({comments,postId,username}){
    return(
        <div className="flex flex-row gap-3">
        <GoMention className="text-xl text-blue-500 "/> 
        <div className="flex flex-row gap-2">
        <p className="font-[Outfit] text-blue-500 -mt-[.09em]">{
           comments ? comments.length : 0
        } </p> 
        <p className="hidden md:block lg:block font-[Outfit] -mt-[.09em]">Comments </p> 
        
            
            </div>
    </div>
    )
}
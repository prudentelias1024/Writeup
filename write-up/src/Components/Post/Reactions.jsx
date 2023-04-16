import { FaBookmark, FaRegEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Bookmark } from "./Bookmark";
import { Comments } from "./Comments";
import { Like } from "./Like";

export function Reactions({post, remove}){
    const {user} = useSelector(state => state)
    return(
        <div className={remove +  " flex flex-row justify-between ml-[3em] mt-5 md:ml-[1em]  lg:ml-1 mb-[1em] lg:mt-3 max-lg:ml-8 lg:mb-4"}>
       <div className="flex flex-row gap-3">
        
        <Like likes={post.likes} postId={post.postId} username={user !== null ?user.username :''}/>
        <Comments comments={post.comments} postId={post.postId} username={user !== null ?user.username :''} />
        <Bookmark bookmarks={post.bookmarks} postId={post.postId} username={user !== null ?user.username :''}/>
        {/* <div className='-mt-1 flex flex-row gap-1'>
                <FaRegEye  className=' text-black-500 text-2xl'/>
                <p className="total font-[Outfit]">{post.views} </p>  <p className="hidden lg:block">Views</p>
                </div> */}
                

       </div> 
         
      

       </div>
    )
}
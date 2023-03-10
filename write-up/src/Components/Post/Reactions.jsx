import { FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Bookmark } from "./Bookmark";
import { Comments } from "./Comments";
import { Like } from "./Like";

export function Reactions({post, remove}){
    const {user} = useSelector(state => state)
    return(
        <div className={remove +  " flex flex-row justify-between ml-[3em] mt-5 mb-[1em] lg:mt-3 lg:ml-8 lg:mb-4"}>
       <div className="flex flex-row gap-3">
        
        <Like likes={post.likes} postId={post.postId} username={user !== null ?user.username :''}/>
        <Comments comments={post.comments} postId={post.postId} username={user !== null ?user.username :''} />
        <Bookmark bookmarks={post.bookmarks} postId={post.postId} username={user !== null ?user.username :''}/>
       </div>
       </div>
    )
}
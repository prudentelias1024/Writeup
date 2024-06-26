import { FaBookmark, FaRegEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Bookmark } from "./Bookmark";
import { Comments } from "./Comments";
import { Like } from "./Like";
import Impressions from "./Impressions";
import Repost from "./Repost";

export function InReactions({post, remove, posttype, reelUpdater, additionalStyles}){
    const {user} = useSelector(state => state)
    // const user = {username: 'elias1024', name:'Prudent Elias'}
    return(
        <div className={remove +  " flex flex-row justify-between w-full ml-[2em] mt-5 md:ml-[1em]  lg:ml-[4.5em] mb-[1em] lg:mt-3 max-lg:ml-auto lg:mb-4"}>
       <div className="grid grid-cols-4  w-full">
        
        <Comments reelUpdater={reelUpdater} comments={post.comments} postId={post.postId} username={user !== null ?user.username :''} />

        
        <Like reelUpdater={reelUpdater}  posttype={posttype} additionalStyles={additionalStyles} likes={post.likes} postId={post.postId} username={user !== null ?user.username :''}/>
        

        <Repost reelUpdater={reelUpdater} posttype={posttype} reposts={post.reposts} post={post} postId={post.postId} username={user !== null ?user.username :''}/>
        
        <Bookmark posttype={posttype} bookmarks={post.bookmarks} postId={post.postId} username={user !== null ?user.username :''}/>
        {/* <div className='-mt-1 flex flex-row gap-1'>
                <FaRegEye  className=' text-black-500 text-2xl'/>
                <p className="total font-[Outfit]">{post.views} </p>  <p className="hidden lg:block">Views</p>
                </div> */}
                

       </div> 
         
      

       </div>
    )
}
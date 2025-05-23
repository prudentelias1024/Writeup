import { FaBookmark, FaRegEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Bookmark } from "./Bookmark";
import { Comments } from "./Comments";
import { Like } from "./Like";
import Impressions from "./Impressions";
import Repost from "./Repost";
import { useState } from "react";

export function Reactions({post, remove, posttype, setReposted, additionalStyles}){
    const {user} = useSelector(state => state)
    const [reel, setReel ] = useState(post)
    // const user = {username: 'elias1024', name:'Prudent Elias'}
    return(
        <div className={remove + additionalStyles  + " flex flex-row w-full  ml-[2.5em]  md:ml-[1em]  lg:ml-[2em] lg:pr-[2em] mb-[1em] lg:mt-3  lg:mb-4  "}>
        <div className="grid grid-cols-5  gap-[2em] justify-between  w-full ml-[1.3em] pr-[1em] ">
        
        <Impressions count={reel.viewedBy}  username={user !== null ?user.username :''}/>


        <Like setReel={setReel}  posttype={posttype} likes={reel.likes} postId={reel.postId} username={user !== null ?user.username :''}/>


        <Repost setRepostedDisplay={setReposted} setReel={setReel} posttype={posttype} reposts={reel.reposts} post={post} postId={reel.postId} username={user !== null ?user.username :''}/>
        
        <Comments setReel={setReel} comments={reel.comments} postId={reel.postId} username={user !== null ?user.username :''} />

        {/* <Bookmark setReel={setReel} posttype={posttype} bookmarks={reel.bookmarks} postId={reel.postId} username={user !== null ?user.username :''}/>
        */}
                

       </div> 
         
      

       </div>
    )
}
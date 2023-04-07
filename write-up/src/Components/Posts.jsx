import Post from "./Post";
import { useSelector } from "react-redux";
export default function Posts(){
    const {posts} = useSelector(state => state)
    if (posts == null) {
        
    } else {
   return(
    
    <div className="flex flex-col ml-[0em] m-auto  gap-8 pt-[0em] w-full  lg:pt-[1em]  lg:w-[30%]   lg:ml-[10em]">
      
    {
      posts.map((post) => {
         return(<Post key={post._id} post={post} />)
           
      })
      
  }
    </div>
   )
    }
    

      
           
   
}
import Post from "./Post";
import { useSelector } from "react-redux";
export default function Posts(){
    const {posts} = useSelector(state => state)
    if (posts == null) {
        
    } else {
   return(
    
    <div className="flex flex-col  m-auto  gap-8 pt-[9em] lg:pt-[1em] lg:absolute lg:top-40 lg:w-[30%] lg:ml-[45em]">
      
    {
      posts.map((post) => {
         return(<Post key={post._id} post={post} />)
           
      })
      
  }
    </div>
   )
    }
    

      
           
   
}
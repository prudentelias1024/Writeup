import Post from "./Post";
import { useSelector } from "react-redux";
import Poll from "./poll";
export default function Posts(){
    const {posts} = useSelector(state => state)
    if (posts == null) {
         
    } else {
   return(
    
    <div className="flex flex-col ml-[0em] m-auto md:mr-[3em] md:ml-[5em]  gap-1 pt-[0em] w-full  lg:pt-[1em]  lg:w-[30%]   lg:ml-[10em]">
     <Poll/> 
    {
      posts.map((post) => {
         return(<Post key={post._id} post={post} />)
           
      })
      
  }
    </div>
   )
    }
    

      
           
   
}
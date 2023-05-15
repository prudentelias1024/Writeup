import Post from "./Post";
import { useSelector } from "react-redux";
import Poll from "./poll";

import ImageReel from './imageReel';
import mock from '../mock.jpg'

import moment from 'moment';
import ShortFormCreator from "./shortFormCreator";
export default function Posts(){
    const {posts} = useSelector(state => state)
    if (posts == null) {
         
    } else {
      const calTotalVotes = (pollOptions) => {
        let totalVotes = 0
        pollOptions.map((option) => {
          totalVotes += option.votes
          
           
          })
          return totalVotes
      }
   return(
    <div className="flex flex-col ml-[0.5em] m-auto md:mr-[3em] md:ml-[5em]  gap-1 pt-[0em] w-full  lg:pt-[1em]  lg:w-[30%]   lg:ml-[10em]">
          {/* <Poll /> 
      <ImageReel /> */}
      <ShortFormCreator/>
    {
      posts.map((post) => {
         return(<Post key={post._id} post={post} />)
           
      })
      
  }
    </div>
   )
    }
    

      
           
   
}
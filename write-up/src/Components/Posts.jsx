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
     <Poll reel={{
            coverImageURL: mock,
            tags: ['#help', '#distress', '#heart', '#magic'],
            likes: [],
            comments: [],
            bookmarks: [],
            totalVotes: calTotalVotes([{pollname: 'Yes', votes: 10},{ pollname: 'No', votes:0},{ pollname: 'I don\'t know', votes:7 }]),
            created: moment(moment().subtract(3)),
            author: {username: 'elias1024', name:'Prudent Elias', public_picture:mock},
            viewedBy: [],
            text: 'I actually made this happened',
            options: [{pollname: 'Yes', votes: 10},{ pollname: 'No', votes:0},{ pollname: 'I don\'t know', votes:7 }].map((option) => {
            
             return  {...option, percentage:Math.round((option.votes /calTotalVotes([{pollname: 'Yes', votes: 10},{ pollname: 'No', votes:0},{ pollname: 'I don\'t know', votes:7 }]) ) * 100)}
          }),
            reelId: 'ae313-434d-32324',
            viewedBy: [{username: 'elias1024', name:'Prudent Elias'}]



        }}/> 
      <ShortFormCreator/>
      <ImageReel reel={{
            coverImageURL: mock,
            tags: ['#help', '#distress', '#heart', '#magic'],
            likes: [],
            comments: [],
            bookmarks: [],
            created: moment(moment().subtract(3)),
            author: {username: 'elias1024', name:'Prudent Elias', public_picture:mock},
            viewedBy: [],
            text: 'I actually made this happened',
            postId: 'ae313-434d-32324'



        }}/>
    {
      posts.map((post) => {
         return(<Post key={post._id} post={post} />)
           
      })
      
  }
    </div>
   )
    }
    

      
           
   
}
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import Poll from "./poll";
import ImageReel from './imageReel';
import moment from 'moment';
import ShortFormCreator from "./shortFormCreator";
import { useEffect, useRef, useState } from "react";
import { actions } from "../store";
import Podcast from "./Podcast";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import BioMatcher from "./BioMatcher";
import axios from "axios";
export default function Posts(){
    const reelsRef = useRef()
    const podcastRef = useRef()
    const dispatch = useDispatch()
    const inksRef = useRef()
    const [inkClicked, setInkClicked] = useState(false)                                                                                                                                                          
    const [reelsClicked, setReelClicked] = useState(false)
    const [podcastClicked, setPodcastClicked] = useState(false)
    const [recommendedUser, setRecommendedUser] = useState([])
    const posts = useSelector(state => state.posts)
    const {reels} = useSelector(state => state)
    const {justPublishedReels} = useSelector(state => state)
    const {podcasts} = useSelector(state => state)
    const {user} = useSelector(state => state) 
    const {URL} = useSelector(state => state)
    const getRecommendedUser = async() => {
      const  all_user = await(await axios.get(`${URL}/api/users`,{headers: {Authorization: localStorage.getItem('token')}})).data
      console.log(user)
      // const recommendedUser = await(await axios.post(`https://inkup-ai.onrender.com/api/recommendUser`, {all_profile: all_user, user:user},{headers: {Authorization: localStorage.getItem('token')}})).data
      const recommendedUser = await(await axios.post(`http://localhost:8000/api/recommendUser`, {all_profile: all_user, user:user})).data
      console.log(recommendedUser)
      setRecommendedUser(recommendedUser)
    }
    useEffect(() => {
      getRecommendedUser()
      if(justPublishedReels == true){
          reelsRef.current.click()
          dispatch(actions.setJustPublishedReels(false))
      } else {
        
         inksRef.current.click()
        
      }
      console.log(reels)
    }, [])
    if (posts == null) {
         
    } else {
      const calTotalVotes = (pollOptions) => {
        let totalVotes = 0
        pollOptions.map((option) => {
          totalVotes += option.votes
          
           
          })
          return totalVotes
      }
      const handleInksContentDisplay = () => {
        setInkClicked(true)
        setReelClicked(false)
        setPodcastClicked(false)
      }
      const handleReelsDisplay = () => {
        setInkClicked(false)
        setReelClicked(true)
        setPodcastClicked(false)
      }
       const handlePodcastsDisplay = () => {
        setInkClicked(false)
        setReelClicked(false)
        setPodcastClicked(true)
       }
    
   return(
    <div className="flex flex-col md:mr-[3em] md:ml-[5em] mb-[3em] gap-0 pt-[0em] w-full  lg:pt-[1em]  lg:w-[50%] lg:mt-[0em]  lg:ml-[2em]">
      <div className="flex flex-row w-full">
        {
        inkClicked ?
        
        <div ref={inksRef} onClick={handleInksContentDisplay} className="content  w-1/2 text-blue-500 underline underline-offset-[1em] p-[1em]   ">
          <p className="font-[Sen] text-center text-sm font-semibold ">Inks</p>
        </div> :
        <div ref={inksRef} onClick={handleInksContentDisplay} className="content  w-1/2  p-[1em]   ">
          <p className="font-[Sen] text-center text-sm font-semibold ">Inks</p>
        </div> 

        }
        {
    reelsClicked?
    <div ref={reelsRef} onClick={handleReelsDisplay} className="reels  w-1/2 text-blue-500 underline underline-offset-[1em] p-[1em]  ">
            <p className="font-[Sen] text-center text-sm font-semibold ">Reels</p>
            </div>:
    <div ref={reelsRef} onClick={handleReelsDisplay} className="reels  w-1/2   p-[1em]  ">
            <p className="font-[Sen] text-center text-sm font-semibold ">Reels</p>
            </div>
}
        {/* {
    podcastClicked?
    <div ref={podcastRef} onClick={handlePodcastsDisplay} className="podcast cursor-none  w-1/2 text-blue-500 underline underline-offset-[1em] p-[1em]  ">
            <p className="font-[Sen] text-center text-sm font-semibold ">Podcasts</p>
            </div>:
    <div ref={podcastRef} onClick={handlePodcastsDisplay} className="podcast cursor-none  w-1/2  p-[1em]  ">
            <p className="font-[Sen] text-center text-sm font-semibold inline-flex gap-1">Podcasts
            <p className="font-[Sen] text-center text-xs font-semibold bg-green-200 -mt-1 text-white w-fit px-2 py-1 rounded-full "> Soon</p>
            </p>
            </div>
} */}
      </div>
     { reelsClicked == true ? <ShortFormCreator/>: ''}
   
         {
          reelsClicked == true? 
           reels && reels.length > 0 && reels.map((reel) => {
            console.log(reel)
             if(reel.type == "poll"){
                return <Link to={'/reels/'+reel.postId}>
                      <Poll reel={reel} key={reel.postId} /> 
                </Link>
              }else if(reel.type == "image"){
                return <ImageReel reel={reel} key={reel.postId} /> 
              
             } else{

               return <p className="font-[Sen] text-xl font-bold text-[#333] text-center">No Reels</p>
             }
           }) : ''
         }
    {
      podcastClicked == true?
      podcasts.map((podcast) => {
         return(<Podcast key={podcast._id} podcast={podcast} />)
           
      }) : ''
      
  }
    {
      inkClicked == true?

      posts.map((post,index) => {
          if(index  == Math.round(posts.length / 2 )){
           return  <BioMatcher users={recommendedUser
          } key={index}/>
          }
         return(<Post key={post._id} post={post} />)
           
      }) : ''
      
  }
    </div>
   )
    }
    

      
           
   
}
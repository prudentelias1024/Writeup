import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import Poll from "./poll";

import ImageReel from './imageReel';

import moment from 'moment';
import ShortFormCreator from "./shortFormCreator";
import { useEffect, useRef, useState } from "react";
import { actions } from "../store";
import Podcast from "./Podcast";
export default function Posts(){
    const reelsRef = useRef()
    const podcastRef = useRef()
    const dispatch = useDispatch()
    const inksRef = useRef()
    const [inkClicked, setInkClicked] = useState(false)
    const [reelsClicked, setReelClicked] = useState(false)
    const [podcastClicked, setPodcastClicked] = useState(false)
    const posts = useSelector(state => state.posts)
    const {reels} = useSelector(state => state)
    const {justPublishedReels} = useSelector(state => state)
    const {podcasts} = useSelector(state => state)
    useEffect(() => {
      if(justPublishedReels == true){
          reelsRef.current.click()
          dispatch(actions.setJustPublishedReels(false))
      } else {
        
         inksRef.current.click()
       // podcastRef.current.click()
        
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
    <div className="flex flex-col md:mr-[3em] md:ml-[5em]  gap-0 pt-[0em] w-full  lg:pt-[1em]  lg:w-[30%] lg:mt-[0em]  lg:ml-[2em]">
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
     { reelsClicked ? <ShortFormCreator/>: ''}
   
         {
          reelsClicked == true? 
           reels && reels.length > 0 && reels.map((reel) => {
        
      
        
    
             if(reel.type == "poll"){
               return <Poll reel={reel} key={reel.reelId} /> 
              }else if(reel.type == "image"){
               return <ImageReel reel={reel} key={reel.reelId} /> 
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

      posts.map((post) => {
         return(<Post key={post._id} post={post} />)
           
      }) : ''
      
  }
    </div>
   )
    }
    

      
           
   
}
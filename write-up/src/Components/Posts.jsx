import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import Poll from "./poll";

import ImageReel from './imageReel';

import moment from 'moment';
import ShortFormCreator from "./shortFormCreator";
import { useEffect, useRef, useState } from "react";
import { actions } from "../store";
export default function Posts(){
    const reelsRef = useRef()
    const inksRef = useRef()
    const dispatch = useDispatch()
    const [inkClicked, setInkClicked] = useState(false)
    const [reelsClicked, setReelClicked] = useState(false)
    const posts = useSelector(state => state.posts)
    const {reels} = useSelector(state => state)
    const {justPublishedReels} = useSelector(state => state)
    useEffect(() => {
      if(justPublishedReels == true){
          reelsRef.current.click()
          dispatch(actions.setJustPublishedReels(false))
      } else {
        
        inksRef.current.click()
      }
      console.log(reels)
      // console.log(inksRef.current)
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
      }
      const handleReelsDisplay = () => {
        setInkClicked(false)
        setReelClicked(true)
      }
    
   return(
    <div className="flex flex-col ml-[0.5em] m-auto md:mr-[3em] md:ml-[5em]  gap-1 pt-[0em] w-full  lg:pt-[1em]  lg:w-[30%] lg:mt-[0em]  lg:ml-[10em]">
      <div className="flex flex-row w-full">
        {
        inkClicked ?
        
        <div ref={inksRef} onClick={handleInksContentDisplay} className="content border w-1/2  bg-blue-500 text-white p-[1em] rounded-l-lg  ">
          <p className="font-[Outfit] text-center text-xl font-semibold ">Inks</p>
        </div> :
        <div ref={inksRef} onClick={handleInksContentDisplay} className="content border w-1/2  hover:bg-blue-500 hover:text-white p-[1em] rounded-l-lg  ">
          <p className="font-[Outfit] text-center text-xl font-semibold ">Inks</p>
        </div> 

        }
        {
    reelsClicked?
    <div ref={reelsRef} onClick={handleReelsDisplay} className="reels border w-1/2 bg-blue-500 text-white p-[1em] rounded-r-lg ">
            <p className="font-[Outfit] text-center text-xl font-semibold ">Reels</p>
            </div>:
    <div ref={reelsRef} onClick={handleReelsDisplay} className="reels border w-1/2 hover:bg-blue-500 hover:text-white p-[1em] rounded-r-lg ">
            <p className="font-[Outfit] text-center text-xl font-semibold ">Reels</p>
            </div>
}
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

               return <p className="font-[Outfit] text-xl font-bold text-[#333] text-center">No Reels</p>
             }
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
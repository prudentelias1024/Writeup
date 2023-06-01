import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { FaRegBookmark, FaPlay, FaRegHeart, FaRegComment, FaPause } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import Mock from "./mock.jpg";
import sound from './pod1.mp3'
import ProgressBar from "@ramonak/react-progress-bar";
import { duration } from "moment";
import AuthorInfo from "./Post/AuthorInfo";
import { Reactions } from "./Post/Reactions";
export default function  Podcast  ({podcast}) {
  const podcastRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [currentSound,setCurrentSound] = useState()
  const [podcastTotalTime, setPodcastTotalTime] = useState(' 00: 00 ')
  const [podcastTimeExhausted, setPodcastTimeExhausted] = useState(' 00:00 ')
  
  useEffect(() => {
    const handleTimeUpdate = () => {
      setPodcastTimeExhausted(`${Math.floor(podcastRef.current.currentTime / 60)} : ${Math.floor(
        podcastRef.current.currentTime  % 60)}`)
        if(podcastTimeExhausted == podcastTotalTime){
          setIsFinished(true)
        }
  
    }

    const handleLoadedData = () => {
      setPodcastTotalTime(`${Math.floor(podcastRef.current.duration /60).toFixed(0)} : ${Math.floor(podcastRef.current.duration % 60)}`)
    }
    const handleEnded = () => {
      setIsPlaying(false)
    }
    podcastRef.current.addEventListener('timeupdate', handleTimeUpdate);
    podcastRef.current.addEventListener('loadeddata', handleLoadedData);
    podcastRef.current.addEventListener('ended', handleEnded);
   
    // return () => {
    //   podcastRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    //   podcastRef.current.removeEventListener('loadeddata', handleLoadedData);
    //   podcastRef.current.removeEventListener('ended', handleEnded);
    // };
  },[])
  
  const playPodcast = () => {
    setIsPlaying(true)
   podcastRef.current.play()
  }
  const pausePodcast = () => {
   
   podcastRef.current.pause()
   setIsPlaying(false)
  }
   return (
     <> 
     <div className="lg:mt-[5em] flex flex-col w-[100%] gap-[1em] border rounded-xl bg-orange-800 text-white h-fit p-[2em] ml-[-.25em] ">
      <audio  ref={podcastRef} src={podcast.podcastURL}></audio>
       <div className="podcastInfo flex flex-col">
        <div className="flex flex-row justify-between px-[1em]">
        <p className="font-[Outfit] text-white font-bold">{podcastTimeExhausted}</p>
        <p className="font-[Outfit] text-white font-bold">{podcastTotalTime}</p>
        </div>
       </div>
       {isPlaying  ?
       <>
       
       <FaPause onClick={pausePodcast}/>
       </>:
       <>
       <FaPlay onClick={playPodcast}/> 
       
       </>
       }
        <div className="flex flex-row gap-[1em]">

    {podcast.tags.length > 0 ?
     podcast.tags.map((tag) => {

       return <p className="tag font-[Outfit] text-lg font-extrabold">{tag}</p>
      
      })
      : ''
    }
    
    
        </div>
    
     <p className="podcast_title text-xl font-[Outfit] font-black">
    {podcast.title}
     </p>
     <div className="lg:ml-[-2em]">

     <AuthorInfo author={podcast.author} timestamp={podcast.created} additionalStyles="text-white lg:text-white" />
     </div>
     <div className="lg:ml-[-1em]">

     <Reactions post={podcast} additionalStyles="text-white lg:text-white" remove={false}/>
     </div>
    
      
     </div>
     </>
   )
}
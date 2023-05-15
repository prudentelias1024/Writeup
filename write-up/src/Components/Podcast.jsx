import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { FaRegBookmark, FaPlay, FaRegHeart, FaRegComment, FaPause } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import Mock from "./mock.jpg";
import sound from './pod1.mp3'
import ProgressBar from "@ramonak/react-progress-bar";
import { duration } from "moment";
export default function  Podcast  () {
  const podcastRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound,setCurrentSound] = useState()
  const [podcastTotalTime, setPodcastTotalTime] = useState(' 00:00 ')
  const [podcastTimeExhausted, setPodcastTimeExhausted] = useState(' 00:00 ')

  useEffect(() => {
   setCurrentSound(new Audio(sound))

   
  },[])
  
  const playPodcast = () => {
    setPodcastTotalTime(`${Math.floor(currentSound.duration /60)}: ${Math.floor(currentSound.duration % 60)}`)
   currentSound.play()
   console.log(currentSound.played.length)
    setIsPlaying(true)
  }
  const pausePodcast = () => {
    // podcastRef.current.
   
   currentSound.pause()
   setIsPlaying(false)
  }
   return (
     <> 
     <div className="lg:mt-[5em] flex flex-col w-[30em] gap-[1em] border rounded-xl bg-orange-800 text-white h-fit p-[2em] ">
      <audio  ref={podcastRef} src="./pod1.mp3"></audio>
       <div className="podcastInfo flex flex-col">
        <div className="flex flex-row justify-between px-[1em]">
        <p className="font-[Outfit] text-white font-bold">{podcastTimeExhausted}</p>
        <p className="font-[Outfit] text-white font-bold">{podcastTotalTime}</p>
        </div>
       </div>
       {isPlaying ?
       <>
       
       <FaPause onClick={pausePodcast}/>
       </>:
       <>
       <FaPlay onClick={playPodcast}/> 
       
       </>
       }
        <div className="flex flex-row gap-[1em]">

      <p className="tag font-[Outfit] text-lg font-extrabold">#Podcast</p>
      <p className="tag font-[Outfit] text-lg font-extrabold">#Podcast</p>
      <p className="tag font-[Outfit] text-lg font-extrabold">#Podcast</p>
      <p className="tag font-[Outfit] text-lg font-extrabold">#Podcast</p>
        </div>
    
     <p className="podcast_title text-xl font-[Outfit] font-black">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam numquam maxime officia, quae explicabo deserunt aliquam enim ab ipsum quis dignissimos 
     </p>
      <div className="podcaster flex flex-row gap-[1em]">
        
     <img src={Mock} alt="Prudent Elias" className="h-[3em] w-[3em] rounded-full"/>
      <div className="flex flex-col ">
      <p className="font-bold font-[Outfit] ">Prudent Elias</p>
  {/* <p className=" text-lg font-bold font-[Outfit] text-[#616161]  lg:text-2xl lg:mt-[1em]">{user.name}</p>
{  user.verified? <HiBadgeCheck  className="text-xl text-blue-500 mt-1"  />: ''} */}
      <p className="font-semibold text-sm font-[Outfit] -mt-1">@prudentelias</p>
      </div>
      </div>
       <div className="reactions flex flex-row justify-center gap-[3em] mt-[1em]">
          <div className="flex flex-row gap-[.5em]">
            
       <FaRegHeart className="text-xl"/> 
       
        <p className="text-base font-[Outfit] font-bold  -mt-.95">3 Likes</p>
          </div>
          <div className="flex flex-row gap-[.5em]">
            
      <FaRegComment className="text-xl"/>
        <p className="text-base font-[Outfit] font-bold  -mt-.95">3 Comments</p>
          </div>
          <div className="flex flex-row gap-[.5em]">
       <FaRegBookmark className="text-xl"/>
            
        <p className="text-base font-[Outfit] font-bold  -mt-.95">3 Bookmarks</p>
          </div>
       </div>
     
     </div>
     </>
   )
}
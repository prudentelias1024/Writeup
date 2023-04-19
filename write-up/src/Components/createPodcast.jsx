import { useEffect, useState, useRef } from "react";
import { MdOutlineAudiotrack } from "react-icons/md";
import {v4} from  'uuid'
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { storage } from "../firebase";
const CreatePodcast = () => {
    const [filename, setFilename] = useState(null)
    const uploadRef = useRef()
    const handleAudioUpload = () => {
    uploadRef.current.click()
    }
    const handleAudioSelection = (event) => {
    setFilename(event.target.files[0].name)
    }
   const uploadAudio = (event) => {
    
   }
    return (
        <>
        <div className="podcast">
            
        <form >
        <input type="file" onChange={handleAudioSelection} name="podcast_audio" className="opacity-0" ref={uploadRef}  />    
        <div onClick={handleAudioUpload} className="border border-blue-500 text-blue-500 w-[95%] ml-[1em]  lg:w-[80%]  lg:m-auto text-center py-[10em] rounded-lg">
            <MdOutlineAudiotrack className="text-4xl mx-auto"/>
            <p className="font-[Outfit] text-xl md:m-0 lg:m-0 font-bold">
                {filename == null?'No File Chosen': filename}
            </p>
        </div>
        <div className="flex-row gap-[1em] flex pt-[1em] w-[95%] lg:w-[80%] m-auto">
        <button type="button" className="bg-yellow-500 text-white w-full font-bold font-[Outfit] p-[1em] rounded-lg" onClick={uploadAudio}>Publish </button>
        <button type="button" className="bg-green-500 text-white w-full font-bold font-[Outfit] p-[1em] rounded-lg" onClick={handleAudioUpload}> Upload  </button>
        </div>
        </form>    
        </div>
        
        
        </>
    )
}

export default CreatePodcast
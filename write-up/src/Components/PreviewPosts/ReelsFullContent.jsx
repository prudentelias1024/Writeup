import React, {useState, useEffect} from 'react'
import Comment from './comment'
import axios from 'axios'
import  Poll  from "../poll";
import  ImageReel from "../imageReel";
import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddComment from '../Post/addComment';

export default function ReelsFullContent() {
    const [URL,setURL] = useState()
    const params = useParams()
    const {user} = useSelector(state => state)
    const [reel, setReel] = useState(null)
    
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            setURL("https://inkup-api.onrender.com")
          }else{
            setURL("http://localhost:5000")
          }

        getReel()
        increasePostView()
    }, [])
    const increasePostView = async() => {
        let res = await (await axios.post(`http://localhost:5000/reel/viewed`, {postId: params.postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
        console.log(res)
      }
    
      const getReel = async() => {
        let res = await (await axios.get(`http://localhost:5000/reels/${params.postId}`, {headers: {Authorization: localStorage.getItem('token')}})).data
        setReel(res)
        console.log(res)
      }
     
   if(reel){

   
    if(reel.type == "poll"){
        return <>
        <Poll reel={reel} key={reel.reelId} /> 
        {reel.comments.map(comment  => {
            return <Comment body={comment.text} />
        })}
        </>
       }else if(reel.type == "image"){
       return  <>
        <ImageReel reel={reel} key={reel.reelId} /> 
        {reel.comments.map(comment  => {
            return <Comment commenter={user} body={comment.text} />
        })}
         <AddComment post={reel} user={user} />
         </>
           }  else{
          return 'loading'
        }
        }
        
}

import React, {useState, useEffect} from 'react'
import Comment from './comment'
import axios from 'axios'
import  Poll  from "../poll";
import  ImageReel from "../imageReel";
import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar';
import Header from '../header';
import AddComment from '../Post/addComment'
export default function ReelsFullContent() {
    // const [URL,setURL] = useState("http://localhost:5000")
    const [URL,setURL] = useState("https://inkup-api.onrender.com")
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
        let res = await (await axios.post(`${URL}/reel/viewed`, {postId: params.postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
        console.log(res)
        setReel(res)
      }
    
      const getReel = async() => {
        let res = await (await axios.get(`http://localhost:5000/reels/${params.postId}`, {headers: {Authorization: localStorage.getItem('token')}})).data
        setReel(res)
        console.log(res)
      }
     
   if(reel){

   
    if(reel.type == "poll"){
        return <>
        <Header  />
        <Poll reel={reel} key={reel.postId} /> 
        {reel.comments.map(comment  => {
            return <Comment commenter={comment.author}  comment={comment} />
        })}
        </>
       }else if(reel.type == "image"){
       return  <>
        <ImageReel reel={reel} key={reel.postId} URL={URL} /> 
        {reel.comments.map(comment  => {
            return <Comment commenter={comment.author} comment={comment}  />
        })}
         <AddComment reelUpdater={setReel} post={reel} user={user} url={URL} />
         </>
           }  else{
          return 'loading'
        }
        }
        
}

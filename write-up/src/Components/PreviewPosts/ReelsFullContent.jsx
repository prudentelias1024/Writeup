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
import UserNav from '../Navbar/UserNav';
export default function ReelsFullContent() {

  const params = useParams()
    const {user} = useSelector(state => state)
    
    const {URL} = useSelector(state => state)
    const [reel, setReel] = useState(null)
    
    useEffect(() => {
        console.log(URL)
        getReel()
        increasePostView()
    }, [])
    const increasePostView = async() => {
        let res = await (await axios.post(`${URL}/reel/viewed`, {postId: params.postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
        console.log(res)
        setReel(res)
        
      }
    
      const getReel = async() => {
        let res = await (await axios.get(`${URL}/reels/${params.postId}`, {headers: {Authorization: localStorage.getItem('token')}})).data
        setReel(res)
        console.log(res)
      }
     
   if(reel){

    if(reel.type === "poll"){
        return <div className='lg:ml-10'>
        <UserNav/>
        <Header  />
        <Poll reel={reel} key={reel.postId} /> 
        {reel.comments.map(comment  => {
            return <Comment commenter={comment.author}  comment={comment} />
        })}
        </div>
       }else if(reel.type === "image"){
       return  <div className="lg:ml-[10em]">
        <UserNav/>
       <div className='lg:ml-[10em] lg:w-1/2 flex flex-col mb-[4em] border '>

        <ImageReel reelUpdater={setReel} reel={reel} key={reel.postId} URL={process.env.REACT_APP_PRODUCTION_URL} /> 
        <hr />
        <AddComment reelUpdater={setReel} post={reel} user={user} url={process.env.REACT_APP_PRODUCTION_URL} />
        <hr />
        <div className="flex flex-col">

        {reel.comments.map(comment  => {
          return <Comment commenter={comment.author} comment={comment}  />
        })}
        </div>
         </div>
          </div>
           }  else{
          return 'loading'
        }
        }
        
}

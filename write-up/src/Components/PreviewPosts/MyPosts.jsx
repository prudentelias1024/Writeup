import React, {useEffect, useMemo, useRef, useState} from 'react';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import NavBar from '../NavBar';
import tempImage from "../../mock.jpg";
import AuthorInfo from '../Post/AuthorInfo';
import Tag from '../Post/Tag';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './comment';
import ReactQuill from 'react-quill';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from "../../time";
import { BsHeartFill } from 'react-icons/bs';
import { actions } from '../../store';
import LoginModal from '../loginModal';
const MyPosts = () => {
  
  
 const {user,showModal} =  useSelector(state => state)
 const [liked,setLiked] = useState()
 const [followed,setFollowed] = useState(false)
 const [bookmarked,setBookmarked] = useState()
  const params = useParams()
  const likeRef = useRef()
  const bookmarkRef = useRef()
  const [post,setPost] = useState(null)
  const  dispatch = useDispatch()
   const [otherAuthorPost,setOtherAuthorPost] = useState(null)
  const increasePostView = async() => {
    let res = await (await axios.post(`https://writeup-37ap.vercel.app/post/viewed`, {postId: params.postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
  }

  const getOtherAuthorPost = async() => {
    let  res = await(await axios.get(`https://writeup-37ap.vercel.app/post/getAuthorPosts/${params.username}/${params.postId}`)).data
    console.log(res)
    setOtherAuthorPost(res)

  }
 
  const getPost = async() => {
    let  res_post = await(await axios.get(`https://writeup-37ap.vercel.app/post/${params.username}/${params.postId}`)).data
    setPost(res_post)
    if(user !== null){
      checkLiked(res_post.likes,user.username)
      checkBookmarked(res_post.bookmarks,user.username)
      
    } else {
      setLiked(false)
      setBookmarked(false)
    }
      
      
   
    console.log(res_post)
  
 }
  const  checkLiked = (likers,username) => {
    console.log(username)
     if ( likers ) {
   
    let currentUser = likers.filter((liker) => {
      return liker.username == username
     })
     console.log(currentUser)
     if( currentUser.length > 0 ){
      setLiked(true)
     }
    }

  }
  const  checkBookmarked = (bookmarkers,username) => {
   
    if (bookmarkers) {
   
    let currentUser = bookmarkers.filter((bookmarker) => {
      return bookmarker.username == username
     })
      console.log(currentUser)
     if(currentUser.length > 0){
      setBookmarked(true)
     }
  }
}
    const likePost = async(postId,name,author) => {
      if (user == null) {
        dispatch(actions.setShowModal(true))
      }else{
      let  res = await(await axios.post(`https://writeup-37ap.vercel.app/post/like`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
      let likeNotification = await(await axios.post('https://writeup-37ap.vercel.app/api/notification/like', {postId:postId,post_name:name,author:author}, {headers: {Authorization: localStorage.getItem('token')}})).data 
     
      setPost(res)
      setLiked(true)
      }
      } 
    const unlikePost = async(postId) => {
      let  res = await(await axios.post(`https://writeup-37ap.vercel.app/post/unlike`,{ postId:postId}, {headers: {Authorization: localStorage.getItem('token')}})).data
      console.log(res)
      setPost(res)
      setLiked(false)
         
      } 
    
    useEffect(() => {
     setTimeout(() => {
      increasePostView()
     }, 5000);
      getPost();
      getOtherAuthorPost();
       
     
    }, [])
 
   const [comment,setComment] = useState('')
    let modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      }
      
      const HandleComment = (value) => {
        setComment(value)
        console.log(comment);
      }
  
     const commentPost = async(user,postId,name,author, commentWords) => {
      let  res = await(await axios.post(`https://writeup-37ap.vercel.app/post/comment`,{user:user, postId:postId, comment:commentWords}, {headers: {Authorization: localStorage.getItem('token')}})).data
      let commentNotification = await(await axios.post('https://writeup-37ap.vercel.app/api/notification/comment', {postId:postId,post_name:name,author:author}, {headers: {Authorization: localStorage.getItem('token')}})).data 
      console.log(res)
        setPost(res)
        // setComment('')
      } 
     const bookmarkPost = async(postId,name,author) => {
      if (user == null) {
        dispatch(actions.setShowModal(true))
      }else{
      let  res = await(await axios.post(`https://writeup-37ap.vercel.app/post/bookmark`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
      let bookmarkNotification = await(await axios.post('https://writeup-37ap.vercel.app/api/notification/bookmark', {postId:postId,post_name:name,author:author}, {headers: {Authorization: localStorage.getItem('token')}})).data 
      console.log(res)
      setPost(res)
      setBookmarked(true)
      } }
      
     const unbookmarkPost = async(postId) => {
      let  res = await(await axios.post(`https://writeup-37ap.vercel.app/post/unbookmark`,{ postId:postId }, {headers: {Authorization: localStorage.getItem('token')}})).data
      console.log(res)
      setPost(res)
      setBookmarked(false)
      } 
     const follow = async(user,author) => {
         if (user == null) {
          dispatch(actions.setShowModal(true))
        }else {
       axios.post(`https://writeup-37ap.vercel.app/api/follow`,{ user:user, author: author }, {headers: {Authorization: localStorage.getItem('token')}})
       setFollowed(true)
        }
      }
      const unfollow = async(user,author) => {
        axios.post(`https://writeup-37ap.vercel.app/api/unfollow`,{ user:user, author: author }, {headers: {Authorization: localStorage.getItem('token')}})
        setFollowed(false )

     }

    if (post !== null) {
   
    return (
      <>
      {showModal == true ? <LoginModal /> : ''}
        <NavBar/>
        <div className='flex flex-col gap-[1em] lg:top-32 lg:relative lg:flex lg:gap-[30em]'>
            <div className=" fixed flex impressions  z-10 border-1 bg-white bottom-0 w-full flex-row pt-8 pl-12 p-4 lg:bg-inherit lg:w-fit lg:top-0 lg:ml-[30em] lg:pt-[10em] lg:flex lg:flex-col gap-[2em]">
           
                {
                liked == true ?
                            
                <button  onClick={(event) => unlikePost(post.postId)} className='rounded-full flex lg:flex-col gap-[1em]'>
                    <BsHeartFill className='text-2xl lg:text-3xl text-red-500'/>
                    <p className="font-[Mulish] text-black text-xl lg:ml-2">{post.likes.length}</p>
                </button> :  <button  onClick={(event) => likePost(post.postId,post.title,post.author)} className='rounded-full flex lg:flex-col gap-[1em]'>
                    <FaRegHeart className='text-2xl lg:text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl lg:ml-2">{post.likes.length}</p>
                </button>
                }
                <button className='rounded-full flex lg:flex-col gap-[1em]'>
                    <FaRegComment className='text-2xl lg:text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl lg:ml-2">{post.comments.length}</p>
                </button>
                {
                bookmarked == true ?
                            
                <button  onClick={(event) => unbookmarkPost(post.postId)} className='rounded-full flex  lg:flex-col gap-[1em]'>
                <FaBookmark className='text-2xl lg:text-3xl text-black'/>
                <p className="font-[Mulish] text-black text-xl lg:ml-2">{post.bookmarks.length}</p>
            </button>:
            
            <button className='rounded-full flex  lg:flex-col gap-[1em]'>
                    <FaRegBookmark onClick={(event) => bookmarkPost(post.postId,post.name,post.author)} className='text-2xl flex  lg:text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl lg:ml-2">{post.bookmarks.length}</p>
                </button>
                }

             
                
            </div>

            <div className="post lg:ml-[40em] -z-100 flex flex-col pt-[8em] bg-white lg:w-2/5 text-[#171717] rounded-lg">
            <img src={post.coverImageURL} className='w-full lg:h-[100%] object-cover' /> 
            <div className="author flex lg:gap-[1em] lg:my-[3em] lg:ml-[4.5em]">
             
             <AuthorInfo author={post.author} timestamp={post.created}/>
            </div>
            <div className='pl-[1em]'>
                <p className='text-2xl leading-8 font-black w-fit px-[.75em] lg:px-[1.5em] mb-[.25em] lg:text-4xl '>
                  {post.title}
                  </p>
                <div className='font-[Mulish] flex flex-row gap-3 pl-3 lg:ml-[2.5em]'>
                  {
                
                post.tags.toString().split(',').map((tag,index) => {
                 
                  return(
                    <>
                    
                  
                    <Tag key={index} name={tag}/>
                    </>
                    )
                  })
                  }

</div>
                <ReactQuill className='z-0 p-7'
                  value={post.body}
                  readOnly={true}
                  theme={"bubble"}
                />
              </div>
           {user !== null ?
            <div className="comments">
                <p className='ml-[2em] lg:ml-[3.75em] font-bold text-xl mb-[3em]'>Add Comment</p>
                <div className='add_comment m-auto rounded-lg pt-[1em] pl-[1em]  shadow-md w-4/5  flex flex-col mb-[5em] lg:ml-[5em]'>
                 <img className='w-[2.5em] h-[2.5em] object-cover rounded-full' src={user.public_picture} alt={user.name} />
                <div className='flex flex-row'>
               </div>
              
                <ReactQuill modules={modules} defaultValue='' onChange={HandleComment} placeholder='Add Comment' theme='bubble'  style={{color: 'grey', paddingLeft: '3em', paddingBottom: '2em', background: "white", height: '30%', width: '100%'}} />
     
                <button onClick={(event) => {commentPost(user._id,post.postId,post.name,post.author,comment)}}  className='bg-purple-500 text-white h-[2.5em] w-[10em] rounded-lg ml-[3em] mb-[1em] mt-[2em]'>Submit</button>


                </div>
                {
                  post.comments && post.comments.length > 0  && post.comments.map(comment => 
                  <Comment key={comment._id} commenter={comment.user} timestamp={comment.createdAt} body={comment.message}/>
                 
                  )
                }
                
                </div> :''          
                       
                      }
             </div>
            <div className="author_Profile w-full lg:fixed lg:right-[1em] p-7 bg-white lg:w-[23em] text-[#171717] rounded-lg">
                <div className='flex gap-[1em]'>
            <img src={post.author.public_picture} className='w-[3em] h-[3em] rounded-full object-cover' /> 
           <div>

            <p className="font-[Mulish] text-xl font-extrabold">{post.author.name}</p>
            <p className="font-[Mulish] -mt-1 text-[#717171] text-base font-extrabold">@{post.author.username} </p>
                </div>
                
           </div>
          
          <div className="bio ml-[.5em] font-[Mulish] font-semibold leading-7 text-[#717171] mt-[1em]">
            {post.author.bio !== '' ? post.author.bio : <p className="text-center my-[1em]">No Bio Yet</p>}
          </div>
          <div className=''>
            <p className='font-[Mulish] text-[#171717] font-extrabold mt-[1em] uppercase ml-2'>Joined On</p>
                    <p className='text-[#717171] font-bold ml-[.5em] mt-[.25em]'>{format(post.author.joined_on)}</p>
          </div>
         {user !== null ?
          post.author.username !== user.username   ?(
              followed == false ?
          <button onClick={(event) => {follow(user,post.author)}} className="bg-[#512bd4] text-white rounded-lg w-full mb-[4em]  h-[3em] font-bold lg:ml-[3em] mt-[1em] lg:w-[15em]" type="button">
          Follow
          </button> : <button onClick={(event) => {unfollow(user,post.author)}} className="bg-[white] text-black rounded-lg w-full mb-[4em] border border-black  h-[3em] font-bold lg:ml-[3em] mt-[1em] lg:w-[15em]" type="button">
          Following
          </button>
          )
     : <button  className="bg-[#512bd4] text-white rounded-lg w-full mb-[4em]  h-[3em] font-bold lg:ml-[3em] mt-[1em] lg:w-[15em]" type="button">
          <Link to='/settings'>
          Edit Profile
          </Link>

     </button> : <button onClick={(event) => {follow(user,post.author)}} className="bg-[#512bd4] text-white rounded-lg w-full mb-[4em]  h-[3em] font-bold lg:ml-[3em] mt-[1em] lg:w-[15em]" type="button">
          Follow
          </button>

    
         }{}
            </div>
            {
              otherAuthorPost !== null &&  otherAuthorPost.length > 0  ?   <div className="more_posts w-full py-7 lg:-bottom-1 lg:fixed lg:right-[1em] lg:p-7 bg-white lg:w-[23em]  text-[#171717]">
              <p className='font font-bold text-xl ml-7'>More posts from {post.author.name}</p>
              <div className='flex flex-col w-full gap-8 py-[1.5em] mb-[1.5em]'>
                 <div className='block hover:bg-[#ededed] w-full p-3 '>
                     <p className='text-md w-full text-[#717171]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                   <div className='flex flex-row ml-[1.8em] mt-[.5em] gap-4'>
 
                    <Tag name="lorem"/>
                     <Tag name="lorem"/>
                     <Tag name="lorem"/>
                     <Tag name="lorem"/>
                     
                   </div>
 
                 </div>
                 
            
              </div>
             </div> : ''
            }
          
            
        </div>
        </>
    );
                }
}

export default MyPosts;

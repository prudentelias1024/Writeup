
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import { BsThreeDots } from "react-icons/bs";
import Tag from './Post/Tag'
import {  Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { InReactions } from './Post/InReactions'
import { AiFillDelete } from "react-icons/ai";
import { IoPencil } from "react-icons/io5";
import axios from "axios";
import { actions } from "../store/index";


export default function Post({post, removeReactions, showCoverImage, readingTimeStyles, additionalStyles}) {
  const [openPostAction, setOpenPostAction] = useState(false)
  const dispatch = useDispatch()  
  const {user,URL} = useSelector(state => state)
  const [viewed, setViewed] = useState(false)

  const toggleAction = () => {
    if(openPostAction == false){
     setOpenPostAction(true)
     
   } else {
      setOpenPostAction(false)

    }
   }

   const deletePost = async(postId) => {
    
     const  res = await(await axios.delete(`${URL}/post/${postId}`,{headers: {Authorization: localStorage.getItem('token')}})).data

     if(res.status == 200){
       //refresh the post and update in UI using most preferably socket or api-ly

       let  res_posts = await(await axios.get(`${URL}/api/posts`)).data
     
     dispatch(actions.updatePosts(res_posts))
       
     }
   }


  useEffect(() => {

    checkViewed() 
  }, [])
     const checkViewed = () => {
      if (user !== null) {
        let status =  post.viewedBy.some((viewer) => {return viewer !== user._id })
        setViewed(status)
      }
     
     }
     return (
        
           <div classname="relative">
           <BsThreeDots onClick={toggleAction} className=' bg-white relative lg:left-[91%] left-[90%] my-[1em]' />

             {
                   openPostAction && post.author.username == user.username?
           
                  <div className="post_action border p-3 rounded-lg w-fit flex flex-col gap-[.5em] absolute  lg:left-[65%] right-[0%]">
           
           
                     <div  className="flex flex-row gap-[.25em] cursor-pointer">
                     <IoPencil className="text-blue-500 text-base mt-[.25em] "/>
                     <p className='font-[Sen] text-blue-500 text-base'>Edit Post</p>
                     </div>
                    
                    <hr></hr>
           
                     <div onClick={() => {deletePost(post.postId)}} className="flex flex-row gap-[.25em] cursor-pointer  " >
                     <AiFillDelete className="text-red-500 text-base mt-[.25em] "/>
                     <p className='font-[Sen] text-red-500 text-base'>Delete Post</p>

                      </div>
                    
           
           </div>
           
           :''
                  }


            <Link to={`/p/@${post.author.username}/${post.postId}`} state={post} className={additionalStyles +  ' bg-white w-full border-b-[1px] pt-[1em]   lg:p-[1em]'} >
           
            {
             post.coverImageURL &&  post.coverImageURL!== '' ?            
              <img src={post.coverImageURL} className={ showCoverImage + " w-[95%] rounded-sm ml-[.5em]"} alt="" />
                 : ''
         
            }
            <div>        
                  <AuthorInfo timestamp={post.created} collaborators={post.collaborators}  author={post.author}/>
                 
                <div className="tags w-full flex-wrap  flex flex-row ml-[2em] pr-[1.5em] m-auto gap-2 lg:pl-[3em]  lg:gap-[.5em] lg:ml-[-.3em] ">
                  {

                    post.tags.toString().split(',').map((tag) => {
                     return(
                      <>
                      
                     
                      <Tag key={tag} name={tag}/>
                      </>
                      )
                    })
                  }
                  
                 <p className='font-[Outfit]  text-start ml-[.5em] mx-[1.25em] leading-8 whitespace-normal font-extrabold text-2xl w-full my-[.5em] lg:text-3xl lg:mb-[.5em]  lg:ml-auto'>{post.title}</p>

                </div>
                <Reactions post={post} remove={removeReactions}/>
               {post.readingTime !== null ||   post.readingTime !== undefined || post.readingTime !== ''?
                  //-top-2
                <div className={readingTimeStyles + 'lg:relative lg:bottom-[0em] lg:left-[80%] md:relative md:left-[85%]  relative bottom-[.25em] mb-[1em]   left-[70%]'}>
                  <p className='font-[Sen] text-[#717171]'> {post.readingTime}</p>
                  </div> : ''}
                </div>
                 
 
         </Link>
         </div>
           
    )
}
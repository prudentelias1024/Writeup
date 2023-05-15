
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
import {  Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export default function Post({post, removeReactions, showCoverImage, readingTimeStyles, additionalStyles}) {
  const {user} = useSelector(state => state)
  const [viewed, setViewed] = useState(false)
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
        
           
            <Link to={`/p/@${post.author.username}/${post.postId}`} state={post} className={additionalStyles +  ' bg-white w-full border  rounded-lg   lg:p-[1em]'} >
             {      viewed ?                   
          <p className='font-[Outfit] mt-[1em] lg:mr-[0em] bg-green-200 text-green-500 font-semibold m-auto w-fit h-fit px-2 py-1 rounded-lg mb-[1em] lg:mb-[1em]'>Viewed </p>: ''
             }
           
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
                  
                 <p className='font-[Outfit]  text-start ml-[1em] mx-[1.25em] leading-8 whitespace-normal font-extrabold text-2xl w-full my-[.5em] lg:text-3xl lg:mb-[.5em]  lg:ml-auto'>{post.title}</p>

                </div>
                <Reactions post={post} remove={removeReactions}/>
               {post.readingTime !== null || post.readingTime !== undefined || post.readingTime !== ''?
                  //-top-2
                <div className={readingTimeStyles + 'lg:relative lg:bottom-[0em] lg:left-[80%] md:relative md:left-[85%]  relative bottom-[1em]   left-[67.5%]'}>
                  <p className='font-[Outfit] text-[#717171]'> {post.readingTime}</p>
                  </div> : ''}
                </div>
                 
 
         </Link>
    )
}
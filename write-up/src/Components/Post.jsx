
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
import {  Link} from "react-router-dom";
export default function Post({post, removeReactions}) {
  
     return (
        
           
            <Link to={`/p/@${post.author.username}/${post.postId}`} state={post} className='bg-white w-full border  rounded-lg   lg:p-[1em]' >


           
            {
             post.coverImageURL &&  post.coverImageURL!== '' ?            
              <img src={post.coverImageURL} className="w-full  rounded-sm ml-[.5em]" alt="" />
                 : null
         
            }
            <div>        
                  <AuthorInfo timestamp={post.created}  author={post.author}/>
                 
                 <p className='font-[Museo] px-[1em] text-start ml-[1em] mx-[1.25em] leading-8 whitespace-normal font-extrabold text-2xl w-full my-[.5em] lg:text-3xl lg:mb-[.5em]  lg:ml-auto'>{post.title}</p>
                <div className="tags w-full flex-wrap  flex flex-row ml-[3em] m-auto gap-2 lg:pl-[3em]  lg:gap-[.5em] lg:ml-[-.3em] ">
                  {

                    post.tags.toString().split(',').map((tag) => {
                     return(
                      <>
                      
                     
                      <Tag key={tag} name={tag}/>
                      </>
                      )
                    })
                  }
                  

                </div>
                <Reactions post={post} remove={removeReactions}/>
                </div>
                 
 
         </Link>
    )
}
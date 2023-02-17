import React, {useEffect, useState} from 'react';
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import NavBar from '../NavBar';
import tempImage from "../../mock.jpg";
import AuthorInfo from '../Post/AuthorInfo';
import Tag from '../Post/Tag';
import { useSelector } from 'react-redux';
import Comment from './comment';
import ReactQuill from 'react-quill';
import { useParams, useLocation } from 'react-router-dom';


const MyPosts = () => {
  const getPost = (posts,userId) => {
    console.log(posts)
    posts.filter((post) => {
      return post.postId == userId
    })
 }
 const {posts} = useSelector((state) => state)

  const params = useParams()
  const [post,setPost] = useState()
  
  getPost(posts,params.postId)
  console.log(getPost(post,params.postId))
 
  //  useEffect(()=> {
  //     console.log(getPost(posts,params.userId))
      
  //  },[posts])
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
    
    
    return (
        <>
        <NavBar/>
        <div className='flex flex-col gap-[1em] lg:top-32 lg:relative lg:flex lg:gap-[30em]'>
            <div className=" fixed flex impressions  z-10 border-1 bg-white bottom-0 w-full flex-row pt-8 pl-12 p-4 lg:ml-[30em] lg:pt-[10em] lg:flex lg:flex-col gap-[2em]">
                <button className='rounded-full flex lg:flex-col gap-[1em]'>
                    <FaRegHeart className='text-2xl lg:text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl">62</p>
                </button>
                <button className='rounded-full flex lg:flex-col gap-[1em]'>
                    <FaRegComment className='text-2xl lg:text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl">62</p>
                </button>
                <button className='rounded-full flex lg:flex-col gap-[1em]'>
                    <FaRegBookmark className='text-2xl lg:text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl">62</p>
                </button>
            </div>

            <div className="post lg:ml-[40em] -z-100 flex flex-col pt-[8em] bg-white lg:w-2/5 text-[#171717] rounded-lg">
            <img src={post.coverImageURL} className='w-full lg:h-[25em] object-cover' /> 
            <div className="author flex lg:gap-[1em] lg:my-[3em] lg:ml-[4.5em]">
             
             <AuthorInfo author={post.author} timestamp={post.created}/>
            </div>
            <div className='pl-[1em]'>
                <p className='text-2xl leading-8 font-black w-fit px-[.75em] lg:px-[2em] mb-[.25em] lg:text-4xl '>
                  {post.title}
                  </p>
                <div className='font-[Mulish]  lg:ml-[2.75em]'>
                  {/* {
                post.tags.toString().split(',').map((tag) => {
                  return(
                    <>
                    
                  
                    <Tag key={tag} name={tag}/>
                    </>
                    )
                  })
                  } */}
                <ReactQuill className='z-0'
                  value={post.body}
                  readOnly={true}
                  theme={"bubble"}
                />
                </div>
              </div>
            
            <div className="comments">
                <p className='ml-[2em] lg:ml-[3.75em] font-bold text-xl mb-[3em]'>Add Comment</p>
                <div className='add_comment m-auto rounded-lg pt-[1em] pl-[1em]  shadow-md w-4/5  flex flex-col mb-[5em] lg:ml-[5em]'>
                 <img className='w-[2.5em] h-[2.5em] object-cover rounded-full' src={tempImage} alt="Hi" />
                <div className='flex flex-row'>
               </div>
              
                <ReactQuill modules={modules} onChange={HandleComment} placeholder='Add Comment' theme='bubble'  style={{color: 'grey', paddingLeft: '3em', paddingBottom: '2em', background: "white", height: '30%', width: '100%'}} />
     
                <button className='bg-purple-500 text-white h-[2.5em] w-[10em] rounded-lg ml-[3em] mb-[1em] mt-[2em]'>Submit</button>


                </div>
                 <Comment image={tempImage}/>
                
                </div>           
                       
             </div>
            <div className="author_Profile w-full lg:fixed lg:right-[1em] p-7 bg-white lg:w-[23em] text-[#171717] rounded-lg">
                <div className='flex gap-[1em]'>
            <img src={tempImage} className='w-[3em] h-[3em] rounded-full object-cover' /> 
           <div>

            <p className="font-[Mulish] text-xl font-extrabold">Cyndi Lauretta</p>
            <p className="font-[Mulish] -mt-1 text-[#717171] text-base font-extrabold">@cylauretta</p>
          
                </div>
                
           </div>
          
          <div className="bio ml-[.5em] font-[Mulish] font-semibold leading-7 text-[#717171] mt-[1em]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta voluptate ex dicta beatae minus ipsa necessitatibus, in eos itaque sunt neque. Minima magni officia pariatur delectus neque. Sequi, velit dignissimos!
          </div>
          <div className=''>
            <p className='font-[Mulish] text-[#171717] font-extrabold mt-[1em] uppercase ml-2'>Joined On</p>
                    <p className='text-[#717171] font-bold ml-[.5em] mt-[.25em]'>23rd June 2023</p>
          </div>
          <button  className="bg-[#512bd4] text-white rounded-lg w-full  h-[3em] font-bold lg:ml-[3em] mt-[1em] lg:w-[15em]" type="button">
               Follow

          </button>
            </div>
            <div className="more_posts w-full py-7 lg:-bottom-1 lg:fixed lg:right-[1em] lg:p-7 bg-white lg:w-[23em]  text-[#171717]">
             <p className='font font-bold text-xl ml-7'>More posts from Cyndi Lauretta</p>
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
            </div>
            
        </div>
        </>
    );
}

export default MyPosts;

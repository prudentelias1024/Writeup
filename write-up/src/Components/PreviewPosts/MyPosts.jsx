import React, {useState} from 'react';
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';
import NavBar from '../NavBar';
import tempImage from "../../mock.jpg";
import AuthorInfo from '../Post/AuthorInfo';
import Tag from '../Post/Tag';
import { useSelector } from 'react-redux';
import Comment from './comment';
import ReactQuill from 'react-quill';
const MyPosts = () => {
    const user = useSelector((state) => state.user)
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
        <div className='top-32 relative flex gap-[30em]'>
            <div className=" fixed impressions ml-[30em] pt-[10em] flex flex-col gap-[2em]">
                <button className='rounded-full flex flex-col gap-[1em]'>
                    <FaRegHeart className='text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl">62</p>
                </button>
                <button className='rounded-full flex flex-col gap-[1em]'>
                    <FaRegComment className='text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl">62</p>
                </button>
                <button className='rounded-full flex flex-col gap-[1em]'>
                    <FaRegBookmark className='text-3xl text-black'/>
                    <p className="font-[Mulish] text-black text-xl">62</p>
                </button>
            </div>

            <div className="post ml-[40em] flex flex-col bg-white w-2/5 text-[#171717] rounded-lg">
            <img src={tempImage} className='w-full h-[25em] object-cover' /> 
            <div className="author flex gap-[1em] my-[3em] ml-[4.5em]">
             
             <AuthorInfo image={tempImage}/>
            </div>
            <div className='pl-[1em]'>
                <p className='text-4xl font-black w-fit px-[2em] mb-[.25em] '>The Benefits of Meditation</p>
                <div className='ml-[2.75em]'>
                <Tag  name="Health"/>
                <Tag name="Health"/>
                <Tag name="Health"/>
                <Tag name="Health"/>
                </div>
                <div className='px-[5em] leading-7 mt-[3em] mb-[7em]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nesciunt sunt labore ea cum voluptatibus repellat assumenda animi quod, iure libero quaerat quas ex deleniti sequi itaque a explicabo maiores. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab nesciunt dignissimos ducimus, earum molestias minima totam quae accusamus deserunt porro voluptatibus voluptas est maxime, enim quis cupiditate aspernatur neque eos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis natus distinctio, iure quo ut iusto explicabo, quam id ipsum eveniet commodi harum nulla doloremque, recusandae odit. Consectetur eaque eos fuga.
                </div>
            </div>
            
            <div className="comments">
                <p className='ml-[3.75em] font-bold text-xl mb-[3em]'>Add Comment</p>
                <div className='add_comment rounded-lg pt-[1em] pl-[1em]  shadow-md w-4/5 ml-[5em] flex flex-col mb-[5em]'>
                 <img className='w-[2.5em] h-[2.5em] object-cover rounded-full' src={user.public_picture} alt={user.name} />
                <div className='flex flex-row'>
               </div>
                {/* <textarea name="comment" className='outline-none w-5/6 h-[7.5em] mt-[1em] ml-[3.5em]'></textarea> */}
                <ReactQuill modules={modules} onChange={HandleComment} placeholder='Add Comment' theme='bubble'  style={{color: 'grey', paddingLeft: '3em', paddingBottom: '2em', background: "white", height: '30%', width: '100%'}} />
     
                <button className='bg-purple-500 text-white h-[2.5em] w-[10em] rounded-lg ml-[3em] mb-[1em] mt-[2em]'>Submit</button>


                </div>
                 <Comment image={user.public_picture}/>
                
                </div>           
                       
             </div>
            <div className="author_Profile fixed right-[1em] p-7 bg-white w-[23em] text-[#171717] rounded-lg">
                <div className='flex gap-[1em]'>
            <img src={tempImage} className='w-[3em] h-[3em] rounded-full object-cover' /> 
           <div>

            <p className="font-[Mulish] text-xl font-extrabold">Cyndi Lauretta</p>
            <p className="font-[Mulish] -mt-1 text-[#717171] text-base font-extrabold">@cylauretta</p>
          
                </div>
                
           </div>
           <button  className="bg-[#512bd4] text-white rounded-lg w-[15em]  h-[3em] font-bold ml-[3em] mt-[1em]" type="button">
               Follow

          </button>
          <div className="bio ml-[.5em] font-[Mulish] font-semibold leading-7 text-[#717171] mt-[1em]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta voluptate ex dicta beatae minus ipsa necessitatibus, in eos itaque sunt neque. Minima magni officia pariatur delectus neque. Sequi, velit dignissimos!
          </div>
          <div className=''>
            <p className='font-[Mulish] text-[#171717] font-extrabold mt-[1em] uppercase ml-2'>Joined On</p>
                    <p className='text-[#717171] font-bold ml-[.5em] mt-[.25em]'>23rd June 2023</p>
          </div>
          
            </div>
            <div className="more_posts -bottom-1 fixed right-[1em] p-7 bg-white w-[23em]  text-[#171717]">
             <p className='font font-bold text-xl'>More posts from Cyndi Lauretta</p>
             <div className='flex flex-col gap-8 pt-[1.5em] pb-[1.5em] mb-[1.5em]'>
                <div className='block hover:bg-[#ededed] w-full '>
                    <p className='text-md text-[#717171]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className='flex flex-row -ml-[1.8em] mt-[.5em]'>

                   <Tag name="lorem"/>
                    <Tag name="lorem"/>
                    <Tag name="lorem"/>
                    <Tag name="lorem"/>
                    
                  </div>

                </div>
                
                <div className='block hover:bg-[#ededed] w-full '>
                    <p className='text-md text-[#717171]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className='flex flex-row -ml-[1.8em] mt-[.5em]'>

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

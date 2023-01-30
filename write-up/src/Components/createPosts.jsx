import React, { useState } from 'react';
import ReactQuill from 'react-quill'
import '../../node_modules/react-quill/dist/quill.bubble.css'

const CreatePosts = () => {
    // const [value, setValue] = useState('')
    return (
        <div className="create">
 <div className="ml-14">
      <p className="font-[Pacifico] mt-5 text-3xl font-extrabold ml-52 ">Ink Up</p>
  </div>

        <div className='text-editor bg-white text-black w-3/5 h-/5 flex flex-col border ml-[20em] mt-[5em] rounded-xl'>
        <button type='button' className='font-[Mulish]  w-[15em] h-[4em] ml-8 font-bold border mt-[2em] mb-[2em]'>Add Cover Image</button>
        <input name='title' placeholder='Add Post Title '
                    className="rounded-md pl-[2.5em] outline-none   font-[Museo]  w-full font-bold placeholder:font-[Museo] placeholder:font-bold text-3xl h-[3em]" />
        <input name='tags' placeholder='Add up to 4 tags '
                    className="rounded-md pl-[3em] outline-none   font-[Museo]  w-full font-bold placeholder:font-[Museo] placeholder:font-extralight text-xl text-gray-400 h-[3em]" />
 
        <ReactQuill placeholder='Start Inking' theme='bubble'  style={{color: 'grey', paddingLeft: '3em', paddingBottom: '30em', background: "white", height: '100%', width: '100%'}} />
      
        </div>
        <div  className='-ml-24'  >
        <button className="bg-black text-white ml-[30em] rounded-lg w-[15em] mt-[2em] h-[4em]" type="submit">
               <p className='font-[Museo] text-xl font-semibol'>Publish</p>

          </button>
         <button type='submit' className='font-[Mulish] ml-8 font-bold'>Save as draft</button>
        </div>
        </div>
    );
}
   

// CreatePosts.modules = {
//     toolbar: [
//         [{header: "1"},{header: "2"},{font: []}],
//         [{size: []}],
//         ["bold","italic", "underline", "strike", "blockquote"],
//         [{list:"ordered"}, {list: "bullet"}],
//         ["link", "image", "video"],
//         ["clean"],
//         ["code-block"]
//     ]
// }
// CreatePosts.formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     "video",
//     "color",
//     "indent",
//     "code block"
// ]
export default CreatePosts;

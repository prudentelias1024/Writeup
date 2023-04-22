import {React, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from '../../time';

const DraftPosts = ({draft}) => {
    const {user} = useSelector(state => state)
    useEffect(() => {
       
    },[])
return (
 <div className="flex flex-col justify-around border rounded-xl  w-[90%] -ml-4  h-fit bg-white py-2  lg:flex-row max-lg:w-[60em] lg:w-[45em] lg:px-4 lg:py-6 lg:ml-[-2.5em]">
<div className='flex flex-col '>
    <p className="text-[#3b49df] text-xl w-full px-4 leading-8 lg:text-2xl font-bold font-[Outfit]" >{draft.title}</p>
   
    <div className="dates flex gap-3 flex-row">
    <p className='font-bold text-[#787878] p-2 ml-2'>Created on: {format(draft.createdAt)}</p> 
  {
    draft.edited !== undefined ?            <p className='font-bold text-[#787878] p-2 ml-2'>Edited: 30 Jan</p> 
:''
  }

    { draft.author._id !== user.id?

   
    <p className='font-bold text-[#787878] p-2 ml-2'>Created by: 
    <Link to={'/'+ draft.author.username}>
    {draft.author.name}
    </Link>
    </p> : ''
}
  {
    draft.edited !== undefined ?            <p className='font-bold text-[#787878] p-2 ml-2'>Edited: 30 Jan</p> 
:''
}

    </div>



    </div>
    <div className="impressions flex flex-row gap-3 mt-2.5 -ml-5">
    <div className="post_actions flex flex-row gap-3 -mt-2.5">
                <Link state={draft} to={'/post'+'/edit/'+draft.draftId}  className="font-[Outfit]  mt-2 text-bold text-green-500">Edit</Link>

    </div>
    {
        user._id == draft.author ?
          <div className="post_actions flex flex-row gap-3 -mt-2.5"> <p className="font-[Outfit]  mt-2 text-bold text-red-500">Delete</p>  </div>: ''
        
    }
    </div>
    </div>
)
}
    

export default DraftPosts
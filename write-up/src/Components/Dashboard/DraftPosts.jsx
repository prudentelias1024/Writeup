import {React} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from '../../time';

const DraftPosts = ({draft}) => {
    const {user} = useSelector(state => state)
return (
 <div className="flex flex-col justify-around border rounded-xl  w-[90%] ml-4  h-fit bg-white py-2  lg:flex-row max-lg:w-[60em] lg:w-[45em] lg:px-4 lg:py-6 lg:ml-[2em]">
<div className='flex flex-col'>
    <Link className="text-[#3b49df] text-xl w-full px-4 leading-8 lg:text-2xl font-bold font-[Outfit]" to={'/p/@'+user.username+'/'+draft.postId}>{draft.title}</Link>
   
    <div className="dates flex gap-3 flex-row">
    <p className='font-bold text-[#787878] p-2 ml-2'>Published: {format(draft.createdAt)}</p> 
  {
    draft.edited !== undefined ?            <p className='font-bold text-[#787878] p-2 ml-2'>Edited: 30 Jan</p> 
:''
  }

    </div>
    </div>
    </div>
)
}
    

export default DraftPosts
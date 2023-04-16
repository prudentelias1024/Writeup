import DetailsCard from '../Dashboard/DetailsCard'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
const AdminDashboard = () => {
    let URL;
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [notifications, setNotifications] = useState([])
    const [drafts, setDrafts] = useState([])
    const getAnalytics = async() => {
        const users = await ( await axios.get(`${URL}/api/admin/users`, {headers: {Authorization:localStorage.getItem('token') }})).data

        setUsers(users)

        const posts = await ( await axios.get(`${URL}/api/admin/posts`, {headers: {Authorization:localStorage.getItem('token') }})).data
        
        setPosts(posts)

        const notifications = await ( await axios.get(`${URL}/api/admin/notifications`, {headers: {Authorization:localStorage.getItem('token') }})).data
        setNotifications(notifications)
    
        const drafts = await ( await axios.get(`${URL}/api/admin/drafts`, {headers: {Authorization:localStorage.getItem('token') }})).data
        setDrafts(drafts)

 

    }
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
          setTimeout(() => {
            
              getAnalytics() 
          }, 2000);
    }
, [])
    return (
        <div className='flex flex-col gap-[1em]'>
        <p className="font-[Outfit] text-3xl my-[1em] lg:ml-[2em] font-bold">App Analytics</p>
        <div className='lg:flex lg:flex-row grid grid-cols-2 px-[.5em] lg:px-[3em] '>
            <DetailsCard text="Total Users" amount={users.length}  color="bg-green-500" />
            <DetailsCard text="Total Posts" amount={posts.length}  color="bg-red-500" />
            <DetailsCard text="Total Drafts" amount={drafts.length}  color="bg-purple-500" />
            <DetailsCard text="Total Notifications" amount={notifications.length}  color="bg-orange-500" />
        </div>
         <p className="font-[Outfit] text-2xl lg:text-3xl my-[1em] ml-[1em] lg:ml-[2em] font-bold"> Users ({users.length})</p>
         <div className='users flex flex-col gap-[1em] '>
            {

                users && users.length > 0 ? users.map((user,index) =>{
                    return          <div key={index} className='user flex flex-row ml-[1em] lg:ml-[3em] gap-[1em]'>
        <img src={user.public_picture} alt={user.namae} className='rounded-full h-[3.5em] w-[3.5em]'/>
        <div className='flex-col'>
        <p className='fullname text-xl font-[Outfit] font-bold'>
            <Link to={'/'+user.username}>{user.name}</Link>
            </p>
        <p className="username text-xl font-[Outfit] text-[#a2a2a2] font-bold">
        <Link to={'/'+user.username}>
            @{user.username}
            </Link>
            </p>
        </div>
        
        
        
         </div>
        
        
    })
         : ''
}
</div>
         <p className="font-[Outfit] text-2xl lg:text-3xl my-[1em] ml-[1em] lg:ml-[2em] font-bold"> Published Posts ({posts.length})</p>
         <div className='posts flex flex-col gap-[1em] '>
            {

                posts && posts.length > 0 ? posts.map((post,index) =>{
                    return          <div key={index} className='post flex flex-row pr-[1em] ml-[.5em] lg:ml-[3em] gap-[1em]'>
        <img src={post.author.public_picture} alt={post.author.name} className='rounded-full h-[3.5em] w-[3.5em]'/>
        <div className='flex-col'>
        <p className='post_title text-xl font-[Outfit] font-bold pr-[1em]'>{post.title}  created by &nbsp;
        <Link to={'/'+post.author.username}>
        {post.author.name}
        </Link>
        </p>
        <Link className='mr-[2em]' to={'/'+post.author.username}>
        <p className="author_username text-xl font-[Outfit] text-[#a2a2a2] font-bold mr-[3em] h-[1.5em]">@{post.author.username}</p>
        </Link>
        </div>
        
        
        
         </div>
        
        
    })
         : ''
}
</div>
         <p className="font-[Outfit] lg:text-3xl my-[1em] lg:ml-[2em] ml-[1em] font-bold text-2xl"> Drafted Posts ({drafts.length})</p>
         <div className='posts flex flex-col gap-[1em] '>
            {

                drafts && drafts.length > 0 ? drafts.map((draft,index) =>{
                    return          <div key={index} className='draft flex flex-row ml-[3em] gap-[1em]'>
        <img src={draft.author.public_picture} alt={draft.author.name} className='rounded-full h-[3.5em] w-[3.5em]'/>
        <div className='flex-col'>
        <p className='draft_title text-xl font-[Outfit] font-bold'>{draft.title} drafted by
        <Link to={'/'+draft.author.username}>
         {draft.author.name}
         </Link>
         </p>
        
        <Link to={'/'+draft.author.username}>
            <p className="author_username text-xl font-[Outfit] text-[#a2a2a2] font-bold">@{draft.author.username}</p>
            </Link>
        </div>
        
        
        
         </div>
        
        
    })
         : <p className='font-[Outfit] text-2xl my-[1em] ml-[2em] font-extralight text-center'> No draft post yet!!</p>
}
</div>
 </div>

)
}

export default AdminDashboard
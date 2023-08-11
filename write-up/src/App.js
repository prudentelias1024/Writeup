import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import CreatePosts from './Components/createPosts';
import { useState } from 'react';
import Page404 from './Components/Page404';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./store/index";
import Settings from './Components/settings';
import Notifications from './Components/Notifications';
import MyPosts from './Components/PreviewPosts/MyPosts';
import Logout from './Components/logout';
import Followers from './Components/Dashboard/children/Followers';
import Following from './Components/Dashboard/children/Following';
import Tags from './Components/Tags';
import TagTemplate from './Components/Tag/TagTemplate';
import ReadLater from './Components/ReadLater';
import SearchPage from './Components/Search/SearchPage';
import FAQ from './Components/FAQ';
import MyProfile from './Components/MyProfile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Podcast from './Components/Podcast';
import Podcasts from './Components/Podcasts';
import CreatePodcast from './Components/createPodcast';
import PostEditor from './Components/postEditor';
import { async } from '@firebase/util';
import Billing  from './Components/Billing/billing';
import Search from './Components/Search/Search';
import Trends from './Components/trends';
function App() {
       
        let URL
        const user = useSelector((state) => state.user)
      const dispatch = useDispatch()
      const navigate = useNavigate()
   
      const getReels = async() => {
        let reels = await (await axios.get(`${URL}/reels`)).data; 
        let options = []
        reels.map((reel) => {

        
        if(reel.options.length > 0){
          let totalVotes = 0
          reel.options.map((option) => {
            totalVotes += option.vote
            
             
            })
            reel.totalVotes = totalVotes
            if(totalVotes !== 0){
  
            
            reel.options.map((option,index) => {
             let vote = option.vote
           
  
             let percentage =  (vote/ totalVotes) * 100
          option = {...option, percentage: percentage }
          options.push(option)

        })
           reel.options = options
          options = []
      
         
      } else {
       
          reel.options.map((option,index) => {
             option = {...option, percentage: 0 }
             options.push(option)

             })
             reel.options = options
             options = []
           
          
      
            }
          }
        })

          dispatch(actions.updateReels(reels))
  }
  const getPodcasts = async() => {
   const podcasts =  (await axios.get(`${URL}/podcasts`)).data.data
   dispatch(actions.updatePodcasts([...podcasts]))

   }

      const loadUser = async() => {
          const info = await (await axios.get(`${URL}/api/user`,{headers: {Authorization: localStorage.getItem('token')}}
           )).data;
           if(info == null || info == undefined){
            navigate('/login')
             
       
    }

           let isAdmin = false
           if(info.username == 'InkupOfficial' && info.username == 'prudentelias'){
            isAdmin = false
           }
           dispatch(actions.updateUser({...info, isAdmin: isAdmin}))
       
       }
       const getPosts = async() => {
        let  res_posts = await(await axios.get(`${URL}/api/posts`)).data
         console.log(res_posts)
       dispatch(actions.updatePosts(res_posts))
     }
       const getPersonalisedPosts = async() => {
        let  res_posts = await(await axios.get(`${URL}/api/posts/personalised`,{headers: {Authorization: localStorage.getItem('token')}})).data
        
       dispatch(actions.updatePosts(res_posts))
     }
       const getNotifications = async() => {
        let  notifications = await(await axios.get(`${URL}/api/notifications`,{headers: {Authorization: localStorage.getItem('token')}})).data
       dispatch(actions.updateNotifications(notifications))
       console.log(notifications)
     }

     const getBookmarkedPosts = async() => {
      let bookmarked_post = await (await axios.get(`${URL}/api/bookmarked`,{headers: {Authorization: localStorage.getItem('token')}})).data
      console.log(bookmarked_post)
       dispatch(actions.updateBookmarkedPosts(bookmarked_post))
     }
      useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
          dispatch(actions.updateURL("https://inkup-api.onrender.com"))
          URL = "https://inkup-api.onrender.com"

        }else{
          
          dispatch(actions.updateURL("http://localhost:5000"))
          URL =  "http://localhost:5000" 
        }
    
        console.log(URL)
          getPosts();
          getPodcasts()
          getReels()
        getBookmarkedPosts();
        if (localStorage.getItem('token') !== undefined) {
          getPersonalisedPosts()
          loadUser();
          getNotifications()
          
        }

        const updateLastVisitation = async() => {
         let res =  (await axios.post(`${URL}/api/user/attendance`,{moment: new Date}, {headers: {Authorization: localStorage.getItem('token') }})).data
        }
    
       
          updateLastVisitation()
       
      }
      , []);
  
  return (
    <>
    <div className="overflow-x-hidden bg-white">
      
    <Routes>

      <Route path='*' element={<Page404/>}/>
      <Route path='/notifications' element={<Notifications/>}/>
      <Route path='/tag/:name' element={<TagTemplate/>}/>
      <Route path='/p/:username/:postId' element={<MyPosts/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/trends' element={<Trends/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/create' element={<CreatePosts/>}/>
      <Route path='/Dashboard'  element={<Dashboard/>}/>
      <Route path='/:username'  element={<Profile/>}/>
      <Route path='/Dashboard/followers'  element={<Followers/>}/>
      <Route path='/Dashboard/following'  element={<Following/>}/>
      <Route path='/Profile' element={<MyProfile/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/hashtags' element={<Tags/>}/>
      <Route path='/readlater' element={<ReadLater/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/search/results' element={<SearchPage/>}/>
      <Route path='/faq' element={<FAQ/>}/>
      <Route path='/admin' element={<AdminDashboard/>} />
      <Route path='/podcasts' element={<Podcasts/>} />
      <Route path='/post/edit/:draftId' element={<PostEditor/>} />
       <Route path='/addPodcast' element={<CreatePodcast/>} />
       <Route path='/billing' element={<Billing/>} />
    </Routes>
    
    </div>
      
    </>
   
  );
}

export default App;

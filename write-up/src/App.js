import './App.css';
import {Routes, Route} from 'react-router-dom'
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
function App() {
        const user = useSelector((state) => state.user)
      const dispatch = useDispatch()
  
      console.log(user)
      const loadUser = async() => {
          const info = await (await axios.get('http://localhost:5000/api/user',{headers: {Authorization: localStorage.getItem('token')}}
           )).data;
           dispatch(actions.updateUser(info))
           
       }
      useEffect(() => {
          loadUser()
      }
      , []);
  
  return (
    <>
    
    <Routes>

      <Route path='*' element={<Page404/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/create' element={<CreatePosts/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Profile' element={<Profile/>}/>
     
    </Routes>
    
      
    </>
   
  );
}

export default App;

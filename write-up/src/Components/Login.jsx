import React, { useState, useContext, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import Button from './Navbar/Button';
import {FcGoogle} from 'react-icons/fc'
import {BsFacebook, BsTwitter} from 'react-icons/bs'
import { AiFillInstagram } from "react-icons/ai";
import { HiOutlineMail  } from "react-icons/hi";
import { Link, Navigate, useNavigate,  } from 'react-router-dom';
import {  useGoogleLogin } from '@react-oauth/google';
import {  useFacebook, useLogin, useProfile} from "react-facebook";
import axios  from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store';
const Login = () => {
   const {URL} = useSelector(state => state)
   const navigate = useNavigate()
    
   const [token,setToken] = useState()

    const {login, status, isLoading, error} = useLogin({access_token: token})
   
    const {profile} = useProfile()
   
    const [email, setEmail] = useState()
   const twitterRef = useRef()
    const dispatch = useDispatch()
    const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
       let user =   await(await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
        }
       })).data;
    
       console.log(user);
       console.log(URL);
       
       const res = await(await axios.post(`${URL}/api/login`,{googleId:user.sub,account_type: 'google'},{withCredentials:true}))
       if (res.message =='User Doesn\t Exists') {
      
          let res = await (await axios.post(`${URL}/api/signup`, {
       name:user.name, email:user.email, public_picture: user.picture, username: user.email, joined_on:
       new Date, account_type: 'google' ,joined_on: new Date, account_type:'google', googleId: user.sub}
        ,{withCredentials:true})).data;
        if(res.message == 'User Created'){
            let res   = await (await axios.post(`${URL}/api/login`, {username: user.email, account_type: 'google'})).data
            console.log(res)
          
          }
       } 
       console.log(res)
        localStorage.setItem("token",res.data.Authorization);
        const info = await (await axios.get(`${URL}/api/user`,{headers: {Authorization: localStorage.getItem('token')}}
        )).data;
        dispatch(actions.updateUser(info))
        navigate('/')
       
       


    
      
       
    
    }
    
})

    return (
        <div className='bg-white flex flex-col  '>
        <div className="ml-7">
      <p className="font-[Pacifico] mt-5 text-3xl font-extrabold text-center">Ink Up</p>
  </div>
          <div className='flex flex-col lg:place-self-center mb-12'>
       
          <p className="text-[Sen] font-bold text-3xl ml-[.5em] ">Login</p>
       
          <button onClick={() => {loginWithGoogle()}} className="bg-black w-[95%] ml-3 text-white lg:ml-12 rounded-lg lg:w-[45em] mt-[2em] h-[4em]" type="submit">
          <FcGoogle className='text-4xl ml-3'/>
              <p className='font-[Sen] text-xl font-semibold -mt-8 ml-3 '>Login With Google</p>

          </button>
          <p className="text-[Sen] font-semibold text-lg mt-[2em] ml-[50%]">OR</p>
      
         <div className="flex flex-col gap-[1.5em] mt-[5em]">
        
         <div className='flex flex-col gap-[1em]'>
        <p className="text-[Sen] font-semibold text-lg ml-[1em] ">Email</p>
          <input type="text" name="email" className='h-[2.5em] p-4 border  ml-[1em] w-[80%] text-[Outfit] ' placeholder='Enter your Email' />
         </div>
        
         <div className='flex flex-col gap-[1em]'>
         <p className="text-[Sen] font-semibold text-lg ml-[1em] ">Password</p>
          <input type="password" name="password" className='h-[2.5em] p-4 border  ml-[1em] w-[80%] text-[Outfit] ' placeholder='Enter password' />
         </div>


         <button onClick={() => {loginWithGoogle()}} className="bg-black w-[95%] ml-3 text-white lg:ml-12 rounded-lg lg:w-[45em] mt-[2em] h-[4em]" type="submit">
            <p className='font-[Sen] text-xl font-semibold  ml-3 '>Login</p>

          </button>
  
         </div>

          <div className='flex flex-col m-auto lg:flex-row mt-9 mb-72'>

          <p className="font-[Sen] text-xl lg:text-2xl">
              Already Have an Account??
          </p>
          <Link to="/signup" className='text-2xl lg:ml-3 font-[Sen]  text-blue-500'>Sign up</Link>
          </div>
          </div>
              
      </div>
    );
}

export default Login;

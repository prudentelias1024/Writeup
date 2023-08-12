import React, { useContext, useEffect } from 'react';
import NavBar from './NavBar';
import Button from './Navbar/Button';
import {FcGoogle} from 'react-icons/fc'
import {BsTwitter} from 'react-icons/bs'
import { AiFillInstagram } from "react-icons/ai";
import { HiOutlineMail  } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import {storage } from "../firebase";
import {v4} from 'uuid'
import { useDispatch } from 'react-redux';
import { actions } from '../store';
const SignUp = () => {
    let URL =  "https://inkup-api.onrender.com";
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }
    },[])
     const navigate = useNavigate()
     const dispatch = useDispatch()
   const signUpWithGoogle = useGoogleLogin({
    onSuccess: async(response) => {
        console.log(response)
        let  user = await (await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers:{
                Authorization: `Bearer ${response.access_token}`
            }
        })).data;

         console.log(URL)
    //   let pictureBuffer = await (await axios.post('https://writeup-37ap.vercel.app/api/publicPicture', { token: response.access_token, public_picture: user.picture }
    //         ,{withCredentials:true})).data;
    //         console.log(pictureBuffer)
    //         let file = new File([pictureBuffer], 'image.png', );
           
    //         let pictureRef = ref(storage,`profileImage/${v4()}`)
       
    //    uploadBytes(pictureRef, file, {contentType: 'image/png'}).then(() => {
    //          getDownloadURL(pictureRef).then((url)=> {
    //                 user.picture = url
    //          })
    //     })
    //     console.log(user)
      let res = await (await axios.post(`${URL}/api/signup`, {
       name:user.name, email:user.email, public_picture: user.picture, username: user.email, joined_on:
       new Date, account_type: 'google' ,joined_on: new Date, account_type:'google',googleId: user.sub}
    ,{withCredentials:true})).data;
   
    if(res.message == 'User Created' || res.message == 'User Exists'){
       
      let res   = await (await axios.post(`${URL}/api/login`, {googleId: user.sub, account_type: 'google'})).data
     localStorage.setItem("token",res.Authorization);
      
        const info = await (await axios.get(`${URL}/api/user`,{headers: {Authorization: localStorage.getItem('token')}}
         )).data;
         dispatch(actions.updateUser(info))
     
    
      navigate('/')
    } 
   }
}) 
 
    return (
        <div className='bg-white flex flex-col  '>
        <div className="ml-7">
      <p className="font-[Pacifico] mt-5 text-3xl font-extrabold text-center">Ink Up</p>
  </div>
          <div className='flex flex-col  mb-[10em] ml-[-.5em]'>
         
          <button onClick={() => {signUpWithGoogle()}} className="bg-black text-white w-[95%] ml-3 lg:ml-12 rounded-lg lg:w-[45em] mt-[6em] h-[4em]" type="submit">
              <FcGoogle className='text-4xl mr-3 ml-3'/>
              <p className='font-[Sen] text-xl font-semibold -mt-8 ml-6 '>Continue With Google</p>

          </button>
          <button className="bg-black text-white  ml-3 lg:ml-12 rounded-lg w-[95%] lg:w-[45em] mt-[2em] h-[4em]" type="submit">
              <BsTwitter className='text-[1d9bf0] text-4xl mr-3 ml-3'/>
              <p className='font-[Sen] text-xl font-semibold -mt-8 ml-3 '>Continue With Twitter</p>

          </button>
          <button className="bg-black text-white w-[95%] ml-3 lg:ml-12 rounded-lg lg:w-[45em] mt-[2em] h-[4em]" type="submit">
              <AiFillInstagram className='text-[1d9bf0] text-4xl mr-10 ml-3'/>
              <p className='font-[Sen] text-xl font-semibold -mt-8 ml-12 '>Continue With Instagram</p>

          </button>
          
          <div className='flex flex-col m-auto lg:flex-row mt-9 mb-72'>

          <p className="font-[Sen] text-2xl">
               Have an Account??
          </p>
          <Link to="/login" className='text-2xl font-[Sen] lg:ml-3 text-blue-500'>Login</Link>
          </div>
          </div>
              
      </div>
    );
}

export default SignUp;

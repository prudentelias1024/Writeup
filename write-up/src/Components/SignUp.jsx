import React, { useContext } from 'react';
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
import { userContext } from '../Contexts/userContext';

const SignUp = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({});
    const {setUser} = useContext(userContext)
   const signUpWithGoogle = useGoogleLogin({
    onSuccess: async(response) => {
        console.log(response)
        setUserInfo(await (await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers:{
                Authorization: `Bearer ${response.access_token}`
            }
        })).data);
      
      let res = await (await axios.post('http://localhost:5000/api/signup', {
       name:userInfo.name, email:userInfo.email, public_picture: userInfo.picture, username: userInfo.email, joined_on:
       new Date, account_type: 'google' ,joined_on: new Date, account_type:'google'}
    ,{withCredentials:true})).data;
    console.log(res)
    if(res.message == 'User Created' || res.message == 'User Exists'){
      let res   = await (await axios.post('http://localhost:5000/api/login', {username: userInfo.email, account_type: 'google'})).data
      console.log(res)
   
    }
    }
   }) 
 console.log(userInfo)
 
    return (
        <div className='bg-white flex flex-col  '>
        <div className="ml-14">
      <p className="font-[Pacifico] mt-5 text-3xl font-extrabold text-center">Ink Up</p>
  </div>
          <div className='flex flex-col place-self-center mb-12'>
         
          <button onClick={() => {signUpWithGoogle()}} className="bg-black text-white ml-12 rounded-lg w-[45em] mt-[6em] h-[4em]" type="submit">
              <FcGoogle className='text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-3 '>Continue With Google</p>

          </button>
          <button className="bg-black text-white ml-12 rounded-lg w-[45em] mt-[2em] h-[4em]" type="submit">
              <BsTwitter className='text-[1d9bf0] text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-3 '>Continue With Twitter</p>

          </button>
          <button className="bg-black text-white ml-12 rounded-lg w-[45em] mt-[2em] h-[4em]" type="submit">
              <AiFillInstagram className='text-[1d9bf0] text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-7 '>Continue With Instagram</p>

          </button>
          
          <div className='flex flex-row mt-9 mb-72'>

          <p className="font-roboto text-2xl">
              Already Have an Account??
          </p>
          <Link to="/login" className='text-2xl ml-3 text-blue-500'>Login</Link>
          </div>
          </div>
              
      </div>
    );
}

export default SignUp;

import React, { useState, useContext } from 'react';
import NavBar from './NavBar';
import Button from './Navbar/Button';
import {FcGoogle} from 'react-icons/fc'
import {BsTwitter} from 'react-icons/bs'
import { AiFillInstagram } from "react-icons/ai";
import { HiOutlineMail  } from "react-icons/hi";
import { Link, Navigate,  } from 'react-router-dom';
import {  useGoogleLogin } from '@react-oauth/google';

import axios from 'axios'
import {userContext} from '../Contexts/userContext';
const Login = () => {
  
    const {setUser, user} = useContext(userContext);
     const loginWithGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => 
       setUser(await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
        }
       })),
      
       
    
        
    
})
 
console.log(user)
    return (
        <div className='bg-white flex flex-col  '>
        <div className="ml-14">
      <p className="font-[Pacifico] mt-5 text-3xl font-extrabold text-center">Ink Up</p>
  </div>
          <div className='flex flex-col place-self-center mB-12'>
      
          <button onClick={() => loginWithGoogle()} className="bg-black text-white ml-12 rounded-lg w-[45em] mt-[2em] h-[4em]" type="submit">
          <FcGoogle className='text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-3 '>Login With Google</p>

          </button>
          <button onClick={() => loginWithGoogle()} className="bg-black text-white ml-12 rounded-lg w-[45em] mt-[2em] h-[4em]" type="submit">
              <BsTwitter className='text-[1d9bf0] text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-3 '>Login With Twitter</p>

          </button>
          <button className="bg-black text-white ml-12 rounded-lg w-[45em] mt-[2em] h-[4em]" type="submit">
              <AiFillInstagram className='text-[1d9bf0] text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-7 '>Login With Instagram</p>

          </button>
          <form className='flex flex-col gap-10 ml-2 mt-10' >
            <div>
            <label htmlFor="Email" className=" font-[Museo] text-2xl mb-5">Email</label>
                <input 
                    className="rounded-md  border font-[Museo] text-xl w-full font-bold placeholder:font-[Museo] placeholder:font-bold placeholder:ml-12 h-[3em]" />
            
            </div>
            <div>
            <label htmlFor="Password" className=" font-[Museo] text-2xl mb-5">Password</label>
                <input 
                    className="rounded-md  border font-[Museo] text-xl w-full font-bold placeholder:font-[Museo] placeholder:font-bold placeholder:ml-12 h-[3em]" />
            
            </div>
            <button className="bg-blue-500 text-white  rounded-lg w-[50em] mt-[2em] h-[4em] -ml-5" type="submit">
              <HiOutlineMail className='text-[1d9bf0] text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-7 '>Login with Email</p>

          </button>
            </form>
          <div className='flex flex-row mt-9 mb-72'>

          <p className="font-roboto text-2xl">
              Already Have an Account??
          </p>
          <Link to="/signup" className='text-2xl ml-3 text-blue-500'>Sign up</Link>
          </div>
          </div>
              
      </div>
    );
}

export default Login;

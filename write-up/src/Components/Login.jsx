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
import {userContext} from '../Contexts/userContext';
import axios  from 'axios';
import { useDispatch } from 'react-redux';
import { actions } from '../store';
import TwitterLogin from 'react-twitter-login-button'
const Login = () => {
    let URL  = "https://inkup-api.onrender.com";
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            URL = "https://inkup-api.onrender.com"
          }else{
            URL = "http://localhost:5000"
                   
          }

    }, [])
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
    const loginWithFacebook = async() => {
     try {
        const response = await login({
            scope: 'public_profile,email'
        })
       setToken(response.authResponse.accessToken)
            console.log(profile)
        
     } catch (error) {
        console.log(error.message)
     }
    }
 
     const loginWihTwitter = () => {
      
    
     }
     
  
        



    return (
        <div className='bg-white flex flex-col  '>
        <div className="ml-14">
      <p className="font-[Pacifico] mt-5 text-3xl font-extrabold text-center">Ink Up</p>
  </div>
          <div className='flex flex-col lg:place-self-center mB-12'>
      
          <button onClick={() => {loginWithGoogle()}} className="bg-black w-[95%] ml-3 text-white lg:ml-12 rounded-lg lg:w-[45em] mt-[2em] h-[4em]" type="submit">
          <FcGoogle className='text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-3 '>Login With Google</p>

          </button>
         <button onClick={loginWithFacebook} disabled={isLoading} className="bg-black w-[95%] ml-3 text-white lg:ml-12 rounded-lg lg:w-[45em] mt-[2em] h-[4em]" type="submit">
              <BsFacebook className='text-[1d9bf0]  text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-3 '>Login With Facebook</p>

          </button>
         
          <button onClick={() => {loginWihTwitter()}} className="bg-black text-white  w-[95%] ml-3 lg:ml-12 rounded-lg lg:w-[45em] mt-[2em] h-[4em]" type="submit">
              <BsTwitter className='text-[1d9bf0] text-4xl ml-3'/>
              <p className='font-[Museo] text-xl font-semibold -mt-8 ml-3 '>Login With Twitter</p>

          </button>
         
         
        
          <form className='flex flex-col gap-10 ml-2 mt-10'  >
            <div>
            <label htmlFor="Email" className=" font-[Museo] text-2xl ml-3 mb-5">Email</label>
                <input 
                   onChange={(e) => {setEmail(e.target.value); console.log(email)}} className=" ml-3  w-[95%] rounded-md  border font-[Museo] text-xl lg:w-full font-bold placeholder:font-[Museo] placeholder:font-bold placeholder:ml-12 h-[3em]" />
            
            </div>

            <button className="bg-blue-500 text-white w-[95%] ml-3  rounded-lg lg:w-[50em] mt-[2em] h-[4em] lg:-ml-5" type="submit">
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

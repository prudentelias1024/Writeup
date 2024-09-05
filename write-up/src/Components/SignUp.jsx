import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import Button from "./Navbar/Button";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { actions } from "../store";
const SignUp = () => {
  let URL = "https://inkup-api.onrender.com";
  useEffect(() => {
    if (process.env.NODE_ENV == "production") {
      URL = "https://inkup-api.onrender.com";
    } else {
      URL = "http://localhost:5000";
    }
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      let user = await (
        await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        })
      ).data;

      console.log(URL);
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
      let res = await (
        await axios.post(
          `${URL}/api/signup`,
          {
            name: user.name,
            email: user.email,
            public_picture: user.picture,
            username: user.email,
            joined_on: new Date(),
            account_type: "google",
            joined_on: new Date(),
            account_type: "google",
            googleId: user.sub,
          },
          { withCredentials: true }
        )
      ).data;

      if (res.message == "User Created" || res.message == "User Exists") {
        let res = await (
          await axios.post(`${URL}/api/login`, {
            googleId: user.sub,
            account_type: "google",
          })
        ).data;
        localStorage.setItem("token", res.Authorization);

        const info = await (
          await axios.get(`${URL}/api/user`, {
            headers: { Authorization: localStorage.getItem("token") },
          })
        ).data;
        dispatch(actions.updateUser(info));

        navigate("/");
      }
    },
  });

  return (
    <div className="bg-white flex flex-col  ">
      <div className="ml-7">
        <p className="font-[Pacifico] mt-5 text-3xl font-extrabold text-center">
          Ink Up
        </p>
      </div>
      <div className="flex flex-col place-items-center mb-12 mt-[50px]">
        <p className="text-[Sen] font-bold text-3xl ">SignUp</p>

        <button
          onClick={() => {
            signUpWithGoogle();
          }}
          className="border-solid border-2 border-black hover:bg-slate-100 bg w-[70%] text-black rounded-lg lg:w-[45em] mt-[2em] flex items-center justify-center gap-[4rem] p-2"
          type="submit"
        >
          <FcGoogle className="text-4xl" />
          <p className="font-[Sen] text-sm min-w-max font-semibold  lg:text-xl">
            Continue With Google
          </p>
        </button>
        <p className="text-[Sen] font-semibold text-lg mt-[2rem]">OR</p>

        <div className="flex flex-col gap-[1.5em] items-center lg:w-[45em] sm:mt-[3rem] md:mt-[5em] w-[70%] md:m-[20px]">
          <div className="flex flex-col gap-[1em] w-[100%]">
            <p className="text-[Sen] font-semibold text-lg ">Full Name</p>
            <input
              type="text"
              name="fullname"
              className="p-4 border rounded-lg text-[Outfit] "
              placeholder="Enter your Full Name"
            />
          </div>

          <div className="flex flex-col gap-[1em] w-[100%]">
            <p className="text-[Sen] font-semibold text-lg ">Username</p>
            <input
              type="text"
              name="username"
              className="p-4 border rounded-lg text-[Outfit] "
              placeholder="Enter your Username"
            />
          </div>

          <div className="flex flex-col gap-[1em] w-[100%]">
            <p className="text-[Sen] font-semibold text-lg ">Email</p>
            <input
              type="email"
              name="email"
              className="p-4 border rounded-lg text-[Outfit] "
              placeholder="Enter your Email"
            />
          </div>

          <div className="flex flex-col gap-[1em] w-[100%]">
            <p className="text-[Sen] font-semibold text-lg ">Password</p>
            <input
              type="password"
              name="password"
              className="p-4 border rounded-lg text-[Outfit] "
              placeholder="Enter Password"
            />
          </div>

          <button
            onClick={() => {
              signUpWithGoogle();
            }}
            className="bg-black w-[90%] ml-4 text-white lg:ml-12 rounded-lg lg:w-[45em] mt-[2em] h-[4em]"
            type="submit"
          >
            <p className="font-[Sen] text-xl font-semibold  ml-3 ">Sign Up</p>
          </button>
        </div>

        <div className="flex flex-row gap-2 m-auto mt-9 mb-72">
          <p className="font-[Sen] text-sm lg:text-xl">Have an account?</p>
          <Link
            to="/login"
            className="text-sm lg:text-xl lg:ml-3 font-[Sen]  text-blue-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

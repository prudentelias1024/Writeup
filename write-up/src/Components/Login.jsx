import React, { useState, useContext, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Button from "./Navbar/Button";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useFacebook, useLogin, useProfile } from "react-facebook";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
const Login = () => {
  const { URL } = useSelector((state) => state);
  const navigate = useNavigate();

  const [token, setToken] = useState();

  const { login, status, isLoading, error } = useLogin({ access_token: token });

  const { profile } = useProfile();

  const [email, setEmail] = useState();
  const twitterRef = useRef();
  const dispatch = useDispatch();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      let user = await (
        await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })
      ).data;

      console.log(user);
      console.log(URL);

      const res = await await axios.post(
        `${URL}/api/login`,
        { googleId: user.sub, account_type: "google" },
        { withCredentials: true }
      );
      if (res.message == "User Doesn\t Exists") {
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
        if (res.message == "User Created") {
          let res = await (
            await axios.post(`${URL}/api/login`, {
              username: user.email,
              account_type: "google",
            })
          ).data;
          console.log(res);
        }
      }
      console.log(res);
      localStorage.setItem("token", res.data.Authorization);
      const info = await (
        await axios.get(`${URL}/api/user`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
      ).data;
      dispatch(actions.updateUser(info));
      navigate("/");
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
        <p className="text-[Sen] font-bold text-3xl ">Login</p>

        <button
          onClick={() => {
            loginWithGoogle();
          }}
          className="border-solid border-2 border-black hover:bg-slate-100 bg w-[70%] text-black rounded-lg lg:w-[45em] mt-[2em] flex items-center justify-center gap-[4rem] p-2"
          type="submit"
        >
          <FcGoogle className="text-4xl" />
          <p className="font-[Sen] text-sm min-w-max font-semibold  lg:text-xl">
            Login With Google
          </p>
        </button>
        <p className="text-[Sen] font-semibold text-lg mt-[2rem]">OR</p>

        <div className="flex flex-col gap-[1.5em] items-center lg:w-[45em] sm:mt-[3rem] md:mt-[5em] w-[70%] md:m-[20px]">
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
            <p className="text-[Sen] font-semibold text-lg">Password</p>
            <input
              type="password"
              name="password"
              className="p-4 border text-[Outfit] "
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={() => {
              loginWithGoogle();
            }}
            className="bg-black w-[95%] text-white rounded-lg lg:w-[45em] mt-[2em] gap-[4rem] p-4"
            type="submit"
          >
            <p className="font-[Sen] text-xl font-semibold">Login</p>
          </button>
        </div>

        <div className="flex flex-row gap-2 m-auto mt-9 mb-72">
          <p className="font-[Sen] text-sm lg:text-xl">No account yet?</p>
          <Link
            to="/signup"
            className="text-sm lg:text-xl lg:ml-3 font-[Sen]  text-blue-500"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../store';
import Input from '../Input';
import  NavBar  from "../NavBar";
const EditProfile = () => {
  let URL
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
   useEffect(() => {
    if (process.env.NODE_ENV == 'production') {
      URL = "https://inkup-api.onrender.com"
    }else{
      URL = "http://localhost:5000"
             
    }
    console.log(user)
    setProfileChanges({name: user.name,email: user.email,username: user.username,work : user.work,education: user.education,hobby: user.hobby,websiteUrl: user.websiteUrl,location: user.location,bio:user.bio})
    console.log(profileChanges)
   }
   ,[user])
    const [ profileChanges, setProfileChanges] = useState({})
    
  
    const handleChanges = (event) => {
     if (event.target.name == 'Name') {
       setProfileChanges({...profileChanges, name: event.target.value})
       console.log(profileChanges)
     } else if(event.target.name == 'Email'){
       setProfileChanges({...profileChanges, email: event.target.value})
       console.log(profileChanges)
      } else if(event.target.name == 'Username'){
       setProfileChanges({...profileChanges, username: event.target.value})
       console.log(profileChanges)
      } else if(event.target.name == 'Work'){
       setProfileChanges({...profileChanges, work: event.target.value})
       console.log(profileChanges)
     
      } else if(event.target.name == 'Education'){
       setProfileChanges({...profileChanges, education: event.target.value})
       console.log(profileChanges)
     
      } else if(event.target.name == 'Hobby'){
       setProfileChanges({...profileChanges, hobby: event.target.value})
       console.log(profileChanges)
     }
       else if(event.target.name == 'Website URL'){
       setProfileChanges({...profileChanges, websiteUrl: event.target.value})
       console.log(profileChanges)
     }
       else if(event.target.name == 'Location'){
       setProfileChanges({...profileChanges, location: event.target.value})
       console.log(profileChanges)
     }
       else if(event.target.name == 'Bio'){
       setProfileChanges({...profileChanges, bio: event.target.value})
       console.log(profileChanges)
     }
    }
    const submitChanges = async(event) => {
      event.preventDefault()
      console.log(profileChanges)
     let res =  await (await axios.post(`${URL}/api/user/edit`, {profileChanges}, {withCredentials:true, headers:{Authorization: localStorage.getItem('token') }})).data
     localStorage.removeItem("token")
      localStorage.setItem("token", res.Authorization)
      dispatch(actions.updateUser(res.user))
      navigate('/')
      
   
    }
    return (
        <>
        <NavBar/>
        <div className='edit top-32 relative '>
            <form className="flex flex-col lg:gap-[3em] gap-[1em]  lg:ml-[20em] ">
                
            <div className="user lg:ml-[1.5em] pt-5 p-4 lg:rounded-lg bg-white  lg:w-3/4">
            <p className="text-2xl font-bold font-[Outfit]">User</p>    
            <br></br>
             <Input handleChanges={handleChanges}  label="Name" placeholder="Update Name" value={profileChanges.name }/>
             <br></br>
             <Input handleChanges={handleChanges} label="Email" placeholder="Update Name" value={profileChanges.email}/>

             <br></br>
             <Input handleChanges={handleChanges}  label="Username" placeholder="Update Name" value={profileChanges.username}/>
             <br></br>
             <div>
             <p className='font-[Outfit] font-bold mb-[2.5em] text-xl'>Public Pic</p>
              <div className='flex flex-row gap-3'>
             <img className='rounded-full h-12 w-12 mt-2' src={user.public_picture} alt={user.name}   />
            <div className='border p-4 lg:rounded-lg -mt-[1em]  bg-[#f6f6f6] flex flex-row pl-[2em] gap-[.5em] w-full'>
                
            <button className='bg-blue-500 py-3 h-fit text-white rounded-lg px-6'>Choose File</button>
            <p className='font-[Outfit] mt-[.5em] ml-[1em]'>No File Selected</p>
            </div>
              </div>
             </div>
            </div>

            <div className="user pt-5 p-4 lg:rounded-lg bg-white lg:w-3/4 lg:ml-[1.5em]">
            <p className="text-2xl font-bold font-[Outfit]">Outworld Profile</p>    
            <br></br>
            <Input handleChanges={handleChanges} label="Work" placeholder="What do you like to decribe you work like?" />
             <br></br>
            <Input handleChanges={handleChanges} label="Education" placeholder="Where did you go to school" />
             <br></br>
            <Input handleChanges={handleChanges} label="Hobby" placeholder="What's your hobby" />
             <br></br>
           </div>
           
            <div className="user pt-5 p-4 lg:rounded-lg bg-white lg:w-3/4 lg:ml-[1.5em] ">
            <p className="text-2xl font-bold font-[Outfit]">Personal</p>    
            <br></br>
            <Input handleChanges={handleChanges} label="Website URL" placeholder="Add your Website Link" />
             <br></br>
            <Input handleChanges={handleChanges} label="Location" placeholder="Oklahoma, Zurich, Munich e.t.c" />
             <br></br>
            <Input handleChanges={handleChanges} label="Bio" placeholder="Express yourself" />
             <br></br>
           </div>
           
         <button onClick={submitChanges} className='w-full fixed bottom-0 lg:relative  lg:mb-[2em] rounded-md py-[.5em] font-bold bg-blue-500 text-white lg:w-3/4 font-[Maven]  lg:ml-[1em]  '>Save Profile </button>
            </form>
        </div>
        </>
    );
}

export default EditProfile;

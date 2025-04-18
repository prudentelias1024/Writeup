import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../store';
import Input from '../Input';
import  NavBar  from "../NavBar";
import { BsPenFill, BsPersonBadge } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import UserNav from '../Navbar/UserNav';
import DisplaySettings from './DisplaySettings';
const EditProfile = () => {
  const {URL,user} = useSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
   useEffect(() => {
   
    console.log(user)
    
    setProfileChanges({name: user.name,email: user.email,username: user.username,websiteUrl: user.websiteUrl,location: user.location,bio:user.bio})
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
      } 
       else if(event.target.name == 'Website URL'){
       setProfileChanges({...profileChanges, websiteUrl: event.target.value? event.target.value:''})
       console.log(profileChanges)
     }
       else if(event.target.name == 'Location'){
       setProfileChanges({...profileChanges, location: event.target.value? event.target.value:''})
       console.log(profileChanges)
     }
       else if(event.target.name == 'Bio'){
       setProfileChanges({...profileChanges, bio: event.target.value? event.target.value:''})
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
  <div className='lg:ml-[7em]'>
         <UserNav />
     <div className='lg:flex lg:flex-row '>

             <div className='hidden lg:block lg:w-[35%] mr-[5em] '>
                 <DisplaySettings additionalStyle={"lg:w-[70%]"}/>
                 </div>

        <div className=' edit top-4 lg:w-[50%] ml-[1em] lg:top-4 mb-[10em] lg:mb-[0em] text-sm'>
        <p className='text-2xl mt-[0em] font-[Sen] font-bold ml-[0em]'>Edit Profile</p>
        
              {/* <div className=''>
              <img className=' h-full rounded-full mx-auto my-[1em]' src={user.public_picture} alt={user.name}   />
              <AiOutlineUserAdd className='left-[50%] dark:text-white text-black relative top-[-1.5em] text-2xl' />                
              </div> */}


            <form className="z-0  flex flex-col w-full lg:gap-[3em] gap-[2em] pt-[4em] lg:ml-[0em] ">
                
            <div className='w-full flex flex-row justify-between'>
             <Input handleChanges={handleChanges}  label="Name" placeholder="Update Name" value={profileChanges.name }/>
             <Input handleChanges={handleChanges} label="Email" placeholder="Update Name" value={profileChanges.email}/>

            </div>
            <div className='flex flex-row justify-between'>
             <Input handleChanges={handleChanges}  label="Username" placeholder="Update Name" value={profileChanges.username}/>
            <Input handleChanges={handleChanges} label="Website URL" placeholder="Add your Website Link" value={profileChanges.websiteUrl} />
             <br></br>
             </div>

             <div className='flex flex-col justify-between'>
            
            <Input handleChanges={handleChanges} label="Location" placeholder="Oklahoma, Zurich, Munich e.t.c" value={profileChanges.location} />
             <br></br>
            <Input handleChanges={handleChanges} value={profileChanges.bio} additionalStyle={"w-[95%] h-[5em] placeholder:py-0"} label="Bio" placeholder="Express yourself" />
      </div>     
      
            
             {/* </div> */}
            
         <button onClick={submitChanges} className='w-[95%] mx-auto  lg:relative  lg:mb-[2em] rounded-md py-[.5em] font-bold bg-blue-500 text-white lg:full font-[Maven]  lg:ml-[1em]  '>Save Profile </button>
            </form>
        </div>
        </div>
        </div>
       
    );
}

export default EditProfile;

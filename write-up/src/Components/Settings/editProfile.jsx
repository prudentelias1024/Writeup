import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../Input';
import  NavBar  from "../NavBar";
const EditProfile = () => {
    const [ profileChanges, setProfileChanges] = useState({
      name:'',
      email:'',
      username:'',
      public_picture:'',
      work:'',
      education:'',
      hobby: '',
      websiteUrl:'',
      location: '',
      bio:''


    })
    
    const user = useSelector((state) => state.user)

    const handleChanges = (event) => {
     if (event.target.name == 'Name') {
       setProfileChanges({...profileChanges, name: event.target.value})
       console.log(profileChanges)
     } else if(event.target.name == 'Email'){
       setProfileChanges({...profileChanges, email: event.target.value})
       console.log(profileChanges)
      } else if(event.target.name == 'Username'){
       setProfileChanges({...profileChanges, email: event.target.value})
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
    const submitChanges = (event) => {
      event.preventDefault()
      console.log(profileChanges)
      axios.post('http://localhost:5000/api/user/edit', {profileChanges}, {withCredentials:true, headers:{Authorization: localStorage.getItem('token') }})
    }
    return (
        <>
        <NavBar/>
        <div className='edit top-32 relative '>
            <form className="flex flex-col gap-[3em]  ml-[20em] ">
                
            <div className="user w-3/4 ml-[1.5em] pt-5 p-4 rounded-lg bg-white">
            <p className="text-2xl font-bold">User</p>    
            <br></br>
             <Input handleChanges={handleChanges}  label="Name" placeholder="Update Name" value={user.name}/>
             <br></br>
             <Input handleChanges={handleChanges} label="Email" placeholder="Update Name" value={user.email}/>

             <br></br>
             <Input handleChanges={handleChanges}  label="Username" placeholder="Update Name" value={user.username}/>
             <br></br>
             <div>
             <p className='font-[mulish] font-bold mb-[2.5em] text-xl'>Public Pic</p>
              <div className='flex flex-row gap-3'>
             <img className='rounded-full h-12 w-12 mt-2' src={user.public_picture} alt={user.name}   />
            <div className='border p-4 rounded-lg -mt-[1em]  bg-[#f6f6f6] flex flex-row pl-[2em] gap-[.5em] w-full'>
                
            <button className='bg-blue-500 py-3 h-fit text-white rounded-lg px-6'>Choose File</button>
            <p className='font-[Mulish] mt-[.5em] ml-[1em]'>No File Selected</p>
            </div>
              </div>
             </div>
            </div>

            <div className="user w-3/4 ml-[1.5em] pt-5 p-4 rounded-lg bg-white">
            <p className="text-2xl font-bold">Outworld Profile</p>    
            <br></br>
            <Input handleChanges={handleChanges} label="Work" placeholder="What do you like to decribe you work like?" />
             <br></br>
            <Input handleChanges={handleChanges} label="Education" placeholder="Where did you go to school" />
             <br></br>
            <Input handleChanges={handleChanges} label="Hobby" placeholder="What's your hobby" />
             <br></br>
           </div>
           
            <div className="user w-3/4 ml-[1.5em] pt-5 p-4 rounded-lg bg-white">
            <p className="text-2xl font-bold">Personal</p>    
            <br></br>
            <Input handleChanges={handleChanges} label="Website URL" placeholder="Add your Website Link" />
             <br></br>
            <Input handleChanges={handleChanges} label="Location" placeholder="Oklahoma, Zurich, Munich e.t.c" />
             <br></br>
            <Input handleChanges={handleChanges} label="Bio" placeholder="Express yourself" />
             <br></br>
           </div>
           
         <button onClick={submitChanges} className='w-3/4 ml-[1em] rounded-md py-[.5em] font-bold bg-blue-500 text-white '>Save Profile </button>
            </form>
        </div>
        </>
    );
}

export default EditProfile;

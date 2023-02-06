import React from 'react';
import { useSelector } from 'react-redux';
import Input from '../Input';
import  NavBar  from "../NavBar";
const EditProfile = () => {
    const user = useSelector((state) => state.user)
    return (
        <>
        <NavBar/>
        <div className='edit top-32 relative  '>
            <form className="flex flex-col gap-[3em] ">
                
            <div className="user w-2/4 ml-[1.5em] pt-5 p-4 rounded-lg bg-white">
            <p className="text-2xl font-bold">User</p>    
            <br></br>
             <Input label="Name" placeholder="Update Name" value={user.name}/>
             <br></br>
             <Input label="Email" placeholder="Update Name" value={user.email}/>

             <br></br>
             <Input label="Username" placeholder="Update Name" value={user.username}/>
             <br></br>
             <div>
             <p className='font-[mulish] font-bold mb-[2.5em] text-xl'>Image</p>
              <div className='flex flex-row gap-3'>
             <img className='rounded-full h-12 w-12 mt-2' src={user.public_picture} alt={user.name}   />
            <div className='border p-4 rounded-lg -mt-[1em]  bg-[#f6f6f6] flex flex-row pl-[2em] gap-[.5em] w-full'>
                
            <button className='bg-blue-500 py-3 h-fit text-white rounded-lg px-6'>Choose File</button>
            <p className='font-[Mulish] mt-[.5em] ml-[1em]'>No File Selected</p>
            </div>
              </div>
             </div>
            </div>

            <div className="user w-2/4 ml-[1.5em] pt-5 p-4 rounded-lg bg-white">
            <p className="text-2xl font-bold">Outworld Profile</p>    
            <br></br>
            <Input label="Work" placeholder="What do you like to decribe you work like?" />
             <br></br>
            <Input label="Education" placeholder="Where did you go to school" />
             <br></br>
            <Input label="Hobby" placeholder="What's your hobby" />
             <br></br>
           </div>
           
            <div className="user w-2/4 ml-[1.5em] pt-5 p-4 rounded-lg bg-white">
            <p className="text-2xl font-bold">Outworld Profile</p>    
            <br></br>
            <Input label="Website URL" placeholder="Add your Website Link" />
             <br></br>
            <Input label="Location" placeholder="Oklahoma, Zurich, Munich e.t.c" />
             <br></br>
            <Input label="Bio" placeholder="Express yourself" />
             <br></br>
           </div>

           <button className='w-1/2 ml-[1em] rounded-md py-[.5em] font-bold bg-blue-500 text-white '>Save Profile </button>
            </form>
        </div>
        </>
    );
}

export default EditProfile;

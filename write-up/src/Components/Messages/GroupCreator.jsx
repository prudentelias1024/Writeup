import React, {useRef, useState, useEffect} from 'react'
import UserNav from '../Navbar/UserNav';
import  axios  from "axios";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { MdOutlineAddAPhoto } from "react-icons/md";
import UploadAvatar from './add_image.png'
import { useSelector } from 'react-redux';
import { HiBadgeCheck } from 'react-icons/hi';
export default function GroupCreator() {
 
 

  const [groupImage, setGroupImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [groupMembers, setGroupMembers] = useState([])
  const [groupMemberNames, setGroupMemberNames] = useState([])
  const groupImageRef = useRef()
  const nameRef = useRef()
  const {URL, currentUser} = useSelector(state => state)
  const openFilePicker = () => {
    groupImageRef.current.click()
  }
  const uploadImage = (event) => {
    const file = event.target.files[0]
    const imgFirebaseRef = ref(storage, `group/${v4()}`)
    uploadBytes(imgFirebaseRef,file).then(()=> {
       getDownloadURL(imgFirebaseRef).then((url) => {
        setGroupImage(url)
              })
    })

  }

  const removeUserFromMembersList = (name) =>{
    const idx = groupMembers.indexOf(name)
    groupMembers.splice(idx,1)
    groupMemberNames.splice(idx,1)
    
    setGroupMembers([...groupMembers])
    setGroupMemberNames([...groupMemberNames])
  }
  const chooseUser = (id,name) => {
    if(groupMembers.indexOf(id) == -1){

      setGroupMembers([id,...groupMembers])
    }

    if(groupMemberNames.indexOf(name) == -1){

    setGroupMemberNames([name,...groupMemberNames])
    
  }
  }
  const getUsers = async() => {
    let users = await (await axios.get(`${URL}/api/users`)).data
    setSuggestedUsers(users)
   }

   const createGroup = async() => {
    setIsLoading(true)
    const res =  await (await axios.post(`${URL}/api/group/conversation`, {
      participants: groupMembers,
      admin: currentUser._id,
      name: nameRef.current.value,
      icon: groupImage,

    })).data
    
    if(res.status ==200){
      setIsLoading(false)
    
    }
    
   }
  useEffect(() => {
    getUsers()
  }, [])
  return (
   <>
    <div className=' lg:ml-[10em] w-full lg:w-full '>
        <div className='flex flex-col lg:ml-[7em] lg:w-full'>
        <input onChange={uploadImage} className='opacity-0' type="file" ref={groupImageRef} />
        
         <img src={ groupImage !== null ? groupImage :UploadAvatar} onClick={openFilePicker} className='lg:ml-[15.5em] lg:w-[10em] lg:h-[10em] rounded object-cover' />

         <div className="flex flex-col mt-[1em] gap-[1em] w-[100%]">
            <p className="font-[Avenir] ml-[1em] mt-[2em] font-semibold text-lg ">Group Name</p>
            <input ref={nameRef} className=" lg:ml-[1em] lg:w-[50%] w-[95%] mx-[2%] lg:block h-10 bg-[#f6f6f6]  border rounded-md  font-[Maven] pl-5 font-bold placeholder:font-[Sen] placeholder:font-semibold placeholder:p-[1em] placeholder:text-sm placeholder:ml-5"  type="text" placeholder="Group name" name="group_name"  />
           
          </div>

        <p className='relative lg:ml-[63m]  lg:mt-[1.5em] ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Create Group</p>

        <div className="flex flex-row">
             <div  className=" lg:ml-[1em] lg:w-[50%] w-[95%] mx-[2%] lg:block h-max py-1 mb-[2em] max-h-max border rounded-md  font-[Maven] pl-5 font-bold "  >
            {

            }  


        
              { groupMembers.length == 0?

             <p className='font-[Sen] text-[#b8b8b8] font-semibold text-sm ml-5 pt-3'>Choose the group members </p > :
              <div className="flex flex-row flex-wrap gap-1 ">
                {
                  groupMemberNames.length > 0 && groupMemberNames.map((name)=> {
                    
                   return <p onClick={()=> removeUserFromMembersList(name)} className="font-[Sen] text-[#b8b8b8] border-[#b8b8b8] font-semibold w-fit mt-1 p-1.5 border cursor-pointer text-xs rounded-xl ">{name}</p>
                  })
                }
              </div>

            } 
           
        </div>
        </div>

        {/* Suggested users sections */}

        <div  className="flex flex-col h-[20em] overflow-y-auto">
          {
            suggestedUsers.length > 0 && suggestedUsers.map((user) => {
              return (
                <div onClick={() => chooseUser(user._id, user.name)}  className=
                {groupMembers.indexOf(user._id) == -1
                  ?
                  " result lg:w-[50%] w-[95%] mx-[2%]":
                  "opacity-50 cursor-none result lg:w-[50%] w-[95%] mx-[2%]"
                  }>
          <div className="flex flex-row ml-[.5em]  py-[1em]">
            <img src={user.public_picture} className='h-9 w-9 rounded-full'/>
              <div className="profile ml-[.5em] flex flex-col gap-[.25em] ">
              <div className='flex flex-row'>
              <p className="name text-[.75em] font-[Sen] font-bold">{currentUser &&  user.name == currentUser.name? 'You':user.name}</p>
            {
                user.verified !== true ? '':
            <HiBadgeCheck className='text-sm text-blue-500 relative top-[.25em]'/>
            }
            </div>
            <p className="username text-[.75em] font-[Sen] text-[#9e9e9e] font-bold -mt-[.45em]">@{user.username}</p>
        </div>
         
     </div>
          </div>
              )
           
            })


          }
          
          
        </div>


        <button onClick={createGroup} className='lg:ml-[1em] mt-[2em] lg:w-[50%] w-[95%] mx-[2%] lg:block h-10 bg-[#512bd4] text-white  border rounded-md  font-[Maven] pl-5 font-bold placeholder:font-[Sen] placeholder:font-semibold placeholder:p-[1em] placeholder:text-sm placeholder:ml-5' >
            Create Group
        </button>

   </div>
   <UserNav/>

   </div>
   </> 
  )
}

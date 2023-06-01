import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { time } from "../../time";
import { HiBadgeCheck } from "react-icons/hi";
export default function AuthorInfo({author,timestamp, collaborators, additionalStyles}){
    const {user} = useSelector(state=>state)
    const [timePosted,setTimePosted] = useState()
    useEffect(() => {
        setInterval(() => {
            setTimePosted(time(timestamp))  
        }, 500);
    }, [timePosted]);
    return(
        <div className=' lg:pl-[2em] pr-[1.5em] mt-3 ml-[1em] lg:ml-0 mb-3 flex flex-row gap-2'>
         <div className="flex flex-row ">

        <img src={author.public_picture} className='w-[2.5em]  h-[2.5em] lg:w-[3em] lg:h-[3em] rounded-full object-cover' /> 
       {
        collaborators && collaborators.length > 0?
        collaborators.map((collaborator,index) => {

           return  <img key={index} src={collaborator.public_picture} className='w-[2.5em] ml-[-1.5em] h-[2.5em] lg:w-[3em] lg:h-[3em] rounded-full object-cover' />
        })
        : ''
  }  </div>

        <div className=''>
                <Link to={"/"+ author.username } className={additionalStyles + " author_title flex flex-row gap-1 text-md font-bold  text-[#171717] lg:text-xl font-[Sora]"}> {
                user !== null ?
                author.name !== user.name ?
                author.name: 'You':
                 author.name} {author.verified? <HiBadgeCheck  className="text-xl text-blue-500 mt-1"  />: ''}</Link>
                 
                <Link to={"/"+ author.username } className={additionalStyles + " author_title flex flex-row gap-1 text-md font-bold  text-[#171717] lg:text-xl font-[Sora]"}>  {

                    collaborators && collaborators.length > 0 ? collaborators.map((collaborator,index) => {
                        return (
                        author.name !== collaborator.name  ?
                       "&" + collaborator.name:  '& You' &&
                        collaborator.verified? <HiBadgeCheck  className="text-xl text-blue-500 mt-1"  />: ''
                        )        
                    }): ''
                }
                
                </Link>

                <p className={additionalStyles +" text-medium text-xs font-bold lg:mt-[.125em] lg:text-sm -mt-[.25em] text-[#717171] font-[Maven]"}> {timePosted}</p>
                </div>
        </div>
        
    )
}
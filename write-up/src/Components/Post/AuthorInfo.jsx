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

        <div className=' lg:pl-[1em] pr-[1.5em] mt-3 ml-0 lg:ml-0 mb-3 flex flex-row gap-2 w-max'>

         <div className="flex flex-row  ">

        <img src={author.public_picture} className='w-[2.5em]  h-[2.5em] lg:w-[2.5em] lg:h-[2.5em] rounded-full object-cover ml-[.7em] mt-[0.3em]  ' /> 
        
        {/* for collaborated posts */}

       {
        collaborators && collaborators.length > 0?
        collaborators.map((collaborator,index) => {

           return  <img key={index} src={collaborator.public_picture} className='w-[2.5em] ml-[-1.5em] h-[2.5em] lg:w-[3em] lg:h-[3em] rounded-full object-cover' />
        })
        : ''
  }  </div>

       {/* normal post (one author) */}


        <div className='flex flex-row w-full ml-[.5em] mt-[.25em] '>

           <Link to={"/"+ author.username } className={additionalStyles ? additionalStyles + "author_title flex flex-row  text-[.7em] font-bold   lg:text-sm ":
        
                "text-[#171717] dark:text-white  author_title flex flex-row gap-1 text-[0.7em] font-bold   lg:text-sm " 
            }  > 
                <p className="w-max">

            {
                user !== null ?
                author.name !== user.name ?
                
                author.name: 'You':
                author.name
                
            } 
                 
            </p>
                 
            {author.verified?
                  <HiBadgeCheck  className="text-xs text-blue-500 mt-[.2em]"  />: ''
                  
            }

         
            <p className={additionalStyles ? additionalStyles + "text-medium text-[0.75em] font-bold -mt-[.1em]  lg:text-sm  " : 
                
                "text-[#717171] text-medium text-xs font-bold lg:-mt-[.1em] lg:text-sm -mt-[0em] text-[.75em] "}> @{author.username}</p>
  
                
            </Link>
                 
            <Link to={"/"+ author.username } className={additionalStyles ? additionalStyles +" author_title flex flex-row gap-1 text-md font-bold   lg:text-base font-[Sora]" : 
                " text-[#171717] author_title flex flex-row gap-1 text-md font-bold   lg:text-base font-[Sora]"}> 
                
             {

                    collaborators && collaborators.length > 0 ? collaborators.map((collaborator,index) => {
                        return (
                        author.name !== collaborator.name  ?
                       "&" + collaborator.name:  '& You' &&
                        collaborator.verified? <HiBadgeCheck  className="text-base text-blue-500 mt-0"  />: ''
                        )        
                    }): ''
                }
                
                </Link>

               

              
                <p className={additionalStyles ? additionalStyles + " text-[.55em] font-bold lg:mt-[.12em] lg:text-sm mt-[.2em] ml-[.5em]" :
                    
                    " text-[#717171] text-medium text-[.55em] font-bold lg:-mt-[.125em] lg:text-sm mt-[.2em]   ml-[.5em]  "}>  {timePosted}</p>
                </div>
        </div>
        
    )
}
import React, { useRef, useState } from 'react';
import AuthorInfo from './Post/AuthorInfo';
import { useEffect } from 'react';
import axios from 'axios';
import Tag from './Post/Tag';
import mock from "./inkup.png";
import { useSelector } from 'react-redux';
const Poll = ({reel}) => {
    console.log(reel)
    const [URL, setURL] = useState()
    const [disable, setDisable] = useState(false)
    const pollRef = useRef()
    const [votesReceived, setVotesReceived] = useState(0)
    const optionRef = useRef()
    const valueOneRef = useRef()
    const valueTwoRef = useRef()
    const valueThreeRef = useRef()
    const valueFourRef = useRef()
    const {user} = useSelector(state => state)
    const handlePollDisabled = (index) => {
       pollRef.current.classList.add('cursor-text')
       setDisable(true)
      
        countVoteAndUpdatePercentageValues(index)
    }
    const updatePercentageValues = (reel) => {
        let totalVotes = 0
        reel.options.map((option) => {
          totalVotes += option.votes
          
           
          })
          reel.options.map((option,index) => {
           let vote = option.votes
           let percentage =  (vote/ totalVotes) * 100
           reel.option = [...reel.option, {percentage: percentage}]
          })

    }
    const countVoteAndUpdatePercentageValues = (index) => {
        reel.totalVotes += 1
     if(index == 1){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)
        reel.options[0].votes += 1
       reel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
     }
     if(index == 2){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)
        reel.options[1].votes += 1
       reel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
     }
     if(index == 3){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)
        reel.options[2].votes += 1
       reel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
     }
     if(index == 4){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)
        reel.options[3].votes += 1
       reel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
     }
     reel.viewedBy.push(user._id)
        
    
      axios.put(`${URL}/reels/poll/${reel.reelId}`, 
        reel, {headers: {Authorization: {Authorization:  localStorage.getItem('token')}}}
      )}
   
    
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            setURL("https://inkup-api.onrender.com")
          }else{
           setURL("http://localhost:5000")
                   
          }
          updatePercentageValues(reel)
        setVotesReceived(reel.totalVotes)
        }, [])
        if( reel.viewedBy.some((voter) => {return voter.username == user.username}) == false){
    return (
       
        <div ref={pollRef} className='poll w-full border bg-white ml-[-.25em] font-[Outfit] rounded-xl pt-[1em]'>
          
         <div className="vote_received relative top-0 left-[55%] lg:left-[65%] mb-[.5em]">
            <p className='font[Outfit] font-extralight text-[#b3aaaa]'>{votesReceived} Votes received</p>
         </div>
           
            <AuthorInfo author={reel.author} timestamp={reel.created} />
            <div className="tags w-full flex-wrap  flex flex-row ml-[2em] lg:pl-[4em] pr-[1.5em]  m-auto gap-2 mb-[1em]  lg:gap-[.5em] lg:ml-[0em] ">
               
            {

            reel.tags.toString().split(',').map((tag) => {
            return(
            <>
            
            
            <Tag key={tag} name={tag}/>
            </>
            )
            })
            }
            </div>
            <div className='poll_text text-xl font-bold py-[1em] px-[1.5em] leading-8'>
            {reel.text}
            </div>
          
            {reel.options.map((option,index) => {
                console.log(reel.options)
                return !disable ?    <div className='h-[3.25em] cursor-pointer hover:scale-110 '>
                <div ref={optionRef} onClick={() => {handlePollDisabled(index)}} className="border py-[.75em] px-[1em] z-1 bg-white flex flex-row justify-between">
                    
                    <p className=' text-xl text-[#333] z-10'>{option.pollname}</p>
                    <p ref={index == 0 ? valueOneRef: index == 1? valueTwoRef: index == 2 ? valueThreeRef: valueFourRef} value={option.votes} key={index++} className='percentage  mr-[1em] z-10'>{option.percentage}%</p>
                    
                </div>
                <div style={{width: `${option.percentage}%`}} className={' bg-[#f2f2f2] relative top-[-3.25em] z-0 py-[.85em] px-[1em] '}>
                        &thinsp;
                    </div>
                </div>:
                   <div className='h-[3.25em]  opacity-50 cursor-text ml-[-.25em] 
                     '>
                   <div  className="border py-[.75em] px-[1em] z-1 bg-white flex flex-row justify-between">
                  
                       <p className=' text-xl text-[#333] z-10'>{option.pollname}</p>
                       <p ref={index == 0 ? valueOneRef: index == 1? valueTwoRef: index == 2 ? valueThreeRef: valueFourRef} value={option.votes} key={index++} className='percentage  mr-[1em] z-10'>{option.percentage}%</p>
                       
                   </div>
                   <div style={{width: `${option.percentage}%`}} className={' bg-[#f2f2f2] relative top-[-3.25em] z-0 py-[.85em] px-[1em] '}>
                           &thinsp;
                       
                       </div>
                   </div>
            })
            }
         
          
       
        </div>
    );

            }  else{
     return(
    <div ref={pollRef} className='poll w-full border bg-white ml-[-.25em] font-[Outfit] rounded-xl pt-[1em]'>
          
    <div className="vote_received relative top-0 left-[55%] lg:left-[65%] mb-[.5em]">
       <p className='font[Outfit] font-extralight text-[#b3aaaa]'>{votesReceived} Votes received</p>
    </div>
      
       <AuthorInfo author={reel.author} timestamp={reel.created} />
       <div className="tags w-full flex-wrap  flex flex-row ml-[2em] lg:pl-[4em] pr-[1.5em]  m-auto gap-2 mb-[1em]  lg:gap-[.5em] lg:ml-[0em] ">
          
       {

       reel.tags.toString().split(',').map((tag) => {
       return(
       <>
       
       
       <Tag key={tag} name={tag}/>
       </>
       )
       })
       }
       </div>
       <div className='poll_text text-xl font-bold py-[1em] px-[1.5em] leading-8'>
       {reel.text}
       </div>
     
       {reel.options.map((option,index) => {
           console.log(reel.options)
           return  <div className='h-[3.25em]  opacity-50 cursor-text ml-[-.25em] 
           '>
         <div  className="border py-[.75em] px-[1em] z-1 bg-white flex flex-row justify-between">
        
             <p className=' text-xl text-[#333] z-10'>{option.pollname}</p>
             <p ref={index == 0 ? valueOneRef: index == 1? valueTwoRef: index == 2 ? valueThreeRef: valueFourRef} value={option.votes} key={index++} className='percentage  mr-[1em] z-10'>{option.percentage}%</p>
             
         </div>
         <div style={{width: `${option.percentage}%`}} className={' bg-[#f2f2f2] relative top-[-3.25em] z-0 py-[.85em] px-[1em] '}>
                 &thinsp;
             
             </div>
         </div>
  
        })}
</div>

)
}
}
export default Poll;

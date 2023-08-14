import React, { useRef, useState } from 'react';
import AuthorInfo from './Post/AuthorInfo';
import { useEffect } from 'react';
import axios from 'axios';
import Tag from './Post/Tag';
import mock from "./inkup.png";
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import _ from 'lodash'
import { actions } from '../store';
const Poll = ({reel}) => {
    console.log(reel)
    const [URL, setURL] = useState()
    const [disable, setDisable] = useState(false)
    const pollRef = useRef()
    const dispatch = useDispatch()
    const {reels} = useSelector(state => state)
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
    const updatePercentage = (reels) => {
        let options = []
        let tempReels = _.cloneDeep(reels)
        tempReels.map((reel) => {

        
            if(reel.options.length > 0){
              let totalVotes = 0
              reel.options.map((option) => {
                totalVotes += option.vote
                
                 
                })
                reel.totalVotes = totalVotes
                if(totalVotes !== 0){
      
                
                reel.options.map((option,index) => {
                 let vote = option.vote
               
      
                 let percentage =  (vote/ totalVotes) * 100
              option = {...option, percentage: percentage }
              options.push(option)
    
            })
               reel.options = options
              options = []
          
             
          } else {
           
              reel.options.map((option,index) => {
                 option = {...option, percentage: 0 }
                 options.push(option)
    
                 })
                 reel.options = options
                 options = []
               
              
          
                }
              }
            })
            dispatch(actions.updateReels(tempReels))
  
    
    }

  
    const countVoteAndUpdatePercentageValues = (index) => {
        let tempReel = _.cloneDeep(reel)
        tempReel.totalVotes += 1
     if(index == 1){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)
        tempReel.options[0].vote += 1
       tempReel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
     }
     if(index == 2){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)

        tempReel.options[1].vote += 1
       tempReel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
     }
     if(index == 3){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)
        tempReel.options[2].vote += 1
       tempReel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
     }
     if(index == 4){
        let totalVotes = votesReceived + 1
        setVotesReceived(totalVotes)
        tempReel.options[3].vote += 1
       tempReel.options.map((option) => {
        option.percentage = Math.round((option.votes /totalVotes) * 100)
     })
        
        
    }
    tempReel.viewedBy.push(user._id)
    
    let tempReels = _.cloneDeep(reels)
    console.log(tempReels)
    let foundIndex;
    tempReels.map((reel,index) => {
        if(reel.reelId == tempReel.reelId){
         foundIndex = index
            
        }
     })
     tempReels[foundIndex] = tempReel
     updatePercentage(tempReels)

    
      axios.put(`${URL}/reels/poll/${reel.reelId}`, 
        tempReel, {headers: {Authorization:  localStorage.getItem('token')}}
      )
    }
   
    
    useEffect(() => {
        if (process.env.NODE_ENV == 'production') {
            setURL("https://inkup-api.onrender.com")
          }else{
           setURL("http://localhost:5000")
                   
          }
        setVotesReceived(reel.totalVotes)
        updatePercentage(reels)
        }, [])
        if( reel.viewedBy.some((voter) => {return voter == user._id}) == false){
    return (
       
        <div ref={pollRef} className='poll w-full border bg-white font-[Outfit]  pt-[1em]'>
          
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
            {/* <div className='poll_text text-xl font-bold py-[1em] px-[1.5em] leading-8'>
            {reel.text}
            </div>
           */}
           
           <ReactQuill className='z-0 p-7'
                  value={reel.text}
                  readOnly={true}
                  theme={"bubble"}
                  style={{fontFamily: 'Outfit'}}
                />
            {reel.options.map((option,index) => {
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
    <div ref={pollRef} className='poll w-full border bg-white font-[Outfit]  pt-[1em]'>
          
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
       {/* <div className='poll_text text-xl font-bold py-[1em] px-[1.5em] leading-8'> */}
       <ReactQuill className='z-0 p-7'
                  value={reel.text}
                  readOnly={true}
                  theme={"bubble"}
                  style={{fontFamily: 'Outfit'}}
                />
       {/* </div> */}
     
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

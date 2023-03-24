import SideNavTags from "./SideNavTags";
import axios  from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function TrendingTags(){
   let URL
    const [tagCount, setTagCount] = useState({})
    const [tags,setTags] = useState([])
    const {user} = useSelector(state => state)
    const constructTagAndPublished = (tags,publishedCount) =>{
        let  temp = []
       let keys = Object.keys(publishedCount)
           tags.map((tag,i) => {
            keys.map((key,j) => {
               if(tag.tag === key){
           
                  temp.push({tag:tag.tag, publishedPosts: publishedCount[key]})
               }
            })
          })
          console.log(temp)
          return temp;
       }

       const rankTags = (tagsArray) => {
        let temp;
          for (let i = 0; i < tagsArray.length; i++) {
            let currentTag = tagsArray[i];
             for (let j = 0; j < tagsArray.length; j++) {
               if(currentTag.publishedPosts < tagsArray[j].publishedPosts){
                  temp = tagsArray[i]
                  tagsArray[i] = tagsArray[j]
                  tagsArray[j] = temp
               }  
            }
            
          }
          tagsArray.reverse()
          //Display only top 10 trending tags at all time
          tagsArray = tagsArray.slice(0,10)
          
        setTags(tagsArray)
        console.log(tags)
       }
       const getTags = async() => {
     let res = await (await axios.get(`${URL}/api/tags`)).data
     console.log(res)
     //Contains all tags without their title
     let tagsArray = []
     //contains all tags with their title with uniqueness
     let tagArray = []
    
     let temp = []
     console.log(res)
     //This is strip the array elements of their title
     res.map(tag => {
        temp.push(tag.tags)
       
    })
    console.log(temp)
    temp.map((tag) => {
        for (let i = 0; i < tag.length ; i++){
     
         tagsArray.push(tag[i].toLowerCase())
       }
      
    })
    console.log(tagsArray)
    tagsArray.map((tag) => {
      if (tagCount[tag]){
        
          tagCount[tag] +=1 
      } else {
      tagCount[tag] = 1
         

      }
  })
  
  temp = []

    //this filter method will ensure the tags are all unique in order not to render a tag twice
  
        tagsArray = tagsArray.map((words) => {
            if (temp.indexOf(words) === -1) {
                temp.push(words)
            }
           
          
        })
   

    //this map method will help push all tags into tagArray
        temp.map(tag => {     
          tagArray.push({tag:tag})
          } 
        )
      
    
   
     rankTags(constructTagAndPublished(tagArray,tagCount))
    
    }
   
    useEffect(() => {
     
      if (process.env.NODE_ENV == 'production') {
              URL = "https://inkup-api.onrender.com"
      }else{
        URL =  "http://localhost:5000" 
      }
      setTimeout(() => {
        getTags()
        setTagCount({})
      }, 500);
       
    }, [])
    return(
        <>
        <div className=" hidden bg-[#f6f6f6] lg:block h-[40em] overflow-x-hidden lg:ml-[-3em]">
        <p className=" text-lg font-bold font-[Maven] mb-3 ml-[3em]  ">Trending Tags</p>
        <div className="flex flex-col text-center m:auto pl-10 w-[25em] lg:ml-[4.5em] h-[15em] overflow-y-auto overflow-x-hidden px-10 ">
        {tags && tags.map((tag,index) => 
          
           
          {return <SideNavTags  tag={tag.tag} key={index}/>
           }
 
           
           )}
      
        </div>
        { user !== null ?
        user.followingTags !== undefined && user.followingTags.length > 0 ? 
       
         <>
         <p className=" text-lg font-bold font-[Mulish] ml-[1.5em] mb-3 mt-[4em]">My Tags</p>
          <div className="flex flex-col text-center m:auto pl-3 lg:ml-[5.5em] h-[15em] overflow-y-auto overflow-x-hidden px-10 ">
          { user.followingTags.map((tag,index) => 
            
            
            {return <SideNavTags  tag={"#"+tag} key={index}/>
          }
          
          
          )}
             </div>
      
         
          </> : ''
        
      : ''
      
      }
        
        </div>
        </>
    )

}
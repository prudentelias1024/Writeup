import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import UserNav from './Navbar/UserNav'
import { Link } from 'react-router-dom'
import TrendLinks from './Trends/TrendLinks'
import axios from 'axios'

export default function Trends() {
  let URL
  const [tags, setTags] = useState([[]]);
  const [publishedCount,setPublishedCount ] = useState({
  })
  useEffect(() => {
      if (process.env.NODE_ENV == 'production') {
          URL = "https://inkup-api.onrender.com"
        }else{
          URL = "http://localhost:5000"
                 
        }
   setTimeout(() => {
      getTags()
   }, 500);
      setPublishedCount({})
      
   }, [])
     const constructTagAndPublished = (tags,publishedCount) => {
      let  temp = []
     let keys = Object.keys(publishedCount)
         tags.map((tag,i) => {
          keys.map((key,j) => {
             if(tag.tag === key){
                  temp.push({tag:tag.tag.split('#')[1], publishedPosts: publishedCount[key]})
             }
          })
        })
      
        
      return temp
    
     }

     const rankTags = (tags) => {
      let temp;
       for (let i = 0; i < tags.length; i++) {
          let currentTag = tags[i];
          for (let j = 0; j < tags.length; j++) {
              if(currentTag.publishedPosts < tags[j].publishedPosts){
                 temp = tags[i]
                 tags[i] = tags[j]
                 tags[j] = temp
              } 
              
          }
         
       }
       tags.reverse()
       setTags(tags)
     
     }

  const getTags = async() => {
   let res = await (await axios.get(`${URL}/api/tags`)).data
   //Contains all tags without their title
   let tagsArray = []

   //temporary array
   let temp = []

   //contains all tags with their title with uniqueness
   let tagArray = []
 
  res.map(tag => {
    if(tag.tags != ''){

      temp.push(tag.tags)
    }
     
  })
 //Extract all tags
  temp.map((tag) => {
      for (let i = 0; i < tag.length ; i++){
       tagsArray.push(tag[i].toLowerCase())
     }
    
  })

 
   tagsArray.map((tag) => {
      if (publishedCount[tag]){
        
          publishedCount[tag] +=1 
      } else {
      publishedCount[tag] = 1
         

      }
  })
    //  this filter method will ensure the tags are all unique in order not to render a tag twice
    temp = []
      tagsArray = tagsArray.map((words) => {
          if (temp.indexOf(words) === -1) {
              temp.push(words)
          }
         
        
      })
     
       
     
    
      temp.map(tag => {     
         
       //this map method with create get each tag and their title with it as an object looks like something that this {tag: 'hi', title: 'How to'}
        tagArray.push({tag:tag})
      } 
      )
      
      
      
    

   rankTags(constructTagAndPublished(tagArray, publishedCount))
   

  }
 
  return (
    <>
       <div className='lg:ml-[10em]'>
     
    <div className='flex flex-col'>
        <p className='relative lg:ml-[6em] ml-[1em] my-[.5em] font-bold font-[Avenir] text-lg '>Trending🔥</p>
         {
            tags && tags.map((tag) => { 
              
              return     <TrendLinks tag={tag.tag} count={tag.publishedPosts}/>
              
            })
          }
            </div>
    <UserNav/>
            </div>
    </>
  )
}

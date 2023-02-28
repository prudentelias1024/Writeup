import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Tag from './tags/tag';
import axios from 'axios';
const Tags = () => {
    useEffect(() => {
        getTags()
        
     }, [])
    const elementCount = {}
      const [tags, setTags] = useState([[]]);
       const contructTagAndPublished = (tags,publishedCount) => {
        let  temp = []
       let keys = Object.keys(publishedCount)
       console.log(keys)
           tags.map((tag,i) => {
            keys.map((key,j) => {
               if(tag.tag === key){
                    temp.push({tag:tag.tag, publishedPosts: publishedCount[key]})
               }
            })
          })
        
          
          console.log(temp)
         setTags(temp)
       }
    const getTags = async() => {
     let res = await (await axios.get('http://localhost:5000/api/tags')).data
     //Contains all tags without their title
     let tagsArray = []
     //temprary array
     let temp = []
     //contains all tags with their title with uniqueness
     let tagArray = []
   
    res.map(tag => {
        temp.push(tag.tags)
       
    })
    console.log(temp)
   //Extract all tags
    temp.map((tag) => {
        for (let i = 0; i < temp.length + 2; i++){
         tagsArray.push(tag[i])
       }
      
    })

   
     tagsArray.map((tag) => {
        if(elementCount[tag]){
            elementCount[tag] += 1
          } else {
           elementCount[tag] = 1
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
        
        
        
        console.log(tagArray)
        console.log(elementCount)


     contructTagAndPublished(tagArray, elementCount)
   

    }
   
   
    return (
        <>
        <NavBar/>
        <div className="top-32 relative grid grid-cols-1  lg:grid-cols-3 gap-[2em] lg:mx-[10em] ">
           {tags && tags.map((tag,index) => 
          
           
          {return <Tag  tag={tag.tag} key={index} count={tag.publishedPosts}/>
           }
 
           
           )}
        </div>
        </>
        
    );
}

export default Tags;

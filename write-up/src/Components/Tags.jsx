import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Tag from './tags/tag';
import axios from 'axios';
const Tags = () => {
      const [tags, setTags] = useState([]);
    const getTags = async() => {
     let res = await (await axios.get('http://localhost:5000/api/tags')).data
     //Contains all tags without their title
     let tagsArray = []
     //contains all tags with their title with uniqueness
     let tagArray = []
     console.log(res)
     //This is strip the array elements of their title
     res.map(tags => { tagsArray = tags.tags

        //this filter method will ensure the tags are all unique in order not to render a tag twice
        tagsArray = tagsArray.filter((words, index,array) => {
            return array.indexOf(words) === index;
        })

        tagsArray.map(tag => {     
            //this map method with create get each tag and their title with it as an object looks like something that this {tag: 'hi', title: 'How to'}
          tagArray.push({tag:tag})
          console.log(tagArray)
        } 
        )
      
    
    })
     setTags(tagArray)
    }
   
    useEffect(() => {
       getTags()
       
    }, [])
    return (
        <>
        <NavBar/>
        <div className="top-32 relative grid grid-cols-1  lg:grid-cols-3 gap-[2em] lg:mx-[10em] ">
           {tags && tags.map((tag,index) => 
          
           
          {return <Tag  tag={tag.tag} key={index}/>
           }
 
           
           )}
        </div>
        </>
        
    );
}

export default Tags;

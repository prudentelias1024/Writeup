import SideNavTags from "./SideNavTags";
import axios  from "axios";
import { useEffect, useState } from "react";
export default function TrendingTags(){
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
    return(
        <>
        <div className=" hidden bg-[#f6f6f6] lg:block h-[40em] overflow-x-hidden lg:ml-[-3em]">

        <p className=" text-lg font-bold font-[Mulish] mb-3 mt-3">Trending Tags</p>
        <div className="flex flex-col text-center m:auto pl-3 lg:ml-[4em] h-[15em] px-10 ">
        {tags && tags.map((tag,index) => 
          
           
          {return <SideNavTags  tag={tag.tag} key={index}/>
           }
 
           
           )}
      
        </div>
        </div>
        </>
    )

}
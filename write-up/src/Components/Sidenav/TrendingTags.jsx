import SideNavTags from "./SideNavTags";
import axios  from "axios";
import { useEffect, useState } from "react";
export default function TrendingTags(){
    let elementCount = {}
    const contructTagAndPublished = (tags,publishedCount) => {
        let  temp = []
       let keys = Object.keys(publishedCount)
           tags.map((tag,i) => {
            keys.map((key,j) => {
               if(tag.tag === key){
           
                  temp.push({tag:tag.tag, publishedPosts: publishedCount[key]})
               }
            })
          })
          return temp;
       }

       const rankTag = (tagsArray) => {
        let temp = []
          for (let i = 0; i < tagsArray.length + 1; i++) {
            const currentTag = tagsArray[i];
           
            for (let j = 1; j < tagsArray.length + 1; j++) {
              if(currentTag.publishedPosts > tagsArray[j].publishedPosts) {
                    temp.push(currentTag)
                }
            }
            
          }
          console.log(temp)
       }
     const [tags, setTags] = useState([]);
    const getTags = async() => {
     let res = await (await axios.get('http://localhost:5000/api/tags')).data
     //Contains all tags without their title
     let tagsArray = []
     //contains all tags with their title with uniqueness
     let tagArray = []
     //TEMPARRAY
     let temp = []
     console.log(res)
     //This is strip the array elements of their title
     res.map(tag => {
        temp.push(tag.tags)
       
    })
    temp.map((tag) => {
        for (let i = 0; i < temp.length + 2; i++){
         tagsArray.push(tag[i])
       }
      
    })

    console.log(tagsArray)
    for (let i = 0; i < tagsArray.length ; i++){
       let currentTag = tagsArray[i]
      
       if(elementCount[currentTag]){
         elementCount[currentTag] += 1
       } else {
        elementCount[currentTag] = 1
       }
    }
  

    //this filter method will ensure the tags are all unique in order not to render a tag twice
    tagsArray = tagsArray.filter((words, index,array) => {
        return array.indexOf(words) === index;
    })
    console.log(temp)

    //this map method will help push all tags into tagArray
        tagsArray.map(tag => {     
          tagArray.push({tag:tag})
          } 
        )
      
    
   
     rankTag(contructTagAndPublished(tagArray,elementCount))
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
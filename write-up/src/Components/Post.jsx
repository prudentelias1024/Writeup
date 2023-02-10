import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material'
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
export default function Post({img}) {
    return (
        
           
            <div  className='w-full ml-[-.5em] rounded-lg border' >


           
            {
             img&&img !== null ?            
              <img src={img} className="w-full rounded-sm" alt="" />
                 : null
         
            }
            <div>        
                  <AuthorInfo image={mock}/>
                 <p className='font-[Mulish] px-[1em] text-start mx-[1.25em] whitespace-normal font-bold text-md w-full mt-[1em] lg:text-3xl lg:mt-3 lg:ml-9'>100 Days of Coding Experience</p>
                <div className="tags w-full flex-wrap mt-[.5em] flex flex-row ml-[2em] gap-2 ">
                <Tag  name="Programminglanguage"/>
                  <Tag  name="Lorem"/>
                <Tag  name="Lorem"/>
                <Tag  name="Lorem"/>

                </div>
                <Reactions/>
                </div>
                 
 
         </div>
    )
}
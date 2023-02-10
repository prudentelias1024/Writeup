import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material'
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
export default function Post({img}) {
    return (
        
           
            <div  className='w-full  m-auto rounded-lg border pr-[1em] lg:p-[1em]' >


           
            {
             img&&img !== null ?            
              <img src={img} className="w-full rounded-sm ml-[.5em]" alt="" />
                 : null
         
            }
            <div>        
                  <AuthorInfo image={mock}/>
                 <p className='font-[Mulish] px-[1em] text-start mx-[1.25em] whitespace-normal font-bold text-md w-full mt-[1em] lg:text-3xl lg:mb-[.5em]  lg:ml-auto'>100 Days of Coding Experience</p>
                <div className="tags w-full flex-wrap  flex flex-row ml-[1em] m-auto gap-2 lg:pl-[3em]  lg:gap-[.5em] lg:ml-[-.3em] ">
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
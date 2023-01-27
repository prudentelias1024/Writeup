import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material'
import AuthorInfo from './Post/AuthorInfo'
import mock from './mock.jpg'
import { Reactions } from './Post/Reactions'
import Tag from './Post/Tag'
export default function Post({img}) {
    return (
        <Card  className='rounded-sm' sx={{maxWidth: 650}}>


            <CardActionArea>
           {
            img&&img !== null ?            
             <CardMedia  sx={{ height: 240}} component="img" image={img} className="h-1/2" alt="" />
                : null
        
           }
            <CardContent>
            <AuthorInfo image={mock}/>
                <p className='font-[Museo] text-3xl font-bold mt-3 ml-9'>100 Days of Coding Experience</p>
               <Tag  name="Lorem"/>
               <Reactions/>
                
            </CardContent>
            </CardActionArea>
        </Card>
    )
}
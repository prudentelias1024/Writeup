import Post from "./Post";
import mock from './mock.jpg'

export default function Posts(){
    return(
       <div className="flex flex-col gap-8 absolute top-40 left-[45em]">
       <Post img={mock}/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       </div>
    );
}
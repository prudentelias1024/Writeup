import Post from "./Post";
import mock from './mock.jpg'

export default function Posts(){
    return(
       <div className="flex flex-col m-auto  gap-8 pt-[9em] lg:pt-[1em] lg:absolute lg:top-40 lg:left-[45em]">
       <Post img={mock}/>
        <Post img=""/>
       
       </div>
    );
}
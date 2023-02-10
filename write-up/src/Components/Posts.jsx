import Post from "./Post";
import mock from './mock.jpg'

export default function Posts(){
    return(
       <div className=" flex flex-col gap-8 pt-[6em] lg:absolute lg:top-40 lg:left-[45em]">
       <Post img={mock}/>
        <Post img=""/>
       {/* <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/>
       <Post img=""/> */}
       </div>
    );
}
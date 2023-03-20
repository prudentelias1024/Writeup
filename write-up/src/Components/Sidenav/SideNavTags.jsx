import { Link } from "react-router-dom";

export default function SideNavTags({tag}){
    return(
        <Link to={"/tag/"+ tag.split("#")[1]} className=" font-[Outfit] hover:text-purple-700 hover:rounded-3xl block w-[20em] ml-[-7em] text-base text-center p-3 px-6 font-bold" href="#">{tag}</Link>
         
        )

}
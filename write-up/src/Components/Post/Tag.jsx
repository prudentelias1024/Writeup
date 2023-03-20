import { Link } from "react-router-dom";

export default function Tag({key,name}){
    return(
          name !== null ?
            <Link to={'/tag/'+ name.split('#')[1]}  className=" text-md text-purple-500 font-[Outfit]">{name}</Link>
       :''
        )
}
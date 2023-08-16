import { Link } from "react-router-dom";

export default function Tag({name}){
    return(
          name !== null ?
            <Link to={'/tag/'+ name.split('#')[1]}  className=" text-sm text-purple-500 font-[Sen]">{name}</Link>
       :''
        )
}
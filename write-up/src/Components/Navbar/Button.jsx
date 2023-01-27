import { Link } from "react-router-dom"

export default function Button({name, textColor, borderColor, to}){
    return(
        <Link to={to} className={borderColor+  " "+textColor + " border ml-4  bg-white rounded-lg p-5 w-auto font-[Museo] h-[4em]"} type="submit">{name}</Link> 
    )
}
import { Link } from "react-router-dom"

export default function Button({name,additionalStyles, textColor, borderColor, to}){
    return(
        <Link to={to} className={additionalStyles + " " + borderColor+  " "+textColor + " border my-auto ml-[-7em] mr-[1em] lg:mx-4  bg-white rounded-lg p-3 w-auto font-[Outfit] h-[3em]"} type="submit">{name}</Link> 
    )
}
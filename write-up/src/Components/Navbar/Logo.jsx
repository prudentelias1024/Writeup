import { Link } from "react-router-dom";
import Inkup from "../inkup.png";
export default function Logo() {
    return(
    <div className=" mt-[-.5em] py-[.5em] text-center lg:ml-[-15em] flex">
       <img className="w-[3em] h-[3em] mt-[1em]  text-center" src={Inkup} alt="Inkup"/>
        <Link to='/' className="font-[Pacifico] text-3xl md:block lg:block ml-3 mt-5 mb-2 w-[8em]   lg:text-3xl font-extrabold">Ink Up</Link>
    </div>
    );
}
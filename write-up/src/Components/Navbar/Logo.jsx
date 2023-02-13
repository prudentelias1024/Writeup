import { Link } from "react-router-dom";

export default function Logo() {
    return(
    <div className=" mt-[-.5em] py-[.5em] lg:ml-12 flex">
     
        <Link to='/' className="font-[Pacifico] ml-3 mt-5 mb-2 text-2xl lg:text-3xl font-extrabold">Ink Up</Link>
    </div>
    );
}
import { RxHamburgerMenu } from "react-icons/rx";
export default function Logo() {
    return(
    <div className="ml-[5em] mt-[-.5em] py-[.5em] lg:ml-12 flex">
            <RxHamburgerMenu className="text-4xl ml-1 mt-[.5em]" />
        <p className="  font-[Pacifico] ml-3 mt-5 mb-2 text-2xl lg:text-3xl font-extrabold">Ink Up</p>
    </div>
    );
}
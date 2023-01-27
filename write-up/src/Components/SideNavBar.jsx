import SideNavLink from "./Sidenav/SideNavLink";
import { IoIosHome, IoMdTrendingDown } from "react-icons/io";
import { AiFillBulb } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import TrendingTags from "./Sidenav/TrendingTags";
import PopularTags from "./Sidenav/PopularTags";

export default function SideNavBar(){
    return(
        <div className="flex flex-col gap-3 ml-96 mt-32 fixed">
            <SideNavLink icon={<IoIosHome className="text-2xl"/>} name="Home"/>
            <SideNavLink icon={<FaHashtag className="text-2xl"/>} name=" Tags"/>
            <SideNavLink icon={<AiFillBulb className="text-2xl"/>} name="FAQ"/>
            {/* <SideNavLink icon={<IoIosHome className="text-2xl"/>} name="Home"/> */}
            {/* <SideNavLink icon={<IoIosHome className="text-2xl"/>} name="Home"/> */}
            {/* <IoMdTrendingUp/> */}
            <TrendingTags/>
            <PopularTags/>
        </div>
    );
}
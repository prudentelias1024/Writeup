import SideNavTags from "./SideNavTags";

export default function TrendingTags(){
    return(
        <>
        <div className="hidden lg:block">

        <p className=" text-lg font-bold font-[Mulish] mb-3 mt-3">Trending Tags</p>
        <div className="flex flex-col text-center m:auto pl-3 gap-3 h-[15em] px-10 ">
        <SideNavTags/>
        <SideNavTags/>
      
        </div>
        </div>
        </>
    )

}
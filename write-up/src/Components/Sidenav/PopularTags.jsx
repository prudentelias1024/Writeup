import SideNavTags from "./SideNavTags";

export default function PopularTags(){
    return(
        <>
        <p className="text-lg font-bold font-[Mulish] mt-3">Popular Tags</p>
        <div className="flex flex-col pl-3 gap-3 h-[20em] px-10 overflow-y-auto">
         <SideNavTags/>
         <SideNavTags/>
         <SideNavTags/>
         <SideNavTags/>
         <SideNavTags/>
         <SideNavTags/>
         <SideNavTags/>
        </div>
        </>
    )

}
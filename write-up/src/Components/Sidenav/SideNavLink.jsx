export default function SideNavLink({icon, name}){
    return(
        <a href="#" className="flex flex-row gap-2 hover:px-10
 hover:bg-white-500 hover:border hover:border-pink-600 p-2 hover:rounded-md hover:text-pink-600">
           {icon}
            <p className="font-[Museo] text-xl">{name}</p>
        </a>
    );
}
export default function SideNavLink({additionalStyles,icon, name}){
    return(
        <a href="#" className={additionalStyles +" "+  " hover:bg-[#f7f9f9] hover:rounded-3xl block w-[10em]  lg:-[-.5em] text-xl text-center py-2 px-6 font-semibold "}>
           {icon}
            <p className="font-[Mulish] text-xl mt-[-1.25em] ml-[-.5em]">{name}</p>
        </a>
    );
}
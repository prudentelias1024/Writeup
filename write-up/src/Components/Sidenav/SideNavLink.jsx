export default function SideNavLink({link,additionalStyles,icon, name}){
    return(
        <a href={link} className={additionalStyles +" "+  " hover:scale-110 block w-[10em]  lg:-[-.5em] text-xl text-center py-2 px-6 font-semibold "}>
           {icon}
            <p className="font-[Outfit] text-xl mt-[-1.25em] ml-[-.5em]">{name}</p>
        </a>
    );
}
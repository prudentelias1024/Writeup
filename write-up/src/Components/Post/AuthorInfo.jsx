export default function AuthorInfo({image}){
    return(
        <div className='flex flex-row gap-2'>

        <img src={image} alt="Author" className='rounded-full h-8 w-8'  />
        <div className='-mt-1'>
        <p className='font-[Mulish] font-bold text-base'>Prudent Elias</p>
        <p className="font-[Mulish] text-xs -mt-1">Jul 23</p>
        </div>
        </div>
        
    )
}
export default function AuthorInfo({image}){
    return(
        <div className='flex flex-row gap-2'>

        <img src={image} className='w-[3em] h-[3em] rounded-full object-cover' /> 

        <div className=''>
                <p className="author_title font-extrabold  text-[#171717] text-xl font-[Montserrat]"> Prudent Elias</p>
                <p className="font-medium text-base -mt-[.3em] text-[#717171] font-[montserrat]">Posted on Jan 23</p>
                </div>
        </div>
        
    )
}
export default function AuthorInfo({author}){
    return(
        <div className='mt-3 ml-[1.5em] mb-3 flex flex-row gap-2'>

        <img src={author.public_picture} className='w-[2.5em] h-[2.5em] lg:w-[3em] lg:h-[3em] rounded-full object-cover' /> 

        <div className=''>
                <p className="author_title  text-md font-extrabold  text-[#171717] lg:text-xl font-[Montserrat]"> {author.name}</p>
                <p className="font-medium text-xs lg:mt-[.125em] lg:text-sm -mt-[.3em] text-[#717171] font-[montserrat]">Posted on Jan 23</p>
                </div>
        </div>
        
    )
}
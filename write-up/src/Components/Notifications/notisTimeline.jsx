import React from 'react'
import Header from '../header'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Poll from '../poll'
import ImageReel from '../imageReel'

export default function NotisTimeline() {
    const {notis} = useSelector(state => state)
  return (
      <div className='lg:ml-[10em]'>
        <Header/>
        {
            notis.length != 0 ?
                notis.map((post) => {
                if(post.type == "poll"){
                    return <Link to={'/reels/'+post.postId}>
                          <Poll reel={post} key={post.postId} /> 
                    </Link>
                  }else if(post.type == "image"){
                    return <ImageReel reel={post} key={post.postId} /> 
                    
                }
            }):
            <p className="font-[Sen] text-sm font-bold text-[#ccc] mt-[50%] m-auto text-center">No one added to your notis yet</p>
        
            
    }

    </div>
  )
}

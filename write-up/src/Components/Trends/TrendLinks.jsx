import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function TrendLinks({tag,count}) {
  const navigate = useNavigate()
  const redirectToSearch = () => {
     navigate(`/search/results?search=${tag}`)
  }
  return (
    <div onClick={redirectToSearch}
     className="trends ml-[1em] py-[.5em] border-bottom-[1px]">
    <p className="font-[Avenir] font-extrabold text-lg text-[#333]">#{tag}</p>
    <p className="font-[Avenir] text-xs text-[#9e9e9e] font-bold">{count} posts</p>
    
    </div>
)
}

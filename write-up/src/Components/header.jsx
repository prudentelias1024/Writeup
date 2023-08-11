import React from 'react'
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation()
    const path = location.pathname.split('/')[1]
  return (
    <div className="w-full z-[4em] bg-[#fff]  font-[Maven] text-xl font-bold mt-[.25em] p-[.5em] pl-[.75em] ">
        {path.replace(path[0],path[0].toUpperCase())}
    </div>

  )
}

import React, { useContext } from 'react'
import { SocketContext } from '../socketProvider'

export default function Refresh() {
       const socket = useContext(SocketContext);
       const getQueuedPost = () => {
            socket.emit('app_refresh')
       }
  return (
    <div onClick={getQueuedPost} className='cursor-pointer bg-blue-500 w-[10em] p-[0.5em] text-white rounded-[1.5em] text-center absolute top-[4em] left-[40%]' >
       New Posts
    </div>
  )
}

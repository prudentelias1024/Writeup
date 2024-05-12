import React from 'react'
import Message from './Message'

export default function MessagersList() {
  return (
    <div className='flex flex-col gap-[.5em] '>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}

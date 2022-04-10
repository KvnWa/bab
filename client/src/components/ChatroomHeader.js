import React from 'react'

function ChatroomHeader({ name }) {
  return (
    <header className='chatroom-header'>
      <h1>{name}</h1>
    </header>
  )
}

export default ChatroomHeader
import React, { useRef, useEffect } from 'react'
import Message from './Message'

function Messages({ messages, currentMember, handleMessageDelete }) {
  const messageEndRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  }, [messages.length])

  return (
    <div className='messages'>
      {
        messages.map(message => <Message key={message.id} message={message} currentMember={currentMember} handleMessageDelete={handleMessageDelete}/>)
      }
      <div ref={messageEndRef}/>
    </div>
  )
}

export default Messages
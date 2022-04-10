import React from 'react'
import logo from '../images/tophatmonocle-hat-transparent.png'


function ChatroomSearchListItem({ chatroom, selectedChatroom, handleSelectedChatroom }) {
  const { id, name, image_url, bio } = chatroom

  function handleChatroomClick() {
    handleSelectedChatroom(id)
  }

  return (
    <div className={selectedChatroom === id ? 'search-item selected' : 'search-item'} onClick={handleChatroomClick}>
      <img src={image_url || logo} alt={image_url === '' ? 'moustache man' : 'chatroom image'} />
      <h3>{name}</h3>
      <p>{bio}</p>
    </div>
  )
}

export default ChatroomSearchListItem
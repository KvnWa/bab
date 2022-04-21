import React from 'react'
import logo from '../images/babblelogo.png'


function ChatroomSearchListItem({ chatroom, selectedChatroom, handleSelectedChatroom }) {
  const { id, name, image_url, bio } = chatroom

  function handleChatroomClick() {
    handleSelectedChatroom(id)
  }

  return (
    <div className={selectedChatroom === id ? 'search-item selected' : 'search-item'} onClick={handleChatroomClick}>
      <h3>{name}</h3>
      <img src={image_url || logo} alt={image_url === '' ? 'babble' : 'image'} />
      <p>{bio}</p>
    </div>
  )
}

export default ChatroomSearchListItem
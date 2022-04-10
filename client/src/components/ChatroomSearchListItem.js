import React from 'react'



function ChatroomSearchListItem({ chatroom, selectedChatroom, handleSelectedChatroom }) {
  const { id, name, image_url, bio } = chatroom

  function handleChatroomClick() {
    handleSelectedChatroom(id)
  }

  return (
    <div className={selectedChatroom === id ? 'search-item selected' : 'search-item'} onClick={handleChatroomClick}>
      <h3>{name}</h3>
      <p>{bio}</p>
    </div>
  )
}

export default ChatroomSearchListItem
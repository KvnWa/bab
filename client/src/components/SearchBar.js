import React from 'react'

function ChatroomSearchBar({ search, handleSearch, handleSearchBy }) { 
  function handleSearchChange(e) {
    handleSearch(e.target.value)
  }

  function handleChangeSearchhange(e) {
    handleSearchBy(e.target.value)
  }

  return (
    <div className='chatroom-search-bar'>
      <input 
        type='text'
        placeholder='Search for a channel'
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default ChatroomSearchBar
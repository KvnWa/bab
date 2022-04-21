import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatroomSearchBar from './SearchBar'
import SearchGrid from './SearchGrid'
import ChatroomSearchListItem from './SearchItem'

function ChatroomSearch({ handleMember }) {
  const [chatrooms, setChatrooms] = useState([])
  const [search, setSearch] = useState('')
  const [searchBy, setSearchBy] = useState('name')
  const [selectedChatroom, setSelectedChatroom] = useState(0)
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/chatrooms')
      .then(r => r.json())
      .then(data => setChatrooms(() => data))
  }, [])

  function handleChatroomJoin() {
    fetch(`/api/chatrooms/${selectedChatroom}/chatroom_memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(r => {
        if (r.ok) {
          r.json().then(chatroom => {
            handleMember(chatroom)
            navigate(`/chatrooms/${chatroom.id}`)
          })
        } else {
          r.json().then(({ errors }) => setErrors(() => errors))
        }
      })
  }

  function handleSearch(search) {
    setSearch(() => search)
  }

  function handleSearchBy(searchBy) {
    setSearchBy(() => searchBy)
  }

  function handleSelectedChatroom(selectedChatroom) {
    setSelectedChatroom(() => selectedChatroom)
  }

  function chatroomSearchResults() {
    return chatrooms.filter(chatroom => chatroom[searchBy].toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div className='chatroom-search'>
      <div className='chatroom-container'>
        <div className="chatroom-top">
          <SearchGrid search={search} handleSearch={handleSearch} searchBy={searchBy} handleSearchBy={handleSearchBy} />
          <button className='search-submit-button' onClick={handleChatroomJoin}>Join Channel</button>
        </div>

        <SearchGrid>
          {
            chatroomSearchResults().map(chatroom => <ChatroomSearchListItem key={chatroom.id} chatroom={chatroom} selectedChatroom={selectedChatroom} handleSelectedChatroom={handleSelectedChatroom} />)
          }
        </SearchGrid>
        <div className='search-error'>
          {
            errors.map(error => <p key={error}>{error}</p>)
          }
        </div>

      </div>
    </div>
  )
}

export default ChatroomSearch
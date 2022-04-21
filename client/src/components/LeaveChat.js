import React from 'react'
import { useNavigate } from 'react-router-dom'

function LeaveChat({ currentMember, withdrawal }) {
  const navigate = useNavigate()

  function handleChatroomWithdrawal() {
    fetch(`/api/chatrooms/${currentMember.chatroom_id}/chatroom_memberships/${currentMember.id}`, {
      method: 'DELETE'
    })
    .then(r => {
      if (r.ok) {
        r.json().then(chatroom => {
          withdrawal(chatroom)
          navigate('/chatrooms')
        })
      }
    })
  }

  return (
    <div className='chatroom-withdrawal'>
      <button
        onClick={handleChatroomWithdrawal}
        className='bttn-1'
      >Leave<br/>Channel</button>
    </div>
  )
}

export default LeaveChat
import React from 'react'
import logo from '../images/babblelogo.png'
import { useNavigate } from 'react-router-dom'
import edit from '../images/edit2.png';
import exit from '../images/x-svgrepo-com.svg';

function Message({ message, currentMember, handleMessageDelete }) {
  const { id, date_created, content, user} = message
  const creator = currentMember.user_id === user.id
  const navigate = useNavigate()

  function handleDelete() {
    fetch(`/api/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => {
      if (r.ok) {
        r.json().then(handleMessageDelete)
      }
    })
  }

  return (
    <div className='message'>
      <img className='img-5' src={user.image_url || logo} alt={user.image_url === '1' ? '2' : '3'} />
      <div className='content'>
        <div className='message-heading'>
          <h5><span className='creator'>{user.username}</span> {date_created}</h5>
          {creator ? 
            <div className='message-buttons'>
              <button 
                className='icon' 
                onClick={() => navigate(`/chatrooms/${currentMember.chatroom_id}/messages/${id}/edit`)}
                title='edit'
              ><img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" alt="edit"/></button> 
              <button 
                className='icon' 
                onClick={handleDelete}
                title='delete'
              ><img src={exit} alt="exit"/></button>
            </div>
            : ''}
        </div>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default Message
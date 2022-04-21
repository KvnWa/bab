import React, { useEffect, useState } from 'react'
import logo from '../images/babblelogo.png'
import { profileImages } from './helpers/formhelpers'

function UserProfile({ user, handleUser }) {
  const [image, setImage] = useState(user.image_url)
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    fetch('/api/profile')
    .then(r => {
      if (r.ok) {
        r.json().then(info => {
          setProfileInfo(info)
        })
      }
    })
  }, [])

  function handleImageChange(e) {
    const { value } = e.target
    setImage(value) 
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    
    fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url: image })
    })
    .then(r => {
      if (r.ok) {
        r.json().then(user => {
          handleUser(user)
        })
      }
    })
  }

  return (
    <div className='user-profile'>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label style={{color: 'white'}}>Change Profile Image:
            <br />
            <select value={image} onChange={handleImageChange}>
              <option value=''>Default</option>
              {
                profileImages.map(({ name, image_url }) =>
                  <option key={name} value={image_url}>{name}</option>
                )
              }
            </select>
            <br />
            <img className='img-2' src={image ||  logo} alt='default'/>
          </label>
        </div>
        <input className='bttn-1' type='submit' value='Save' disabled={user.image_url === image}/>
      </form>
      <h2 style={{color: 'white'}}>Chat Logs</h2>
      <div className='membership-logs-container'>
        {
          profileInfo.chatlog ? (
            profileInfo.chatlog.map(({chatroom, messages}) => (
              <div key={chatroom}>
                <h3>{chatroom}</h3>
                <textarea
                  readOnly
                  rows='5'
                  cols='40'
                  value={
                    messages.map(({ content, created_at }) => (`Message: ${content}\nSent At: ${created_at}\n`)).join('\n')
                  }
                />
              </div>
            ))
          ) : ''
        }
      </div>
    </div>
  )
}

export default UserProfile
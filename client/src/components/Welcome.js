import React from 'react'


function Welcome({ user: {image_url, username} }) {
  return (
    <div className='welcome'>
      <p>Welcome back to Babble, <br/> <span className='username'>{username}</span></p>
    </div>
  )
}

export default Welcome
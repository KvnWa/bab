import React from 'react'

function Member({ member }) {
  const {username} = member
  return <p>{username}</p>
}

export default Member
import React from 'react'

function Member({ member }) {
  const { username} = member
  return (
    <div>
      <p>{username}</p>
    </div>
  )
}

export default Member
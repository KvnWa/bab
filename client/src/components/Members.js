import React from 'react'
import Member from './Member'

function Members({ members }) {
  return (
    <div className='members'>
      <h3>Members:</h3>
      <div>
        {
          members.map(member => <Member key={member.id} member={member}/>)
        }
      </div>
    </div>
  )
}

export default Members
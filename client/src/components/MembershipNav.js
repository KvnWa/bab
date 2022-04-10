import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../images/babblelogo.png'

function MembershipNav({ memberships }) {
  const activeStyle = { backgroundColor: '#121212' }
  return (
    <div className='membership-nav'>
      <nav>
        <h3>Your Channels</h3>
        {
          memberships.map(({id, name, image_url}) => {
            return (
              <NavLink 
                className='membership-nav-button' 
                key={id} 
                to={`/chatrooms/${id}`}
                style={({ isActive }) =>
                isActive ? activeStyle : undefined
                }
                >
                 
                  <h4>{name}</h4>
                  <img src={image_url || logo} alt={image_url === '' ? 'babble' : 'image'} />
              </NavLink>
            )
          })
        }
      </nav>
      <Outlet />
    </div>
  )
}

export default MembershipNav
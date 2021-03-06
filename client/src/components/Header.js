import React from 'react'
import useWindowSize from '../hooks/useWindowSize'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import logo from '../images/babblelogo.png'

function Header({ handleUser, user }) {
  const [windowWidth] = useWindowSize();
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const activeStyle = { backgroundColor: '#121212', color: '#ffff' }

  function handleLogout() {
    fetch('/api/logout', {
      method: 'DELETE'
    })
      .then(r => {
        if (r.ok) {
          handleUser(null)
          navigate('/')
        }
      })
  }

  return (
    <>
      <header className='main-header'>
        <nav className='main-header-nav'>
          <div className='header-left'>
            {
              windowWidth > 740 ? (
                <NavLink
                  className='nav-button'
                  to='/chatrooms'
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  end={pathname === '/chatrooms/search'}
                >
                  Subscribed
                </NavLink>
              ) : ''
            }
            {
              windowWidth > 1000 ? (
                <>
                  <NavLink
                    className='nav-button'
                    to='/chatrooms/search'
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Explore
                  </NavLink>
                </>
              ) : ''
            }
          </div>
          <div>
            <Link className='heading' to='/'>
              <img className='img-3' src={logo} alt='babble' />
            </Link>
          </div>
          <div>
            <div className="header-right">
              <button onClick={handleLogout} className="nav-button2" style={{ backgroundColor: 'white' }}>Logout</button>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Header
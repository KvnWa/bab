import React from 'react'
import { NavLink } from 'react-router-dom';
import welcome1 from '../images/welcome1.svg';
import welcome2 from '../images/welcome2.svg';
import welcome3 from '../images/welcome3.svg';




function Welcome({ user: { image_url, username } }) {


  const activeStyle = { backgroundColor: '#121212', color: '#ffff' }

  return (
    <div className='welcome'>
      {/* <p>Welcome back to Babble, <br/> <span className='username'>{username}</span></p> */}
      <div className='welcome-center'>
        <h1>IMAGINE A PLACE...</h1>
        <h5>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h5>
        <NavLink
          className='nav-button'
          to='/chatrooms/search'
        >
          Explore
        </NavLink>
        <div className='welcome-i'>
          <img src={welcome1} />
          <img src={welcome2} />
          <img src={welcome3} />
          <div>
          <script src="https://tokbox.com/embed/embed/ot-embed.js?embedId=73791ee3-5f21-48f6-9bba-a99309b98792&room=DEFAULT_ROOM"></script>
          </div>
        </div>
      </div>
     

      
    </div >
  )
}

export default Welcome
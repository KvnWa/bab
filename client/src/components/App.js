import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Login'
import Header from './Header'
import Chatroom from "./Chatroom";
import ChatroomSearch from "./Search";
import MembershipNav from "./MembershipNav";
import Welcome from './Welcome'

function App() {

  
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    fetch("/api/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((userData) => { 
            setUser(() => userData)
            setAuthenticated(authenticated => !authenticated) 
          })
        } else {
          setAuthenticated(authenticated => !authenticated)
        }
      })
  }, []);

  function handleUser(user) {
    setUser(() => user)
  }

  function handleMember(chatroom) {
    setUser(user => {
      const updatedUser = { ...user }
      updatedUser.memberships = [ ...user.memberships, chatroom ]
      return updatedUser;
    })
  }

  function withdrawal(chatroom) {
    setUser(user => {
      const updatedUser = { ...user };
      updatedUser.memberships = user.memberships.filter(membership => membership.id !== chatroom.id)
      return updatedUser
    })
  }

  function unauth() {
    if (!authenticated) {
      return <div></div>
    } else {
      return <Login handleUser={handleUser}/>
    }
  }

  function authorizedUser() {
    return (
      <Routes>
        <Route path="/" element={<Header handleUser={handleUser} user={user}/>}>
          <Route path="chatrooms" element={<MembershipNav memberships={user.memberships}/>}>
            <Route path=":chatroomId/*" element={<Chatroom user={user} withdrawal={withdrawal}/>}/>
          </Route>
          <Route path="chatrooms/search" element={<ChatroomSearch handleMember={handleMember} />}/>
          <Route index element={<Welcome user={user}/>} />
        </Route>
        <Route path="*" element={<Navigate to="/"/> }/>
      </Routes>
    )
  }

  return (
    <div className={!user ? 'login' : 'main-site-container'}>
      { !user ? unauth() : authorizedUser() }
    </div>
  );
}

export default App;
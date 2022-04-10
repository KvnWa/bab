import React from 'react'
import LoginForm from './LoginForm'
import logo from '../images/babblelogo.png'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUpForm from './SignUpForm'

function Login({ handleUser }) {
  return (
    <>
      <img className='img-1' src={logo} alt='babble'/>
      <h2>Welcome to Babble!</h2>
      <Routes>
        <Route path='/' element={<LoginForm handleUser={handleUser} />} />
        <Route path='/signup' element={<SignUpForm handleUser={handleUser} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default Login
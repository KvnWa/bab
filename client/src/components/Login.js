import React from 'react'
import LoginForm from './LoginForm'
import logo from '../images/babblelogo.png'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './SignUp'

function Login({ handleUser }) {
  return (
    <>
      <img className='img-1' src={logo} alt='babble'/>
      <Routes>
        <Route path='/' element={<LoginForm handleUser={handleUser} />} />
        <Route path='/signup' element={<SignUp handleUser={handleUser} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default Login
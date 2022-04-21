import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import logo from '../images/babblelogo.png'
import { profileImages } from './helpers/formhelpers.js'

function SignUpForm({ handleUser }) {

  const signUpFormDefaultValues = {
    username: '',
    password: '',
    password_confirmation: '',
    image_url: 'https://cdn-icons-png.flaticon.com/128/3940/3940403.png'
  }
  
  const [formData, setFormData] = useState(signUpFormDefaultValues)
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  

  function handleFormChange(e) {
    const { name, value } = e.target
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(r => {
      if (r.ok) {
        r.json().then(user => {
          setFormData(signUpFormDefaultValues)
          navigate('/')
          handleUser(user)
        })
      } else {
        r.json().then(e => {
          setErrors(() => e.errors)
        })
      }
    })
  }

  

  return (
    <div className='sign-up-form'>
      <form onSubmit={handleFormSubmit}>
        <div className='sign-up-form-containers'>
          <div className='sign-up-form-container-1'>
            <br />
            <label>Username:
              <br/>
              <input 
                type='text'
                name='username'
                value={formData.username}
                onChange={handleFormChange}
              />
            </label>
            <br/>
            <label>Password:
              <br/>
              <input 
                type='password'
                autoComplete='off'
                name='password'
                value={formData.password}
                onChange={handleFormChange}
              />
            </label>
            <br/>
            <label>Password Confirmation:
              <br/>
              <input 
                type='password'
                autoComplete='off'
                name='password_confirmation'
                value={formData.password_confirmation}
                onChange={handleFormChange}
              />
            </label>
          </div>
          <div className='sign-up-form-container-2'>
            <br />
            <label>Choose Profile Image:
              <br />
              <select name='image_url' value={formData.image_url} onChange={handleFormChange}>
                <option value='https://cdn-icons-png.flaticon.com/128/3940/3940403.png'>Default</option>
                {
                  profileImages.map(({ name, image_url }) =>
                    <option key={name} value={image_url}>{name}</option>
                  )
                }
              </select>
              <br />
              <img className='img-2' src={formData.image_url ||  logo} alt='default'/>
            </label>
          </div>
        </div>
        <input className='bttn-1 submit-button' type='submit' value='Register'/>
      </form>
      {
        errors.map(error => 
          <p key={error} className='form-error'>{error}</p>
        )
      }
      <p><Link to='/'>Sign in</Link> if account<br/>does exist</p>
    </div>
  )
}

export default SignUpForm
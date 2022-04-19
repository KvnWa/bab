import React, { useState } from 'react';
import { Link, } from 'react-router-dom';

function LoginForm({ handleUser }) {
  const defaultLoginFormData = {
    username: '',
    password: ''
  }

  const [formData, setFormData] = useState(defaultLoginFormData)
  const [errors, setErrors] = useState([])

  //spread form data over the array

  function handleFormChange(e) {
    const { name, value } = e.target
    setFormData(formData => ({ ...formData, [name]: value }) ) 
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(r => {
      if (r.ok) {
        r.json().then(user => {
          setFormData(() => defaultLoginFormData)
          handleUser(user)
        })
      } else {
        r.json().then(({errors}) => {
          setErrors(errors)
        })
      }
    })
  }

  return (
    <div className='user-form'>
      <form onSubmit={handleFormSubmit}>
        <label>Username:
          <br />
          <input 
            type='text'
            name='username'
            value={formData.username}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>Password:
          <br />
          <input 
            type='password'
            autoComplete='off'
            name='password'
            value={formData.password}
            onChange={handleFormChange}
          />
        </label>
        <input className='bttn-1 submit-button' type='submit' value='Sign In'/>
      </form>
      {
        errors.map(error => <p key={error} className='form-error'>{error}</p>)
      }
      <p>Register an <Link to='/signup'>account</Link>,<br/> if you do not already have one.</p>
    </div>
  )
}

export default LoginForm
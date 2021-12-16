import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext.js"
import { useNavigate } from "react-router-dom"


const RenderLoginPage = () => {
  const {globalUser, setGlobalUser} = useContext(UserContext)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = async (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const HandleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      email: values.email,
      password: values.password
    }

    const user = await fetch(`http://localhost:3001/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(data => {
        return data
      })
      setGlobalUser(user)
      navigate('/')
  }

  const getCreateAccountPage = async (event) => {
    event.preventDefault()
    navigate('/signup')
  }

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <input type="email" name="email" placeHolder="Your Email" value={values.email} onChange={handleChange} required/>
        {submitted && !values.name && <span>Please enter an email</span>}
        <input type="password" name="password" placeHolder="Your Password" value={values.password} onChange={handleChange} required/>
        {/* <span>Please enter a password</span> */}
        <button type="submit">Log In</button>
      </form>
      <form onSubmit={getCreateAccountPage}>
        <button type="submit">Create Account</button>
      </form>
    </>
  )

}

export default RenderLoginPage
import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext.js"
import { useNavigate } from "react-router-dom"


const RenderLoginPage = () => {
  const {globalUser, setGlobalUser} = useContext(UserContext)

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  //use this to refactor DRY code
  // handleChange = (event) => {
  //   const value = event.target.value;
  //   this.setState({
  //     ...this.state,
  //     [event.target.name]: value,
  //   });
  // };

  const handleEmailInputChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      email: event.target.value
    }))
  }

  const handlePasswordChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      password: event.target.value
    }))
  }

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

      console.log(user)
      setGlobalUser(user)
      console.log(globalUser)
      // storeUser(user)
      // navigate('/userpage')
  }

  const storeUser = async (user) => {
    setGlobalUser(user)
    console.log(globalUser)
  }

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <input type="email" name="email" placeHodler="Your Email" value={values.email} onChange={handleEmailInputChange} required/>
        {submitted && !values.name && <span>Please enter an email</span>}
        <input type="password" name="password" placeHodler="Your Password" value={values.password} onChange={handlePasswordChange} required/>
        <span>Please enter a password</span>
        <button type="submit">Log In</button>
      </form>
      <p>{globalUser.email}</p>
      {/* <form onSubmit={renderSubmitForm}>
        <button type="submit">Create Account</button>
      </form> */}
    </>
  )

}

export default RenderLoginPage
import React, { useState } from 'react';


export default function RenderLoginPage() {

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch("http://localhost:3000/api/login")
    const user = await response.json()
    return user
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeHodler="Your Email" value={values.email} onChange={handleEmailInputChange}/>
        {submitted && !values.name && <span>Please enter an email</span>}
        <input type="password" name="password" placeHodler="Your Password" value={values.password} onChange={handlePasswordChange}/>
        <span>Please enter a password</span>
        <button type="submit">Log In</button>
      </form>
      <form onSubmit={renderSubmitForm}>
        <button type="submit">Create Account</button>
      </form>
    </>
  )

}
import React, { useState } from 'react';


export default function RenderLoginPage() {

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [submitted, setSubmitted] = useState(false)

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
import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext.js"
import { useNavigate } from "react-router-dom"


const Signup = () => {
  const {globalUser, setGlobalUser} = useContext(UserContext)
  const [values, setValues] = useState('')
  const navigate = useNavigate()

  const HandleSubmit = (event) => {
    event.preventDefault()
    const newAccountData = {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image
    }

    const newUser = fetch(`http://localhost:3001/api/users/create-account`, {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
       },
      body: JSON.stringify(newAccountData)
    })
      .then(response => response.json())
      .then(data => {
        return data
      })

      setGlobalUser(newUser)
      navigate('/userpage')
  }

  const handleChange = async (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

    return (
      <form onSubmit={HandleSubmit}>
        <input type="text" name="name" placeHolder="Your name" value={values.name} onChange={handleChange} required/>
        <input type="email" name="email" placeHolder="Your Email" value={values.email} onChange={handleChange} required/>
        <input type="password" name="password" placeHolder="Your Password" value={values.password} onChange={handleChange} required/>
        <input type="text" name="image" placeHolder="Image URL" value={values.image} onChange={handleChange} required/>
        <button type="submit">Create Account</button>
      </form>
    );
}

export default Signup;

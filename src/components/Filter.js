import React, { useState, useContext, useEffect } from 'react';
import { UserContext, FilterQueryContext } from "./UserContext.js"
import { useNavigate } from "react-router-dom"

const Filter = () => {
  const {globalUser, setGlobalUser} = useContext(UserContext)
  const {globalFilterQuery, setGlobalFilterQuery} = useContext(FilterQueryContext)
  const [userWorkouts, setUserWorkouts] = useState([])
  const [workoutFilterType, setWorkoutFilterType] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
     const response = await fetch(`http://localhost:3001/api/users/${globalUser.id}`)
     const data = await response.json()
     setUserWorkouts(data.workouts)
    } catch(error) {
      console.log(error)
    }
  }

  const HandleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = async (event) => {
    const selectedInput = event.target.value;
    setGlobalFilterQuery(selectedInput)
  }

    return (
      <>
      <form onSubmit={HandleSubmit}>
        <input type="radio" name="filterGroup" value="Weight-Lifting" onChange={handleChange}/>Weight Lifting<br/>
        <input type="radio" name="filterGroup" value="Running" onChange={handleChange}/>Running<br/>
        <input type="radio" name="filterGroup" value="Walking" onChange={handleChange}/>Walking<br/>
        <input type="radio" name="filterGroup" value="HIIT" onChange={handleChange}/>HIIT<br/>
        <button type="submit">Filter</button>
        {console.log("globalFilterQuery", globalFilterQuery)}
      </form>

      </>
    );
}

export default Filter;

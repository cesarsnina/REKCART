import React from 'react';
import { useState }  from 'react';
// import { useHistory } from 'react-router-dom';     ---- requires npm i react-router-dom

const WorkoutForm = (props) => {
  const handleUpdate = (event) => {
    fetch(``)
    .then(res => res.json())
    .then((data) => {
      console.log(data.values)
    })
  }


  return (
    <div class="workout-form">
        <h2>{props.heading}</h2>
        <form onSubmit={props.submit}>
          <label>Type:</label>
            <select name="type" value={props.values.type} onChange={props.handleChange}>
            <option value="Weight-Lifting">Weight Lifting</option>
            <option value="Running">Running</option>
            <option value="Walking">Walking</option>
            <option value="HIIT">HIIT</option>
          </select>
            <label>Calories:</label>
          <input 
            name="calories"
            type="number" 
            required
            value={props.values.calories}
            onChange={props.handleChange}
          />
          <label>Date:</label>
          <input 
            name="date"
            type="date" 
            required
            value={props.values.date}
            onChange={props.handleChange}
          />
          <label>Time Elapsed:</label>
          <input 
            name="time"
            type="number" 
            require
            value={props.values.time}
            onChange={props.handleChange}
          />
          <button type="submit">{props.heading}</button>
        </form>
      </div>
  )
};

export default WorkoutForm;
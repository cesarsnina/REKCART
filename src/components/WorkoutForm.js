import React from 'react';
import { useState }  from 'react';
// import { useHistory } from 'react-router-dom';     ---- requires npm i react-router-dom

const WorkoutForm = () => {
  // TODO: Obtain props and use to obtain user id
  const [isPending, setIsPending] = useState(false);
  // const history = useHistory();   ---- requires npm i react-router-dom

  const [values, setValues] = useState({
    type: '',
    calories: '',
    date: undefined,
    time: ''
  });

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const workout = { type, calories, date, time };
    // this is so we can see what the work out looks like when saved
    console.log(values);

    setIsPending(true);
    // TODO: Send work out data to HTML?? what happens when i press submit
    fetch('http://localhost:3000/api/users/1/workout', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }).then(() => {
    // Add the workout to the database -> call Work.create here??
      console.log('New workout added');
      setIsPending(false);
      // history.push('/')   ---- requires npm i react-router-dom
    })
  };

  const handleChange = (e) => {
    // e.persist()
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }  

  return (
    <div class="workout-form">
      <h2>Add a New Workout</h2>
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <input
          name="type" 
          type="text" 
          required
          value={values.type}
          onChange={handleChange}
        />
         <label>Calories:</label>
        <input 
          name="calories"
          type="text" 
          required
          value={values.calories}
          onChange={handleChange}
        />
        <label>Date:</label>
        <input 
          name="date"
          type="text" 
          required
          value={values.date}
          onChange={handleChange}
        />
        <label>Time Elapsed:</label>
        <input 
          name="time"
          type="text" 
          required
          value={values.time}
          onChange={handleChange}
        />
        { !isPending && <button>Add Workout</button> }
        { isPending && <button disabled>Adding Workout...</button> }
      </form>
    </div>
  );
};

export default WorkoutForm;



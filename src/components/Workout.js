import { useState, useEffect } from 'react';
import React from 'react';

const Workout = (props) => {
    const url = "http://localhost:3000/api/users"

    const [workout, setWorkout] = useState(null)
    
    useEffect(() => {
        handleFetch()
    }, [])
    
    const handleFetch = () => {
         fetch(`${url}/1`) // -------- HARD CODING USER ID --------
            .then(res => res.json())
            .then((data) => {
                console.log("inside fetch:", data)
                setWorkout(data.workouts[1]) // -------- HARD CODING WORKOUT --------
            })
    }

    return (
        <div>
            {/* WON'T WORK W/OUT CHECKING IT EXISTS */}
            {workout ? <h1>Date: {workout.date}</h1> : <h1>""</h1>}
            {workout ? <h3>Calories Burned: {workout.calories}</h3> : <h3>""</h3>}
            {workout ? <h3>Type: {workout.type}</h3> : <h3>""</h3>}
            {workout ? <h3>Time: {workout.time} minutes</h3> : <h3>""</h3>}
            {/* { MAY NOT BE NECESSARY TO ADD CONDITIONAL RENDERING BASED ON PAGE } */}
        </div>
    );
}

export default Workout;


// useEffect:
// 2nd argument = array of dependencies
// if 2nd argument = empty array, will only run once - when component's initialized
// if 2nd argument = state, runs whenever state listed inside array is changed
import React from 'react';
import { useState, useEffect } from 'react';

const Workout = (props) => {
    const url = "localhost:3000/api/users/"

    // set state - useState
    const [workout, setWorkout] = useState()
    const [user, setUser] = useState()

    // fetch data - componentDidMount hook equivalent = useEffect
    useEffect(() => {
        // Runs once when component is initialized w/ default value
        // AND runs each time state is updated
        fetch("http://localhost:3000/api/users/1") // -------- HARD CODING USER ID AND WORKOUT ID FOR NOW --------
            .then(res => res.json())
            .then(data => console.log(data)) // setWorkout(data)
    }, [user, workout]) 
    // 2nd argument = array of dependencies
    // if 2nd argument = empty array, will only run once - when component's initialized
    // if 2nd argument = state, runs whenever state listed inside array is changed

    return (
        <div>
            {/* {workout.type}
            {workout.calories}
            {workout.date}
            {workout.time} */}
            {/* { ADD CONDITIONAL RENDERING BASED ON PAGE } */}
        </div>
    );
}

export default Workout;



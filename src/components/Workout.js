import React from 'react';
import { Link } from 'react-router-dom'

const Workout = ({workout}) => {
    return (
        <div>
            {/* WON'T WORK W/OUT CHECKING IT EXISTS */}
            {/* NEED TO ADD LOADING STATE??? */}
            {console.log("Inside workout:", workout)}
            {workout ? (
                <Link to={`${workout.id}`}>
                    <h1>Date: {workout.date}</h1>
                    <h1>Calories: {workout.calories}</h1>
                    <h1>Type: {workout.type}</h1>
                    <h1>Time: {workout.time}</h1>
                </Link>
            ) : (
                <h1>"This workout no longer exists..."</h1>
            )}
            <br/>
            {/* { MAY NOT BE NECESSARY TO ADD CONDITIONAL RENDERING BASED ON PAGE } */}
        </div>
    );
}

export default Workout;


// useEffect:
// 2nd argument = array of dependencies
// if 2nd argument = empty array, will only run once - when component's initialized
// if 2nd argument = state, runs whenever state listed inside array is changed
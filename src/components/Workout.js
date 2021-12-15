import React from 'react';

const Workout = ({workout}) => {
    return (
        <div>
            {/* NEED TO ADD LOADING STATE??? */}
            {workout ? (
                <>
                    <h1>Date: {workout.date}</h1>
                    <h1>Calories: {workout.calories}</h1>
                    <h1>Type: {workout.type}</h1>
                    <h1>Time: {workout.time}</h1>
                </>
            ) : (
                <h1>"This workout no longer exists..."</h1>
            )}
            <br/>
        </div>
    );
}

export default Workout;


// useEffect:
// 2nd argument = array of dependencies
// if 2nd argument = empty array, will only run once - when component's initialized
// if 2nd argument = state, runs whenever state listed inside array is changed
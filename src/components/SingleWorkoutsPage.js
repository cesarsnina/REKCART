import React from 'react';
import { useState, useEffect } from 'react';
import Workout from './Workout';

const Singleworkoutspage = () => {
    const url = "http://localhost:3001/users"
    // User will get to this page via a link in UserPage, AllWorkoutsPage, or SingleWorkoutPage
    // The url will hold the Wid and Uid
    // Use the Wid & Uid from url to fetch it inside useEffect
    // Pass it down as prop to workout component

    // set workout state to pass it to Workout Component
    const [workout, setWorkout] = useState(null)

    useEffect(() => {
        handleFetch()
    }, [])
    
    const handleFetch = () => {
        console.log(`${url}/${window.location.pathname.split("/")[2]}`)
         fetch(`${url}/${window.location.pathname.split("/")[2]}`) // RETRIEVES WID FROM URL (I know this is bad practice)
            .then(res => res.json())
            .then((data) => {
                console.log("inside fetch:", data)
                setWorkout(data.workouts[1]) // -------- HARD CODING WORKOUT --------
            })
    }

    // NEED handleUpdate method
    const handleUpdate = (e) => {
        
    }
    // NEED handleDelete method
    const handleDelete = (e) => {
        // retrieve workout we're deleting
        // set new state
    }

    // NEED WORKOUT FORM COMPONENT TO EDIT

    return (
        <div>
            {console.log("hello")}
            <Workout />
            <h3>WORKOUT FORM WOULD GO HERE</h3>
        </div>
    );
}

export default Singleworkoutspage;

import React from 'react';
import { useState, useEffect } from 'react';
import Workout from './Workout';

const Singleworkoutspage = () => {
    // User will get to this page via a link in UserPage, AllWorkoutsPage, or SingleWorkoutPage
    // The url will hold the Wid and Uid
    // Use the Wid & Uid from url to fetch it inside useEffect
    // Pass it down as prop to workout component
    
    const url = "http://localhost:3000/api/users/"
    // set workout state to pass it to Workout Component
    const [workout, setWorkout] = useState(null)

    useEffect(() => {
        handleFetch()
    }, []) // SHOULD I ADD WORKOUT AS A DEPENDENCY?
    
    const handleFetch = () => {
        // BAD PRACTICE: RETRIEVING FROM URL
        const uid = window.location.pathname.split("/")[2]
        const wid = window.location.pathname.split("/")[4]

        fetch(`${url}${uid}`) // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
        .then(res => res.json())
        .then((data) => {
            console.log("inside fetch:", data.workouts[wid])
            setWorkout(data.workouts[wid]) // BEST WAY TO RETRIEVE THIS???
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
            <Workout workout={workout}/>
            <h3>WORKOUT FORM WOULD GO HERE (pass down handleUpdate & user/workout id)</h3>
        </div>
    );
}

export default Singleworkoutspage;

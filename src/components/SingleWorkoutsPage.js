import React from 'react';
import { useState, useEffect } from 'react';
import Workout from './Workout';

const Singleworkoutspage = () => {
    // User will get to this page via a link in UserPage, AllWorkoutsPage, or SingleWorkoutPage
    // The url will hold the Wid and Uid
    // Use the Wid & Uid from url to fetch it inside useEffect
    // Pass it down as prop to workout component
    const uid = window.location.pathname.split("/")[2]
    const wid = parseInt(window.location.pathname.split("/")[4])
    
    const url = "http://localhost:3001/api/users/"
    // set workout state to pass it to Workout Component
    const [workout, setWorkout] = useState(null)

    useEffect(() => {
        handleFetch()
    }, []) // SHOULD I ADD WORKOUT AS A DEPENDENCY?
    
    const handleFetch = () => {
        // BAD PRACTICE: RETRIEVING FROM URL

        fetch(`${url}${uid}`) // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
        .then(res => res.json())
        .then((data) => {
            console.log("SW: inside fetch:", wid)
            let w = data.workouts.filter(w => w.id === wid)[0]
            console.log("SW: inside fetch:", w)
            // need to iterate over data.workouts to find which object has the same id as wid
            setWorkout(w) // BEST WAY TO RETRIEVE THIS???
        })
    }

    // NEED handleUpdate method
    const handleUpdate = (e) => {
        
    }
    // NEED handleDelete method
    const handleDelete = (e) => {
        // retrieve workout we're deleting
        // set new state
        console.log("HELLO I'M INSIDE HANDLE DELETE")
        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }

        fetch(`${url}${uid}/workouts/${wid}`, deleteMethod)
        .then(res => res.json())
        .then(data => console.log("inside delete:", data))
    }

    // NEED WORKOUT FORM COMPONENT TO EDIT

    return (
        <div>
            <h1>SINGLE WORKOUT PAGE</h1>
            {console.log("hello")}
            <Workout workout={workout}/>
            <button onClick={handleDelete}>Delete Workout</button>
            <h3>WORKOUT FORM WOULD GO HERE (pass down handleUpdate & user/workout id)</h3>
        </div>
    );
}

export default Singleworkoutspage;

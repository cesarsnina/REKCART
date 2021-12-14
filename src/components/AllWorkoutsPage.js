import React from 'react';
import { useState, useEffect } from 'react';
import Workout from './Workout';

const Allworkoutspage = () => {
    const url = "http://localhost:3000/api/users/"
    // set workout state to pass it to Workout Component
    const [workout, setWorkout] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        handleFetch()
    }, [])
    
    const handleFetch = () => {
        // BAD PRACTICE: RETRIEVING FROM URL
        const uid = window.location.pathname.split("/")[2]

        fetch(`${url}${uid}`) // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
        .then(res => res.json())
        .then((data) => {
            console.log("inside fetch:", data)
            setUser(data)
        })
    }
    return (
        <div>
            {/* Iterate over all user's workouts */}
            <Workout />
        </div>
    );
}

export default Allworkoutspage;

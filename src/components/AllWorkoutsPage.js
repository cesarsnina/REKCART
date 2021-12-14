import React from 'react';
import { useState, useEffect } from 'react';
import Workout from './Workout';
import { Link } from 'react-router-dom'

const Allworkoutspage = () => {
    const url = "http://localhost:3001/api/users/" // :id/workouts
    const uid = window.location.pathname.split("/")[2]
    // set workout state to pass it to Workout Component
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        handleFetch()
    }, [])
    
    const handleFetch = () => {
        // BAD PRACTICE: RETRIEVING FROM URL

        fetch(`${url}${uid}`) // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
        .then(res => res.json())
        .then((data) => {
            console.log("inside ALLW - handleFetch:", data.workouts)
            // data.workouts = (4) [{...}, {...}, {...}, {...}]
            setWorkouts(data.workouts)
        })
    }
    return (
        <div>
            <h1>ALL WORKOUTS PAGE</h1>
            {workouts ? (
                workouts.map((w) => {
                        console.log("inside map", w.id)
                    if (w) {
                        return (
                            <Workout workout={w}/>
                        )
                    }
                })
            ) : (
                <h1></h1>
            )}
        </div>
    );
}

export default Allworkoutspage;

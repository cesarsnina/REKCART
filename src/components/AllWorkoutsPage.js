import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Workout from './Workout';
import WorkoutForm from './WorkoutForm';

const Allworkoutspage = () => {
    const url = "http://localhost:3001/api/users/" // :id/workouts
    // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
    const uid = window.location.pathname.split("/")[2] // BAD PRACTICE: RETRIEVING FROM URL
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        handleFetch()
    }, [])
    
    const handleFetch = () => {
        fetch(`${url}${uid}`)
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
            <WorkoutForm /> {/* WILL NEED TO PASS DOWN HANDLESUBMIT WHEN IT'S MOVED HERE */}
            {workouts ? (
                workouts.map((w) => {
                    if (w) {
                        return (
                            <Link to={`${w.id}`}>
                                <Workout workout={w}/>
                            </Link>
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

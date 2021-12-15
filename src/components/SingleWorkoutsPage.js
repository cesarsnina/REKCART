import React from 'react';
import { useState, useEffect } from 'react';
import Workout from './Workout';
import WorkoutForm from './WorkoutForm';

const Singleworkoutspage = () => {

    const url = "http://localhost:3001/api/users/"
    const uid = window.location.pathname.split("/")[2]
    const wid = parseInt(window.location.pathname.split("/")[4])
    const [workout, setWorkout] = useState(null)
    const [values, setValues] = useState({
        type: '',
        calories: '',
        date: undefined,
        time: ''
    });
    

    useEffect(() => {
        handleFetch()
    }, []) // SHOULD I ADD WORKOUT AS A DEPENDENCY?
    
    const handleFetch = () => {
        // BAD PRACTICE: RETRIEVING FROM URL

        fetch(`${url}${uid}`) // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
        .then(res => res.json())
        .then((data) => {
            let w = data.workouts.filter(w => w.id === wid)[0]
            // need to iterate over data.workouts to find which object has the same id as wid
            setWorkout(w) // BEST WAY TO RETRIEVE THIS???
            setValues(w)
        })
    }

    // NEED handleUpdate method
    const handleUpdate = (e) => {
        console.log("HI FROM HANDLEUPDATE")

        const updateMethod = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }   

        fetch(`${url}${uid}/workout`, updateMethod)
        .then(res => res.json())
        .then(data => setWorkout(data))
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

        // redirect to all workouts page once deleted
    }

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }))
        console.log("inside handleChange:", event.target.value)
    }  

    // NEED WORKOUT FORM COMPONENT TO EDIT

    return (
        <div>
            <h1>SINGLE WORKOUT PAGE</h1>
            <WorkoutForm 
                wid={wid}
                heading={"Edit Workout"} 
                submit={handleUpdate} 
                handleChange={handleChange}
                values={values}
            /> 
            <Workout workout={workout}/>
            <button onClick={handleDelete}>Delete Workout</button>
            <h3>WORKOUT FORM WOULD GO HERE (pass down handleUpdate & user/workout id)</h3>
        </div>
    );
}

export default Singleworkoutspage;

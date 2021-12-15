import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Workout from './Workout';
import WorkoutForm from './WorkoutForm';

const Singleworkoutspage = () => {

    const url = "http://localhost:3001/api/users/"
    const uid = parseInt(window.location.pathname.split("/")[2])
    const wid = parseInt(window.location.pathname.split("/")[4])
    const navigate = useNavigate()
    const [workout, setWorkout] = useState(null)
    const [values, setValues] = useState({
        type: '',
        calories: '',
        date: undefined,
        time: ''
    });
    

    useEffect(() => {
        handleFetch()
        console.log("delete:", `${url}${uid}/workout/${wid}`)
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

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }))
        console.log("inside handleChange:", event.target.value)
    } 
    
    
    const handleUpdate = (e) => {
        console.log("HI FROM HANDLEUPDATE")
        
        const updateMethod = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }   
        console.log("INSIDE HANDLEUPDATE:", updateMethod.body)
        fetch(`${url}${uid}/workout/${wid}`, updateMethod)
        .then(res => res.json())
        .then(data => setWorkout(data))
    }
    
    const handleDelete = (e) => {
        console.log("HELLO I'M INSIDE HANDLE DELETE")
        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }
        
        fetch(`${url}${uid}/workout/${wid}`, deleteMethod)
        .then(res => res.json())
        .then(data => console.log("inside delete:", data))
        
        navigate('/')
    }

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
        </div>
    );
}

export default Singleworkoutspage;

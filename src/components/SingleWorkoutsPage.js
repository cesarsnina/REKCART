import React from 'react';
import { useState, useEffect, useContext, Link } from 'react';
import { useNavigate } from "react-router-dom"
import { Table } from 'react-bootstrap';

import { UserContext } from './UserContext'
import Workout from './Workout';
import WorkoutForm from './WorkoutForm';

const Singleworkoutspage = () => {
    const navigate = useNavigate()
    const { globalUser, setGlobalUser } = useContext(UserContext)
    const [workout, setWorkout] = useState(null)
    const [values, setValues] = useState({
        type: '',
        calories: '',
        date: undefined,
        time: ''
    });
    const url = "http://localhost:3001/api/users/"
    const uid = globalUser.id // CAN'T SET THIS UP AS GLOBAL STATE YET
    const wid = parseInt(window.location.pathname.split("/")[4])
    

    useEffect(() => {
        handleFetch()
        console.log("global user:", globalUser)
    }, [])
    
    const handleFetch = () => {
        fetch(`${url}${uid}`)
        .then(res => res.json())
        .then((data) => {
            let w = data.workouts.filter(w => w.id === wid)[0]
            setWorkout(w)
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

        navigate(`/`)
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Calories</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <Workout workout={workout}/>
                </tbody>
            </Table>
            <button onClick={handleDelete}>Delete Workout</button>
            <button onClick={(e) => navigate(`/users/${globalUser.id}/workouts/`)}>View All My Workouts</button>
            <button onClick={(e) => navigate(`/`)}>Go To My Account</button>
        </div>
    );
}

export default Singleworkoutspage;

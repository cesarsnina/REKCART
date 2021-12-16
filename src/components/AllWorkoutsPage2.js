import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';

import Workout from './Workout2';
import WorkoutForm from './WorkoutForm';

import './AllWorkoutsPage2.css';

const Allworkoutspage = () => {
    const url = "http://localhost:3001/api/users/" // :id/workouts
    // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
    const uid = parseInt(window.location.pathname.split("/")[2]) // BAD PRACTICE: RETRIEVING FROM URL
    
    const [workouts, setWorkouts] = useState(null)
    const [isPending, setIsPending] = useState(false);

    const [values, setValues] = useState({
        type: '',
        calories: '',
        date: undefined,
        time: ''
    });

    useEffect(() => {
        handleFetch()
    }, []) // Do I need to add a dependency?
    
    const handleFetch = () => {
        fetch(`${url}${uid}`)
        .then(res => res.json())
        .then((data) => {
            console.log("url:", `${url}${uid}/workout`)
            console.log("inside ALLW - handleFetch:", data.workouts)
            // data.workouts = (4) [{...}, {...}, {...}, {...}]
            // if filterQuery === null
            setWorkouts(data.workouts)
            // else 
            // data.workouts.filer(workout => workout.type === filterQuery)
        })
    }

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }))
        console.log("inside handleChange:", event.target.value)
    }  

    const handleCreate = (e) => {
        console.log("HI FROM HANDLECREATE")

        const createMethod = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }   

        fetch(`${url}${uid}/workout`, createMethod)
        .then(res => res.json())
        .then(data => setWorkouts(data))
    };

    return (
        <Container className="AllWorkoutsPage-container">
            <h1>ALL WORKOUTS PAGE</h1>
            <WorkoutForm 
                heading={"Add Workout"} 
                submit={handleCreate} 
                handleChange={handleChange}
                isPending={isPending}
                values={values}
            />
            {workouts ? (
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
                    {workouts.map((w) => {
                        return (
                            <Workout userId={uid} workout={w}/>
                        )
                    })}
                    </tbody>
                </Table>
            ) : (
                <h1>You have not added any workout!</h1>
            )}
        </Container>
    );
}

export default Allworkoutspage;

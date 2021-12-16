import React, { useState, useEffect, useContext } from 'react';
import { UserContext, FilterQueryContext } from "./UserContext.js"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import  Filter  from "./Filter"

import Workout2 from './Workout2';
import WorkoutForm from './WorkoutForm';

import './AllWorkoutsPage2.css';

const AllWorkoutsPage = () => {
    const navigate = useNavigate()
    const {globalUser, setGlobalUser} = useContext(UserContext)
    const {globalFilterQuery, setGlobalFilterQuery} = useContext(FilterQueryContext)
    
    const url = "http://localhost:3001/api/users/"
    const uid = globalUser.id
    
    const [workouts, setWorkouts] = useState(null)
    const [isPending, setIsPending] = useState(false);
<<<<<<< HEAD:src/components/AllWorkoutsPage2.js
=======
    const [filterQuery, setFilterQuery] = useState('')
    const [updatedArray, setUpdatedArray] = useState(false)
>>>>>>> 21f3e92 (fix: render issue):src/components/AllWorkoutsPage.js

    const [values, setValues] = useState({
        type: '',
        calories: '',
        date: undefined,
        time: ''
    });

    useEffect(() => {
        handleFetch()
<<<<<<< HEAD:src/components/AllWorkoutsPage2.js
    }, [globalFilterQuery]) // Do I need to add a dependency?
=======
        // getDataFromLocalStorage()
    }, [globalFilterQuery, updatedArray]) 
>>>>>>> 21f3e92 (fix: render issue):src/components/AllWorkoutsPage.js
    
    const handleFetch = () => {
        fetch(`${url}${uid}`)
        .then(res => res.json())
        .then((data) => {
            setWorkouts(data.workouts)
            if (globalFilterQuery) setWorkouts(data.workouts.filter(workout => globalFilterQuery === workout.type))
        })
    }

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }))
    }  

    const handleCreate = (e) => {
<<<<<<< HEAD:src/components/AllWorkoutsPage2.js
=======
      e.preventDefault()
        console.log("HI FROM HANDLECREATE")

>>>>>>> 21f3e92 (fix: render issue):src/components/AllWorkoutsPage.js
        const createMethod = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }   

        fetch(`${url}${uid}/workout`, createMethod)
        .then(res => res.json())
        .then(data => {
          workouts.push(data)
          setUpdatedArray(true)
          setWorkouts(workouts)
        })

        navigate(`/users/${globalUser.id}/workouts/`)
    };

    return (
        <Container className="AllWorkoutsPage-container">
            <h1>ALL WORKOUTS PAGE</h1>
            <Filter />
            <WorkoutForm 
                heading={"Add Workout"} 
                submit={handleCreate} 
                handleChange={handleChange}
                isPending={isPending}
                values={values}
            />
            {workouts ? (
                <>
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
                                <Workout2 userId={uid} workout={w}/>
                            )
                        })}
                        </tbody>
                    </Table>
                    <button onClick={(e) => navigate(`/`)}>Go To My Account</button>
                </>
            ) : (
                <h1>You have not added any workouts!</h1>
            )}
        </Container>
    );
}

export default AllWorkoutsPage;

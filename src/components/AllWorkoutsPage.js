import React, { useState, useEffect, useContext } from 'react';
import { UserContext, FilterQueryContext } from "./UserContext.js"
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import  Filter  from "./Filter"

import Workout from './Workout';
import WorkoutForm from './WorkoutForm';

const Allworkoutspage = () => {
  const {globalUser, setGlobalUser} = useContext(UserContext)
  const {globalFilterQuery, setGlobalFilterQuery} = useContext(FilterQueryContext)

    const url = "http://localhost:3001/api/users/" // :id/workouts
    // CHANGE TO RETRIEVE USER ID FROM useContext GLOBAL STATE
    const uid = parseInt(window.location.pathname.split("/")[2]) // BAD PRACTICE: RETRIEVING FROM URL
    
    const [workouts, setWorkouts] = useState(null)
    const [isPending, setIsPending] = useState(false);
    const [filterQuery, setFilterQuery] = useState('')
    const [isFilterReady, setIsFilterReady] = useState(false)

    const [values, setValues] = useState({
        type: '',
        calories: '',
        date: undefined,
        time: ''
    });

    useEffect(() => {
        handleFetch()
        filterWorkouts(workouts)
    }, [globalFilterQuery, workouts]) 
    
    const handleFetch = () => {
        fetch(`${url}${uid}`)
        .then(res => res.json())
        .then((data) => {

            setFilterQuery(globalFilterQuery)
              setWorkouts(data.workouts)
            
        })
    }

    const filterWorkouts = (workouts) => {
      if (globalFilterQuery !== null) setIsFilterReady(true)
      let filteredArray = undefined
      if (globalFilterQuery !== null && isFilterReady) filteredArray = (workouts.filter(workout => globalFilterQuery === workout.type))
      setWorkouts(filteredArray)

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
        <div>
            <h1>ALL WORKOUTS PAGE</h1>
            <Filter/>
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
                                <Link to={`${w.id}`}>
                                    <Workout workout={w}/>
                                    {console.log("insidetable:", w)}
                                </Link>
                            )
                        })}
                    </tbody>
                </Table>
            ) : (
                <h1>You have not added any workout!</h1>
            )}
        </div>
    );
}

export default Allworkoutspage;



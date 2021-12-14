import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import UserPanel from './UserPanel';
import WorkoutForm from './WorkoutForm';
import Workout from './Workout';

const UserPage = () => {
    const [user, setUser] = useState({});
    const [workout, setWorkout] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchWorkout();
    }, [id]);

    const fetchWorkout = async () => {
        try {
            const id = 2;
            const response = await fetch(`http://localhost:3001/api/users/${id}`);
            const data = await response.json();
            setUser(data.user);
            setWorkout(data.workouts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1> this is UserPage</h1>
            <UserPanel user={user} />
            <WorkoutForm />
            <Link to='/workouts'> <Button>All Workout!</Button> </Link>
            <Workout workout={workout}/>
        </div>
    );
}

export default UserPage;

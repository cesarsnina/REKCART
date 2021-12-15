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
            const id = 2; // remove this id when routes are properly working
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
            <UserPanel user={user} />
            {/* Link address needs to be changed to users/:id/workouts/:wid*/}
            <Link to='/workouts'> <Button>All Workouts!</Button> </Link>
            <Workout workout={workout[0]}/>
        </div>
    );
}

export default UserPage;

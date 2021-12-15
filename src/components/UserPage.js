import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { UserContext } from './UserContext'
import UserPanel from './UserPanel';
import WorkoutForm from './WorkoutForm';
import Workout from './Workout';

const UserPage = () => {
    const [user, setUser] = useState({});
    const [workout, setWorkout] = useState([]);
    const {globalUser, setGlobalUser} = useContext(UserContext)
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
            <WorkoutForm />
            <Link to='/workouts'> <Button>All Workout!</Button> </Link>
            <Workout workout={workout[0]}/>
        </div>
    );
}

export default UserPage;

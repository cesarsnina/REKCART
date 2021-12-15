import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';

import { UserContext } from './UserContext';
import UserPanel from './UserPanel';
import WorkoutForm from './WorkoutForm';
import Workout from './Workout';

import './UserPage.css';

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
            const id = 4; // TESTING PURPOSE ONLY
            // const id = globalUser.id;
            const response = await fetch(`http://localhost:3001/api/users/${id}`);
            const data = await response.json();
            setUser(data.user);
            setWorkout(data.workouts);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="container-background">
            <Row>
                <Col><UserPanel user={user} /></Col>
            </Row>
            <Row>
                <Col><Link to='/users/:id/workouts/:wid'> <Button className="all-workout-button">All Workout!</Button> </Link></Col>
            </Row>
            <Row>
                <Col>
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

                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default UserPage;

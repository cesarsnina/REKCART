import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';

import { UserContext } from './UserContext';
import UserPanel from './UserPanel';
import WorkoutForm from './WorkoutForm';
import Workout from './Workout2';

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

    const setColor = (e) => {
        document.body.style.backgroundColor = e.target.value;
    }

    return (
        <Container className="UserPage-container">
            <Row>
                <Col><UserPanel user={user} /></Col>
            </Row>
            <Row>
                <Col><Link to={`/users/${user.id}/workouts`}> 
                    <Button className="all-workout-button">All Workout!</Button> </Link>
                </Col>

                <Col md="auto">
                    <Form.Label className="color-label" htmlFor="color-input">Choose your color</Form.Label>
                    <Form.Control
                        type="color"
                        id="color-input"
                        defaultValue="#0400FF"
                        title="Choose your color"
                        onChange={setColor}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                {workout ? (
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
                        {workout.map(ele => {
                            return (
                                <Workout userId={user.id} workout={ele}/>
                            )
                        })}
                        </tbody>
                    </Table>
                ) : (
                    <h1>You have not added any workout!</h1>
                )}
                </Col>
            </Row>
        </Container>
    );
}

export default UserPage;

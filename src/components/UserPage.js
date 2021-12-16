import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form, FloatingLabel } from 'react-bootstrap';
import { UserContext, FilterQueryContext } from "./UserContext.js"

import UserPanel from './UserPanel';
import Workout from './Workout2';

import './UserPage.css';

const UserPage = () => {
    const [user, setUser] = useState({});
    const [workout, setWorkout] = useState([]);
    const {globalUser, setGlobalUser} = useContext(UserContext);
    const {globalFilterQuery, setGlobalFilterQuery} = useContext(FilterQueryContext)
    const [image, setImage] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetchWorkout();
        clearGlobalFilterQuery()
    }, [id, image]);

    const clearGlobalFilterQuery = () => {
        setGlobalFilterQuery("")
    }
    
    const fetchWorkout = async () => {
        try {
            console.log("GLOBAL USER", globalUser)
            const response = await fetch(`http://localhost:3001/api/users/${globalUser.id}`);
            const data = await response.json();
            setUser(data.user);
            setWorkout(data.workouts);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Event: ', image)
        try {
            const updateMethod = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({image: image})
            }
            const id = globalUser.id;
            const response = await fetch(`http://localhost:3001/api/users/${id}`, updateMethod)
            setImage(response)
            // const data = await response.json();
            console.log('Data: ', response);
        } catch (error) {
            console.log(error)
        }
    }

    const setColor = (e) => {
        setGlobalUser({globalUser, color: e.target.value})
        document.body.style.backgroundColor = e.target.value;
    }

    return (
        <Container className="UserPage-container">
            <Row>
                <Col><UserPanel user={user} /></Col>
            </Row>
            <Row>
                <Col md={3}><Link to={`/users/${globalUser.id}/workouts`}> 
                    <Button className="all-workout-button">View all my workouts</Button> </Link>
                </Col>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={8}>
                            <FloatingLabel controlId="floatingInput"
                                            label="Add Image Address to update">
                                <Form.Control type="text"
                                        value={image}
                                        onChange={e=>setImage(e.target.value)}
                                        placeholder="https://www.thehoth.com/wp-content/uploads/2019/04/hoth-ranktracker-icon-002.png"/>
                            </FloatingLabel>
                        </Col>
                        <Col md={4}>
                            <Button className="all-workout-button" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    </Form>
                </Col>

                <Col md={3}>
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

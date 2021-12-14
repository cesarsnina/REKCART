import React from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';

const UserPanel = (props) => {
    return (
        <Container>
        <Row>
            <Col xs={6} md={4}>
                <h1>Welcome, {props.user.name}!</h1>
            </Col>
        </Row>
        <Row>
            <Col xs={6} md={4}>
                <Image src={props.user.image} rounded />
            </Col>
        </Row>
        </Container>
    );
}

export default UserPanel;

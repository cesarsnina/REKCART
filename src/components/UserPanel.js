import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import './UserPanel.css';

const UserPanel = (props) => {
    const { name, image } = props.user;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1 className="welcome-panel">Welcome to REKCART, {name}!</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Image src={image} rounded className="welcome-panel"/>
                </Col>
            </Row>
        </Container>
    );
}

export default UserPanel;

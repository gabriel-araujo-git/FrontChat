import React from 'react';
import './styles.css';
import { Col, Container, Row, Button } from 'react-bootstrap';

export const BtnLogin = ({ nameBtn }) => {
    return (
        <Container>
            <Row className="justify-content-center ">
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Button type="submit" className="w-100 btn-custom">
                        {nameBtn}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

import React, { useState } from 'react';
import './styles.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const NameLogin = () => {

    const [login, setLogin] = useState('');

    return (
        <Container fluid className='form-group'>
            <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Login (Ex: E00000):'
                    required
                />
            </div>

        </Container>

    );
}
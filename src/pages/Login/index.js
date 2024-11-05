import React from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { LoginTemplate } from '../../templates/LoginTemplate';

export const Login = () => {
    return (
      <Container fluid className='login-container'>
         <LoginTemplate />
      </Container>
    
  );
}
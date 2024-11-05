import React from 'react';
import {HomeTemplate} from '../../templates/HomeTemplate';
import './styles.css';
import { Container } from 'react-bootstrap';

export const Home = () => {

  return (
      <Container fluid className='home-container'>
        <HomeTemplate />
      </Container>
    
  );
}
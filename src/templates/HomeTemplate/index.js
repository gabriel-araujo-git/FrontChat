import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css';
import { HomeOrganism } from '../../organisms/HomeOrganism';

export const HomeTemplate = () => {
    return (

        <Container fluid className="">
         
           
              <HomeOrganism />
           
         
        </Container>
        
  
    
  );
}
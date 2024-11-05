
import React from 'react';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import './styles.css';

export const HistoryPanel = ({ history, showHistory, toggleHistory }) => {
  return (

    <Container fluid className="">
      {showHistory && (
        <Container fluid className="history-panel ">
          <ListGroup>
            {history.map((msg, index) => (
              <ListGroup.Item key={index} className="history-item text-truncate w-100">
                {msg.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Row className=" icons-row">
           <Col className='mt-3 botaoSair'> 
            <Col xs="auto" className='botaoIcone2'>
              <Button  className='icon-button'>
                <i className='pi pi-question-circle small-icon'></i>
              </Button>
            </Col>
            <Col xs="auto" className='botaoIcone2'>
              <Button className='icon-button'>
                <i className='pi pi-sign-out small-icon'></i>
              </Button>
            </Col>
        </Col> 
          </Row>
        </Container>
      )}
    </Container>
    
  );
};




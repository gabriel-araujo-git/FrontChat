import React, { useState } from 'react';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { BsFillTrash3Fill } from "react-icons/bs";
import './styles.css';

export const HistoryPanel = ({ history, showHistory }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Alternar entre claro e escuro
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Container fluid className={isDarkMode ? "dark-mode" : ""}>
      {showHistory && (
        <Container
          fluid
          className={`history-panel ${isDarkMode ? "dark" : ""}`}
        >
          <ListGroup>
            {history.map((msg, index) => (
              <ListGroup.Item
                key={index}
                className="history-item text-truncate w-100"
              >
                <span>{msg.title}</span>
                <BsFillTrash3Fill
                  className="delete-icon"
                  onClick={() => console.log(`Deletar ${msg.title}`)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Row className="icons-row">
            <Col className="mt-3 botaoSair">
              <Col xs="auto" className="botaoIcone2">
                <Button
                  className="icon-button"
                  onClick={toggleDarkMode} // Alternar modo claro/escuro
                >
                  <i
                    className={`pi ${
                      isDarkMode
                        ? "pi-sun small-icon" // Ícone do Sol para sair do modo noturno
                        : "pi-moon small-icon" // Ícone da Lua para entrar no modo noturno
                    }`}
                  ></i>
                </Button>
              </Col>
              <Col xs="auto" className="botaoIcone2">
                <Button className="icon-button">
                  <i className="pi pi-sign-out small-icon"></i>
                </Button>
              </Col>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

//Onde você define as rotas e o layout geral do seu aplicativo. Você também pode importar templates ou páginas aqui.

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../src/routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid className='home-container'>
      <AppRouter />
    </Container>
  );
}

export default App;




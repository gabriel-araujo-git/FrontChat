import React from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NameLogin } from '../../molecules/NameLogin';
import { PasswordLogin } from '../../molecules/PasswordLogin';
import { BtnLogin } from '../../atoms/BtnLogin';

export const LoginOrganism = () => {

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault(); 

   

    navigate('/home');
  };
    return (
      <Container className=''>
        <form onSubmit={handleSubmit}>
          <NameLogin />
          <PasswordLogin />
          <BtnLogin
            nameBtn='Entrar'
          />
        </form>

      </Container>
         
    
  );
}
import React from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export const PasswordLogin = () => {
    return (
      <Container fluid className='form-group'>
        <div className="input-container">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder='Senha:' 
                required 
              />
            </div>
      </Container>
         
    
  );
}
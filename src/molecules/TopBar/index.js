import React, { useCallback } from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import logoCopel from '../../img/logo.png';
import { IoMoon } from "react-icons/io5"; // Novo ícone da lua
import { MdSunny } from "react-icons/md"; // Novo ícone do sol
import { FiAlignJustify } from "react-icons/fi";

export const TopBar = ({ darkmode, handleDarkMode }) => {
    return (
        <Container className='top-bar'>
            <img src={logoCopel} alt="Logo Copel" className="logoHome" />
            <button onClick={handleDarkMode}>
                {darkmode ? <MdSunny className="moon-icon" /> : <IoMoon className="moon-icon" />} {/* Substituição completa */}
            </button>
            
        </Container>
        
    );
};

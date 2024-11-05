import React, { useCallback } from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import  logoCopel  from '../../img/logo.png';
import { IoIosMoon, IoMdSend } from "react-icons/io";
import { IoSunny } from 'react-icons/io5';
import { FiAlignJustify } from "react-icons/fi";

export const TopBar = ({ darkmode , handleDarkMode}) => {
    return (
      <Container className='top-bar'>
        <img src={logoCopel} alt="Logo Copel" className="logoHome" />
        <button onClick={handleDarkMode}>
            {darkmode ? <IoSunny className="moon-icon" /> : <IoIosMoon className="moon-icon" />}
        </button>
      </Container>
  );
}
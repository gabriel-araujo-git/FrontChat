import React from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { FaUser } from "react-icons/fa6";  
import { HiVolumeUp } from "react-icons/hi";  
import { HiOutlineDuplicate } from "react-icons/hi";  
import { BsPersonFill } from "react-icons/bs";
import { BsCopy } from "react-icons/bs";
import Copelo from '../../img/Copelo.png';

export const ChatExterno = ({ messages, handleRatings }) => {
    return (
        <Container fluid className="chat-window">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                    {msg.sender === 'user' ? (
                        <BsPersonFill className="user-icon" />
                    ) : (
                        <img src={Copelo} alt="Logo" className="logo-message" />
                    )}
                    <div className="message-content">
                        <div className={`message-box ${msg.sender}`}>
                            <span>{msg.text}</span>
                            {msg.sender === 'bot' && <HiVolumeUp className="volume-icon" />}
                        </div>
                        {msg.sender === 'bot' && msg.hasMenu && (
                            <div className='message-icons'>
                                <button className='botaoIcone2' onClick={() => navigator.clipboard.writeText(msg.text)}>
                                    <HiOutlineDuplicate className="duplicate-icon" />
                                </button>
                                <button className='botaoIcone2' onClick={() => handleRatings(false)}>
                                    <i className='pi pi-thumbs-down' />
                                </button>
                                <button className='botaoIcone2' onClick={() => handleRatings(true)}>
                                    <i className='pi pi-thumbs-up' />
                                </button>
                            </div>
                        )}
                    </div>              
                    <div className='empty-space'></div>
                </div>
            ))}
        </Container>
    );
};

export default ChatExterno;  // Certifique-se de exportar o componente como default

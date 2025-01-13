import React from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { FaUser } from "react-icons/fa6";  
import { HiVolumeUp, HiOutlineDuplicate } from "react-icons/hi";  
import { BsPersonFill, BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { TbRobot } from "react-icons/tb";

export const ChatWindow = ({ messages, handleRatings }) => {
    return (
        <Container fluid className="chat-window">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                    {msg.sender === 'user' ? (
                        <BsPersonFill className="user-icon" />
                    ) : (
                        <TbRobot alt="Logo" className="logo-message" />
                    )}
                   
                    <div className="message-content">   
                        <div className={`message-box ${msg.sender}`}>
                            {msg.isHtml ? (
                                
                                <div className="reference-message" dangerouslySetInnerHTML={{ __html: msg.text }} />
                            ) : (
                                <span>{msg.text}</span>
                            )}
                            {msg.sender === 'bot' && <HiVolumeUp className="volume-icon" />}
                        </div>
 
                        {msg.sender === 'bot' && (
                            <div className='message-icons'>
                                <button
                                    className='botaoIcone2'
                                    onClick={() => navigator.clipboard.writeText(msg.text)}
                                    title="Copiar texto"
                                >
                                    <HiOutlineDuplicate className="duplicate-icon" />
                                </button>
                                <button
                                    className='botaoIcone2'
                                    onClick={() => handleRatings(true)}
                                    title="Gostei"
                                >
                                    <BsHandThumbsUp className="thumbs-up-icon" />
                                </button>
                                <button
                                    className='botaoIcone2'
                                    onClick={() => handleRatings(false)}
                                    title="Não gostei"
                                >
                                    <BsHandThumbsDown className="thumbs-down-icon" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </Container>
    );
};

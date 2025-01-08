import React, { useState } from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { HiVolumeUp, HiOutlineDuplicate } from "react-icons/hi";  
import { BsPersonFill, BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { TbRobot } from "react-icons/tb";

export const ChatWindow = ({ messages, handleRatings }) => {
    const [copyAlert, setCopyAlert] = useState(false);  // Estado para controlar o alerta de cópia

    // Função para copiar o conteúdo da mensagem para a área de transferência
    const handleCopyMessage = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopyAlert(true); // Ativa o alerta
                setTimeout(() => setCopyAlert(false), 3000); // Desativa o alerta após 3 segundos
            })
            .catch((err) => {
                console.error('Falha ao copiar: ', err);
            });
    };

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
                            <span>{msg.text}</span>
                            {msg.sender === 'bot' && <HiVolumeUp className="volume-icon" />}
                        </div>
 
                        {msg.sender === 'bot' && (
                            <div className='message-icons'>
                               
                                <button
                                    className='botaoIcone2'
                                    onClick={() => handleCopyMessage(msg.text)} // Chama a função de cópia
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

            {/* Alerta de cópia */}
            {copyAlert && (
                <div className="copy-alert">
                    Texto copiado para area de transferência!
                </div>
            )}
        </Container>
    );
};

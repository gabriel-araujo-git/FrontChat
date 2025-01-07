import React, { useState } from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { IoMdSend, IoMdMic } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";

export const MessageInput = ({ inputValue, setInputValue, handleSendMessage }) => {
    const [isListening, setIsListening] = useState(false);

    const handleSpeechRecognition = () => {
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            alert("Seu navegador não suporta reconhecimento de fala.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR'; // Definir o idioma como português do Brasil
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            let transcript = '';
            
            // Verificar apenas os resultados finais
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript = event.results[i][0].transcript;
                }
            }

            // Concatenar o transcript ao valor atual do inputValue (sem repetição)
            if (transcript) {
                setInputValue(prevValue => prevValue+ ' ' + transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error("Erro no reconhecimento de fala:", event.error);
        };

        recognition.start();
    };

    return (
        <>
            <div className="empty-space"></div>
            <Container fluid className="message-container-custom">
                <button
                    className="icon-button mic-icon"
                    onClick={handleSpeechRecognition}
                >
                    <IoMdMic 
                        className="icon" 
                        style={{ color: isListening ? 'red' : 'black' }} // Ajuste direto no estilo do ícone
                    />
                </button>
                <div className="empty-space"></div>
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder="Escreva sua mensagem..."
                    className="message-input-custom"
                    rows="1"
                    maxLength={10000}
                    style={{
                        resize: 'none',
                        overflow: 'hidden',
                    }}
                />
                <button className="icon-button upload-icon">
                    <MdOutlineFileUpload className="icon" />
                </button>
                <button className="send-button" onClick={handleSendMessage}>
                    <IoMdSend className="icon send-icon" />
                </button>
            </Container>
            <div className="empty-space"></div>
        </>
    );
};

import React from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { IoMdSend } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";

export const MessageInput = ({ inputValue, setInputValue, handleSendMessage }) => {
    return (
        <>
            <div className="empty-space"></div>
                <Container fluid className="message-container-custom">
                    
                    <button className="icon-button mic-icon">
                        <IoMdMic className="icon" />
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
                        style={{ resize: 'none', overflow: 'hidden' }}
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

import React, { useState, useEffect } from 'react';
import './styles.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ChatWindow } from '../ChatWindow';
import { MessageInput } from '../MessageInput';
import { IoMenu } from "react-icons/io5";
import UserService from '../../service/UserService';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import serviceAccount from './serviceAccount.json';

export const HomeMolecule = ({ setShowHistory, showHistory }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showChatButtons, setShowChatButtons] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (messages.length === 0) {
      setShowWelcomeMessage(true);
    }
  }, []);
  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
        setErrorMessage('Por favor, insira uma mensagem.');
        return;
    }

    setShowWelcomeMessage(false);
    setShowChatButtons(false);

    const token = UserService.getToken();
    console.log("Token de autenticação:", token);

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setErrorMessage('');

    try {
        const response = await fetch('https://run-dev-hol-app-cbc-orquestrador-470141199353.southamerica-east1.run.app/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                pergunta: inputValue,
                thread_id: ""
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.text();
            console.error('Erro na API:', response.status, errorResponse);
            throw new Error(`Erro ${response.status}: ${errorResponse}`);
        }

        const data = await response.json();
        console.log('Resposta da API:', data);

        const botMessage = data?.resposta || 'Desculpe, não consegui entender sua mensagem.';
        let botMessageWithLinks = '';

        // Processar fontes e gerar HTML com links
        if (data?.fontes && Array.isArray(data.fontes)) {
            botMessageWithLinks = data.fontes.map(fonte => 
                `<a href="${fonte.url}" target="_blank">${fonte.nome}</a>`).join('<br>');
        }

        setMessages(prevMessages => [
            ...prevMessages,
            { text: botMessage, sender: 'bot' },
            { text: botMessageWithLinks, sender: 'bot', isHtml: true } // Adicionando a propriedade isHtml
        ]);

    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Houve um erro ao processar sua mensagem. Tente novamente mais tarde.', sender: 'bot' }
        ]);
        setErrorMessage('Algo deu errado. Tente novamente mais tarde.');
    } finally {
        setIsLoading(false);
    }
};

  
 
  return (
    <div className="home-container">
      <Row className="content align-items-center">
        {showWelcomeMessage && (
          <Col xs={12} className="text-center">
            <p className="welcome-message">
              Olá <strong>{UserService.getName()}</strong>, bem-vindo(a)!<br />
              <strong>Estou aqui para te ajudar.</strong><br />
              <em>Faça sua pergunta...</em>
            </p>
          </Col>
        )}
        <Col xs={12}>
          <ChatWindow 
            messages={messages.filter(msg => msg.sender !== 'bot' || msg.text !== `Olá ${UserService.getName()}, como posso ajudar?`)}
            isHtml={true} // Passando que as mensagens podem ter HTML
          />
          {isLoading && <LoadingSpinner />}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {showChatButtons && (
            <div
              className="chats"
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-evenly',
                borderRadius: '10px',
              }}
            >
              <Link to="/chat-externo">
                <button className="chat-externo-btn" aria-label="Iniciar Chat Externo" style={{ backgroundColor: '#ff8b33' }}>Chat Externo</button>
              </Link>
              <button className="chat-interno-btn" aria-label="Iniciar Chat Interno" style={{ backgroundColor: '#ff8b33' }}>Chat Interno</button>
            </div>
          )}
          <MessageInput 
            inputValue={inputValue} 
            setInputValue={setInputValue} 
            handleSendMessage={handleSendMessage} 
            isLoading={isLoading} 
          />
        </Col>
        {errorMessage && (
          <Col xs={12} className="text-center mt-2">
            <div className="error-message" style={{ color: 'red' }}>
              <strong>{errorMessage}</strong>
            </div>
          </Col>
        )}
        <Col xs={12} className="text-center mt-2">
          <Button variant="link" className="history-icon" onClick={() => setShowHistory(!showHistory)}>
            <IoMenu className="history-icon" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

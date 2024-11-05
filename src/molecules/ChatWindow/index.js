import React, { useMemo, useRef } from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import logo2 from '../../img/image 9.png';
import { Menu } from 'primereact/menu';

export const ChatWindow = ({ messages, handleRatings }) => {
    const menuLeft = useRef(null);

    const items = useMemo(() => ([
        {
            items: [
                { label: 'Traduzir', icon: 'pi pi-language' },
                { label: 'Tabela', icon: 'pi pi-table' },
                { label: 'Gráfico', icon: 'pi pi-chart-bar' },
                { label: 'SQL', icon: 'pi pi-database' },
            ]
        }
    ]), []);

    return (
        <Container fluid className="chat-window">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                    <img src={logo2} alt="Logo" className="logo-message" />
                    <div className="message-content">
                        <div className={`message-box ${msg.sender}`}>
                            <span>{msg.text}</span>
                            <i className='pi pi-volume-up volume-icon' />
                        </div>
                        {msg.sender === 'bot' && msg.hasMenu && (
                            <div className='message-icons'>
                                <i className="pi pi-plus" onClick={(event) => menuLeft.current.toggle(event)} />
                                <button className='botaoIcone2' onClick={() => navigator.clipboard.writeText(msg.text)}>
                                    <i className='pi pi-copy' />
                                </button>
                                <button className='botaoIcone2' onClick={() => handleRatings(false)}>
                                    <i className='pi pi-thumbs-down' />
                                </button>
                                <button className='botaoIcone2' onClick={() => handleRatings(true)}>
                                    <i className='pi pi-thumbs-up' />
                                </button>
                            </div>
                        )}
                        <Menu model={items} popup ref={menuLeft} className="menuOpcoes" />
                    </div>
                </div>
            ))}
        </Container>
    );
}

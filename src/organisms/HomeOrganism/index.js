import React, { useCallback, useState } from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { TopBar } from '../../molecules/TopBar';
import { HistoryPanel } from '../../molecules/HistoryPanel';
import { HomeMolecule } from '../../molecules/HomeMolecule';

export const HomeOrganism = () => {
  const [darkmode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false); 
  const [history, setHistory] = useState([
    { id: 1, title: 'Conversa 1' },
    { id: 2, title: 'Conversa 2' },
    { id: 3, title: 'Conversa 3' },
    { id: 4, title: 'Conversa 4' },
    { id: 5, title: 'Conversa 5' },
    { id: 6, title: 'Conversa 6' },
  ]);

  const handleDarkMode = useCallback(() => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    document.body.classList.toggle('dark');
  }, []);

  return (
    <Container fluid className="home-container">
      <TopBar
        darkmode={darkmode}
        handleDarkMode={handleDarkMode}
      />
      <HistoryPanel
        history={history}
        showHistory={showHistory}
        toggleHistory={() => setShowHistory((prevShowHistory) => !prevShowHistory)}
        darkmode={darkmode}
      />
      <HomeMolecule
        setShowHistory={setShowHistory}
        showHistory={showHistory}
        darkmode={darkmode} 
      />
    </Container>
  );
};
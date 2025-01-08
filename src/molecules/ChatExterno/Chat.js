import React, { useState } from "react";
import UserService from '../../service/UserService';
import "./index.css";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
 
const Chat = () => {
  const [messages, setMessages] = useState([]); // Lista de mensagens
  const [input, setInput] = useState(""); // Texto digitado pelo usuário
  const token = UserService.getToken();
  // Função para enviar mensagens
  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]); // Adiciona mensagem do usuário
      setInput(""); // Limpa o campo de texto
 
      try {
        // Chamada à API com fetch e no-cors
        await fetch(
          "https://run-dev-hol-app-cbc-470141199353.southamerica-east1.run.app/chat",
          {
            method: "POST",
            mode: "no-cors", // Configuração do modo no-cors
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: input }),
          }
        );
 
        // Como não é possível acessar a resposta no-cors, exiba uma mensagem genérica
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Mensagem enviada, mas a resposta não pode ser exibida.", sender: "bot" },
        ]);
      } catch (error) {
        console.error("Erro ao chamar a API:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Erro ao obter resposta do servidor.", sender: "bot" },
        ]);
      }
    }
  };
 
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1E1E1E",
        color: "#FFF",
      }}
    >
      {/* Cabeçalho */}
      <AppBar position="static" sx={{ bgcolor: "#333" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Untitled notebook
          </Typography>
        </Toolbar>
      </AppBar>
 
      {/* Área de mensagens */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: "8px 16px",
                  maxWidth: "60%",
                  bgcolor: message.sender === "user" ? "#6200EE" : "#444",
                  color: message.sender === "user" ? "#FFF" : "#FFF",
                }}
              >
                <ListItemText primary={message.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
 
      {/* Campo de entrada */}
      <Box
        sx={{
          display: "flex",
          padding: 2,
          borderTop: "1px solid #444",
          backgroundColor: "#2D2D2D",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage(); // Enviar ao pressionar Enter
          }}
          sx={{
            input: { color: "#FFF" },
            fieldset: { borderColor: "#555" },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{ marginLeft: 1, bgcolor: "#6200EE", color: "#FFF" }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};
 
export default Chat;
 
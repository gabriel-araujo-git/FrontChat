import React, { useState } from "react";
import UserService from '../../service/UserService';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Chat from "./Chat"; // Certifique-se de que o componente Chat esteja corretamente configurado

function App() {
  const [activePage, setActivePage] = useState("home");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [notebooks, setNotebooks] = useState([]);
  const [activeNotebook, setActiveNotebook] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [messages, setMessages] = useState([]); // Novo estado para mensagens
  const token = UserService.getToken();
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // Limite de 100MB
        alert("O arquivo é muito grande! (máx: 100MB)");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(":https://run-dev-hol-app-cbc-api-geminilike-470141199353.southamerica-east1.run.app/upload", {
          method: "POST",
          
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,

          },
          body: JSON.stringify({
            pergunta: FormData , 
            session_token: "" 
          }),
          
        });

        if (!response.ok) {
          const errorResponse = await response.text();
          console.error('Erro na API:', response.status, errorResponse);

          throw new Error(`Erro ${response.status}: ${errorResponse}`);
        }
    

        const data = await response.json();
        console.log("Arquivo enviado com sucesso:", data);

        const newNotebook = {
          title: file.name, // Usa o nome do arquivo como título
          date: new Date().toLocaleDateString("pt-BR"),
          content: null, // Não carrega o conteúdo
          file: file, // Armazena o arquivo para referência futura
        };

        setNotebooks([...notebooks, newNotebook]);
        setActiveNotebook(newNotebook); // Define o novo notebook como ativo
        setActivePage("chat"); // Muda para a página do notebook
        setUploadDialogOpen(false); // Fecha o diálogo de upload
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
        alert("Erro ao enviar o arquivo, tente novamente.");
      }
    }
  };

  const handleNotebookClick = (notebook) => {
    setActiveNotebook(notebook);
    setActivePage("chat");
  };

  const handleTitleClick = () => {
    setEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    if (event.key === "Enter" || event.type === "blur") {
      setEditingTitle(false);
      setActiveNotebook({ ...activeNotebook, title: event.target.value });
      setNotebooks(
        notebooks.map((nb) =>
          nb === activeNotebook ? { ...nb, title: event.target.value } : nb
        )
      );
    }
  };

  // Função para enviar mensagens
  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    // Aqui você pode adicionar a resposta automática do bot, por exemplo
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "Resposta do bot", sender: "bot" },
    ]);
  };

  // Função para redirecionar para o chat principal
  const handleGoToHome = () => {
    window.location.href = "http://localhost:8080/home";
  };

  return (
    <Box sx={{ bgcolor: "#121212", color: "#fff", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#1f1f1f" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NotebookLM
          </Typography>
          <Button color="inherit" onClick={() => setActivePage("home")}>
            Home
          </Button>
          {activePage === "home" && (
            <Button
              color="inherit"
              onClick={handleGoToHome} // Chamando a função de redirecionamento
              sx={{ ml: 2 }}
            >
              Voltar ao Chat
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {activePage === "home" && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Meus notebooks
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFileIcon />}
            onClick={() => setUploadDialogOpen(true)}
            sx={{ mb: 3 }}
          >
            + Criar novo
          </Button>

          <Grid container spacing={2}>
            {notebooks.map((notebook, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{ bgcolor: "#FF0000", color: "#fff", cursor: "pointer" }}
                  onClick={() => handleNotebookClick(notebook)}
                >
                  <CardContent>
                    <Typography variant="h6">{notebook.title}</Typography>
                    <Typography variant="body2">{notebook.date}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activePage === "chat" && (
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #444",
              pb: 1,
              mb: 2,
            }}
          >
            {editingTitle ? (
              <input
                type="text"
                defaultValue={activeNotebook.title}
                onKeyDown={handleTitleChange}
                onBlur={handleTitleChange}
                autoFocus
                style={{
                  fontSize: "1.5rem",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  outline: "none",
                  width: "100%",
                }}
              />
            ) : (
              <Typography
                variant="h5"
                onClick={handleTitleClick}
                sx={{ cursor: "pointer" }}
              >
                {activeNotebook.title}
              </Typography>
            )}
          </Box>

          <Chat
            messages={messages} // Passando as mensagens para o componente Chat
            onSendMessage={handleSendMessage} // Passando a função de envio de mensagens
          />
        </Box>
      )}

      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>Adicionar fontes</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: "1px dashed #ccc",
              p: 3,
              textAlign: "center",
              bgcolor: "#2c2c2c",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              Arraste e solte ou selecione o arquivo para upload
            </Typography>
            <Button variant="contained" component="label">
              Selecionar arquivo
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;

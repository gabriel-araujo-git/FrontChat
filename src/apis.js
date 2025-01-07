// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Substitua pela URL do seu back-end Flask
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

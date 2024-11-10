// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container); // Crea un root usando createRoot
root.render(<App />); // Renderiza el componente App

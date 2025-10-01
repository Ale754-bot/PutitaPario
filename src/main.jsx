// src/main.jsx (Asegúrate de que está renombrado)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // 👈 Asegúrate de que el path sea correcto
import './index.css';
import { CarritoProvider } from './context/CarritoContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </React.StrictMode>,
)
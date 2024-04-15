import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia esta línea
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Aquí usamos Routes en lugar de Route
import LoginApp from './LoginApp';
import Home from './Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes> {/* Utilizamos Routes en lugar de Route */}
      <Route path="/login" element={<LoginApp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
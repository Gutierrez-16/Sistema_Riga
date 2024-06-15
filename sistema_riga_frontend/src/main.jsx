import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Import the main App component
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('#root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

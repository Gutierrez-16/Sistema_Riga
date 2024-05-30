// En el componente LogoutButton.jsx
import React from 'react';

function LogoutButton({ handleLogout }) {
  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
}

export default LogoutButton;

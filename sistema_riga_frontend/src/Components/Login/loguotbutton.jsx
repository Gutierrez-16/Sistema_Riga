import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const URL = import.meta.env.VITE_BACKEND_URL;

function Logout({ user }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function obtenerUsuarioDelToken(token) {
    try {
      // Decodificar el token para obtener el payload
      const decodedToken = jwtDecode(token);

      // Extraer y retornar la información del usuario (suponiendo que está bajo la clave 'usuario')
      return decodedToken.sub;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  const usuario = obtenerUsuarioDelToken(token);
  const handleLogout = async () => {
    try {
      const response = await fetch(`${URL}/auth/logout/${usuario}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <Button
      label="Logout"
      icon="pi pi-sign-out"
      className="w-full"
      onClick={handleLogout}
    />
  );
}

export default Logout;

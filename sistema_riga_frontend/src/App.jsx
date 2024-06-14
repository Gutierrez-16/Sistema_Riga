import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginApp from './Components/Login/LoginApp';
import Usuario from './Components/Usuario/Usuario';
import Persona from './Components/Person/Persona';
import Producto from './Components/Product/Producto';
import Empleado from './Components/Employer/Empleado';
import Empresa from './Components/Empresa/Empresa';
import Home from './Components/Home/Home';
import Cargo from './Components/Cargo/Cargo';
import Linea from './Components/Linea/Linea';
import Categoria from './Components/Categoria/Categoria';
import MetodoPago from './Components/MetodoPago/MetodoPago';
import ProtectedRoute from './Components/Login/ProtectedRoute';
import UnidadMedidad from './Components/UnidadMedida/UnidadMedida'
import TipoUsuario from './Components/TipoUsuario/TipoUsuario'
import Marca from './Components/Marca/Marca'
import Caja from './Components/Caja/Caja'
import Reporte from './Components/Reporte/Reporte'
import VentasTotal from './Components/Ventas/ListarVentas'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginApp />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Usuario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuario"
        element={
          <ProtectedRoute>
            <Usuario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/listaventas"
        element={
          <ProtectedRoute>
            <VentasTotal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reporte"
        element={
          <ProtectedRoute>
            <Reporte />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Usuario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/persona"
        element={
          <ProtectedRoute >
            <Persona />
          </ProtectedRoute>
        }
      />
      <Route
        path="/producto"
        element={
          <ProtectedRoute>
            <Producto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/unidadmedida"
        element={
          <ProtectedRoute>
            <UnidadMedidad />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tipousuario"
        element={
          <ProtectedRoute>
            <TipoUsuario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/marca"
        element={
          <ProtectedRoute>
            <Marca />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caja"
        element={
          <ProtectedRoute>
            <Caja />
          </ProtectedRoute>
        }
      />

      <Route
        path="/empleado"
        element={
          <ProtectedRoute >
            <Empleado />
          </ProtectedRoute>
        }
      />
      <Route
        path="/empresa"
        element={
          <ProtectedRoute >
            <Empresa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cargo"
        element={
          <ProtectedRoute>
            <Cargo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/linea"
        element={
          <ProtectedRoute >
            <Linea />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categoria"
        element={
          <ProtectedRoute >
            <Categoria />
          </ProtectedRoute>
        }
      />
      <Route
        path="/metodopago"
        element={
          <ProtectedRoute >
            <MetodoPago />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
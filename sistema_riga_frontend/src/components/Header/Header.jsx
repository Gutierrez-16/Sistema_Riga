import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

const Header = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
    setVisible(false);
  };

  const items = [
    {
      label: "Usuarios",
      icon: "pi pi-users",
      command: () => navigateTo("/usuario"),
    },
    {
      label: "Venta",
      icon: "pi pi-id-card",
      items: [
        {
          label: "Ventas",
          icon: "pi pi-dollar",
          command: () => navigateTo("/venta"),
        },
        {
          label: "Caja",
          icon: "pi pi-money-bill",
          command: () => navigateTo("/caja"),
        },
        {
          label: "Método de Pago",
          icon: "pi pi-credit-card",
          command: () => navigateTo("/metodopago"),
        },
      ],
    },
    {
      label: "Empleados",
      icon: "pi pi-id-card",
      items: [
        {
          label: "Empleados",
          icon: "pi pi-id-card",
          command: () => navigateTo("/empleado"),
        },
        {
          label: "Cargo",
          icon: "pi pi-suitcase",
          command: () => navigateTo("/cargo"),
        },
      ],
    },
    {
      label: "Clientes",
      icon: "pi pi-id-card",
      items: [
        {
          label: "Personas",
          icon: "pi pi-user",
          command: () => navigateTo("/persona"),
        },
        {
          label: "Empresas",
          icon: "pi pi-building",
          command: () => navigateTo("/empresa"),
        },
      ],
    },
    {
      label: "Productos",
      icon: "pi pi-shopping-cart",
      items: [
        {
          label: "Marca",
          icon: "pi pi-tag",
          command: () => navigateTo("/marca"),
        },
        {
          label: "Línea",
          icon: "pi pi-list",
          command: () => navigateTo("/linea"),
        },
        {
          label: "Categoría",
          icon: "pi pi-tags",
          command: () => navigateTo("/categoria"),
        },
        {
          label: "Unidad de medida",
          icon: "pi pi-tags",
          command: () => navigateTo("/unidadmedida"),
        },
        {
          label: "Productos",
          icon: "pi pi-shopping-cart",
          command: () => navigateTo("/producto"),
        },
      ],
    },
  ];

  return (
    <header>
      <div className="head">
        <div className="titleheader" style={{ padding: "20px 0px" }}>
          <div style={{ overflowY: "hidden" }}>
          
              <Menu model={items} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

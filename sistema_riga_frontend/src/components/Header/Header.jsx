import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Avatar } from 'primereact/avatar';
import { classNames } from 'primereact/utils';
import DataUsuario from "../Usuario/DataUsuario";

import { Sidebar } from "primereact/sidebar";

import "./HeaderStyle.css"

const Header = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
    setVisible(false);
  };

  const items = [

    {
      label: "Venta",
      icon: "pi pi-id-card",
      items: [
        {
          label: "Ventas",
          icon: "pi pi-dollar",
          command: () => navigateTo("/home"),
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
          label: "Usuarios",
          icon: "pi pi-users",
          command: () => navigateTo("/usuario"),
        },
        {
          label: "Empleados",
          icon: "pi pi-id-card",
          command: () => navigateTo("/empleado"),
        },
        {
          label: "Cargo",
          icon: "pi pi-briefcase",
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
    { separator: true },
    {
      
      template: ( options) => {
        return (
          <button onClick={(e) => options.onClick(e)} className={classNames(options.className, 'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround')}>
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="mr-2" shape="circle" />
            <div className="flex flex-column align">
              <span className="font-bold">Usuario</span>
              <span className="text-sm">Agent</span>
            </div>
          </button>
        );
      }
    }
  ];

  return (
   
    <header style={{  marginRight: '230px'}}>

      <div className="head sidebar" style={{ top: '100px', marginRight: '40px'}}>
        <div className="titleheader overflow-y-auto" style={{  marginLeft: '20px', marginRight: '40px'}}>
          <div className="overflow-y-auto" style={{  overflowX: 'hidden' , overflowY: 'auto'}}>
          <div className="overflow-y-auto" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
    <Menu className="overflow-y-auto"  model={items} />
</div>

          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Header;

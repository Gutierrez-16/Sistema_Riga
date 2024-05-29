import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';

const Header = () => {
    return (
        <div className="layout-topbar">
            <div className="layout-topbar-logo">
                <Link to="/home">
                    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" />
                </Link>
            </div>
            <div className="layout-topbar-search">
                <i className="pi pi-search search-icon"></i>
                <InputText placeholder="Search" className="w-8rem sm:w-auto" />
            </div>
            <div className="layout-topbar-avatar">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            </div>
            <nav className="layout-topbar-nav">
                <ul>
                    <li><Link to="/usuario">USUARIOS</Link></li>
                    <li><Link to="/empleado">EMPLEADOS</Link></li>
                    <li><Link to="/persona">PERSONAS</Link></li>
                    <li><Link to="/empresa">EMPRESAS</Link></li>
                    <li><Link to="/venta">VENTAS</Link></li>
                    <li><Link to="/producto">PRODUCTOS</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;

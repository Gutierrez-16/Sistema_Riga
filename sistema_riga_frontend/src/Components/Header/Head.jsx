import React from 'react';
import { Menubar } from 'primereact/menubar';
import Logout from '../Login/loguotbutton';
import bodega from "../Imagenes/7.png";

import "./HeaderStyle.css"


export default function TemplateDemo() {
    const start = (
        <div className="flex align-items-center gap-3 px-2">
            <a href="/home">
                <img alt="logo" src={bodega} height="60" className="mr-2" />
            </a>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Bodega Riga</h1>
        </div>
    );

    const end = (
        <div className="flex align-items-center px-2" style={{ gap: '10px' }}>
            <Logout />
        </div>
    );

    return (
        <div className="card estatico" >
            <Menubar 
                start={start} 
                end={end} 
                style={{ 
                    backgroundColor: '#f8f9fa', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                    borderBottom: '2px solid #d1d5db' ,
                }} 
                className="p-m-0 p-p-0"
            />
        </div>
    );
}

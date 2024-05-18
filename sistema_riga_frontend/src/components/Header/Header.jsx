import React from 'react';
import { Link } from 'react-router-dom'; 
import './HeaderStyle.css';
import { FiShoppingCart } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { GoMoveToStart } from "react-icons/go";


const Header = () => {


    return (
        <header>
            <div className='head'>
            <div className='titleheader'>EMPRESA RIGA</div>
            <div className='icons'>
            <Link to="/home" className="icon-link">
                <GoMoveToStart   size={50} className='icon'/>
             </Link>  
             <Link to="/usuario" className="icon-link">
                <FaCircleUser size={50} className='icon'/>
             </Link>  

            </div>
            </div>
            <div className='subhead'> 
            <nav>
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
        </header>
    );
};

export default Header;
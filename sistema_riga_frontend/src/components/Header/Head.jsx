import React from 'react';
import { Link } from 'react-router-dom'; 
import './HeadStyle.css';
import { FiShoppingCart } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";


const Head = () => {
    return (
        <header>
            <div className='head'>
                <h1>EMPRESA RIGA</h1>
            </div>
        </header>
    );
};

export default Head;
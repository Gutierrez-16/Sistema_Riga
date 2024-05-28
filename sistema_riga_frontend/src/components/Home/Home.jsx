import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom'; 
import { DataTable } from 'primereact/datatable';


class Home extends Component {
    render() {
      return (
        <article>
            <div className='globalhome'>
                <div className='contenedorhome'>
                    <div className='subcontenedorhome'><h2>EMPRESA RIGA</h2></div>
                    <div className='subcontenedorhome'><Link to="/venta"><button>VENTAS</button></Link></div>
                    <div className='subcontenedorhome'><Link to="/persona"><button>PERSONAS</button></Link></div>
                    <div className='subcontenedorhome'><Link to="/producto"><button>PRODUCTOS</button></Link></div>
                </div>
            </div>
        </article>
      );
    }
  }
  
  export default Home;
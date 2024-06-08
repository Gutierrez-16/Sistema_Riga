import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../Header/Head'; 
import SalesOverview from '../Header/Header';
import SalesComponent from '../Ventas/Venta';

class Home extends Component {
  render() {
    return (
      <div>
         <Dashboard />
        <div className="md:flex"> {/* Utiliza flexbox solo en dispositivos medianos y superiores */}
          <div className="md:w-1/4 md:order-1"> {/* Establece el ancho y el orden del Dashboard en dispositivos medianos y superiores */}
           
          </div>
          <SalesOverview />
          <div className="md:w-3/4 md:order-2"> {/* Establece el ancho y el orden de SalesOverview y SalesComponent en dispositivos medianos y superiores */}
            <div className="p-4">
             
            </div>
            <div className="p-4">
              <SalesComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

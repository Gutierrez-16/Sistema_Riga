import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../Header/Head'; // No curly braces
import SalesOverview from '../Header/Header';


class Home extends Component {
  render() {
    return (
      <div>
        <Dashboard />
        <SalesOverview />
        
        <article>
          <div className='globalhome'>
            <div className='contenedorhome'>
              <div className='subcontenedorhome'><h2>EMPRESA RIGA</h2></div>
              <div className='subcontenedorhome'><Link to="/venta"><button>VENTAS</button></Link></div>
              <div className='subcontenedorhome'><Link to="/persona"><button>PERSONAS</button></Link></div>
              <div className='subcontenedorhome'><Link to="/producto"><button>PRODUCTOS</button></Link></div>
              <div className='subcontenedorhome'><Link to="/logout"><button>LOGOUT</button></Link></div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Home;

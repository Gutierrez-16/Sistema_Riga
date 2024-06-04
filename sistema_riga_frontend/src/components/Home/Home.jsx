import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../Header/Head'; 
import SalesOverview from '../Header/Header';


class Home extends Component {
  render() {
    return (
      <div>
        <Dashboard />
        <SalesOverview />
        
        
      </div>
    );
  }
}

export default Home;

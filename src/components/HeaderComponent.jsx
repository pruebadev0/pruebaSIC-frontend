import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import AuthenticationService from '../api/services/AuthenticationService.js';

class HeaderComponent extends Component {
  render(props) {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn(); 
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div><h5 className="navbar-brand">Prueba Tecnica SIC</h5></div>
          <ul className="navbar-nav">
            {isUserLoggedIn && <li><Link className="nav-link" to="/bienvenido">Inicio</Link></li>}
            {isUserLoggedIn && <li><Link className="nav-link" to="/encuestas">Encuestas</Link></li>}
            {isUserLoggedIn && <li><Link className="nav-link" to="/encuesta">Nueva Encuesta</Link></li>}
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
            {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(HeaderComponent);
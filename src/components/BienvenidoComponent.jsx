import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BienvenidoComponent extends Component {
  render() {
    return (
      <>
        <h1>Bienvenido</h1>
        <div className="container">
          Puedes llenar una encuesta nueva <Link to="/encuesta">acá</Link>
        </div>
        <div className="container">
          Puedes consultar las encuestas diligenciadas <Link to="/encuestas">acá</Link>
        </div>
      </>
    )  
  }
}
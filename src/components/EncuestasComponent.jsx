import React, { Component } from 'react';
import TodoDataService from '../api/services/DataService';
import moment from 'moment';
import AuthenticationService from '../api/services/AuthenticationService.js';

export default class EncuestasComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      encuestas : [],
      message: null
    }
  }

  componentDidMount() {
    this.cargarEncuestas()
  }
  
  cargarEncuestas = () => {
    let username = AuthenticationService.getLoggedInUserName()
    TodoDataService.getEncuestasUsuario(username)
      .then(response => this.setState({ encuestas: response.data }))  
      .catch(error => console.log(error));  
  }

  borrarEncuesta = (id, numeroDocumento) => {
    TodoDataService.borrarEncuesta(id)
      .then(
        response => {
          this.setState({message: `La encuesta con número de documento: ${numeroDocumento} fue borrada`})
          this.cargarEncuestas()
        }
      )
  }

  render() {
    return (
      <div>
        <h1>ENCUESTAS DILIGENCIADAS</h1>
        {(this.state.message && this.state.encuestas.length > 0) && <div className="alert alert-success">{this.state.message}</div>}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Número de Documento</th>
                <th>Email</th>
                <th>Comentarios</th>
                <th>Marca favorita de PC</th>
                <th>Fecha de respuesta</th> 
                <th>Borrar Registro</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.encuestas.map( 
                  encuesta => 
                    <tr key={encuesta.id}>
                      <td>{encuesta.numeroDocumento}</td>
                      <td>{encuesta.email}</td>
                      <td>{encuesta.comentarios}</td>
                      <td>{encuesta.computadorFavorito.marca} - {encuesta.computadorFavorito.referencia}</td>
                      <td>{moment(encuesta.fechaEncuesta).format("YYYY-MM-DD | HH:mm")}</td>
                      <td><button className="btn btn-warning" onClick={() => this.borrarEncuesta(encuesta.id, encuesta.numeroDocumento)}>Borrar</button></td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
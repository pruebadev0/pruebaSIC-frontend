import React, {Component} from 'react';
import TodoDataService from '../api/services/DataService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DataService from '../api/services/DataService';
import AuthenticationService from '../api/services/AuthenticationService.js';

export default class EncuestaComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numeroDocumento: '',
            email : '',
            comentarios : '',
            computadorFavorito : {
              id: 0
            }, 
            computadores : [],
            numeroDocumentoDuplicado : false,
            elementoVacio : [{id: 0, marca: "Por favor seleccione una opción", referencia: ""}]
        }
    }
    
    componentDidMount() {
      this.cargarComputadores();
    }

    cargarComputadores = () => {
      TodoDataService.getComputadores()
      .then(resultados => this.setState({ computadores: this.state.elementoVacio.concat(resultados.data)}))  
      .catch(error => console.log(error));
    }

    validate = (values) => {
      let errors = {}
      if (!values.numeroDocumento) {
        errors.numeroDocumento = 'Ingrese el número del documento'
      } else if(values.numeroDocumento.length < 5) {
        errors.numeroDocumento = 'Ingrese por lo menos 3 caracteres en el número del documento'
      }

      if (!values.email) {
        errors.email = 'Ingrese el email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'email ingresado no valido';
      }

      if((parseInt(values.computadorFavorito.id) === 0)) {
        errors.computadorFavorito = 'Debe seleccionar una marca de PC'
      } 
      
      console.log(values)

      return errors
    }

    onSubmit = (values) => {
      let username = AuthenticationService.getLoggedInUserName()
      let encuesta = {
        numeroDocumento: values.numeroDocumento,
        email : values.email,
        comentarios : values.comentarios,
        computadorFavorito : {
          id: values.computadorFavorito
        }, 
        encuestado : {
          nombreUsuario: username
        }
      }

      DataService.crearEncuesta(encuesta)
        .then(() => this.props.history.push('bienvenido'))
        .catch( () => {this.setState({numeroDocumentoDuplicado : true})})
    }

    render() {
      let { numeroDocumento, email, comentarios, numeroDocumentoDuplicado, computadorFavorito } = this.state;
      return (
          <div>
              <h1>ENCUESTA</h1>
              <br/>
              {numeroDocumentoDuplicado && <div className="alert alert-warning">Ya existe una encuesta con el mismo número de documento</div>}
              <div className="container">
                  <Formik 
                    initialValues={{numeroDocumento, email, comentarios, computadorFavorito}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}>
                      {
                          (props) => (
                              <Form>
                                <ErrorMessage name="numeroDocumento" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="email" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="computadorFavorito" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                  <label>Número de Documento</label>
                                  <Field className="form-control" type="text" name="numeroDocumento"/>
                                </fieldset>
                                <br/>
                                <fieldset className="form-group">
                                  <label>E-mail</label>
                                  <Field className="form-control" type="email" name="email"/>
                                </fieldset>
                                <br/>
                                <fieldset className="form-group">
                                  <label>Comentarios</label>
                                  <Field className="form-control" as="textarea" name="comentarios"/>
                                </fieldset>
                                <br/>
                                <fieldset className="form-group">
                                  <label>Marca favorita de PC</label>
                                  <Field className="form-control" as="select" name="computadorFavorito">
                                    {
                                      this.state.computadores.map(computador => {
                                        return (
                                          <option key={computador.id} value={computador.id}>
                                            {computador.marca} - {computador.referencia}
                                          </option>
                                        )
                                      })
                                    }
                                  </Field>
                                </fieldset>

                                <br/>
                                <button className="btn btn-success" type="submit">Guardar Encuesta</button>
                              </Form>
                          )
                      }
                  </Formik>
              
              </div>                
          </div>
      )
    }
}

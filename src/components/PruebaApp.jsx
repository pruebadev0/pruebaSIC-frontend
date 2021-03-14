import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import HeaderComponent from './HeaderComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import ErrorComponent from './ErrorComponent';
import EncuestaComponent from './EncuestaComponent';
import EncuestasComponent from './EncuestasComponent';
import BienvenidoComponent from './BienvenidoComponent';

export default class TodoApp extends Component {
  render() {
    return (
      <div className="todoApp">
        <Router>
          <HeaderComponent/>
          <Switch>
            <Route path="/" exact component={LoginComponent}/>
            <Route path="/login" component={LoginComponent}/>
            <AuthenticatedRoute path="/bienvenido" component={BienvenidoComponent}/>
            <AuthenticatedRoute path="/encuestas" component={EncuestasComponent}/>
            <AuthenticatedRoute path="/encuesta" component={EncuestaComponent}/>
            <Route path="/logout" component={LogoutComponent}/>
            <Route component={ErrorComponent}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
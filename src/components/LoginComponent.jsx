import React, { Component } from 'react';
import AuthenticationService from '../api/services/AuthenticationService.js';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'testerSIC1',
      password: '',
      showSuccessMessage: false,
      hasLoginFailed: false 
    }
  }

  handlerChange = (event) => {
    this.setState(
      {
        [event.target.name] : event.target.value
      }
    )
  }
    
  loginClicked = () => {
    AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
      .then((response) => {
        AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
        this.props.history.push('/bienvenido')
      }).catch( () =>{
          this.setState({showSuccessMessage:false})
          this.setState({hasLoginFailed:true})
      })
  }

  render() {
    const { showSuccessMessage, hasLoginFailed } = this.state;
    return (
      <div>
        <br/>
        <div className="container ">
          {showSuccessMessage && <div>Login Success</div>}
          {hasLoginFailed && <div className="alert alert-warning">Los valores ingresados no son validos</div>}
          USERNAME: <input type="text" name="username" 
            value={this.state.username} onChange={this.handlerChange}/>
          <br/>
          <br/>
          PASSWORD: <input type="password" name="password"
            value={this.state.password} onChange={this.handlerChange}/>
          <br/>
          <br/>
          <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
        </div>
      </div>
    );
  }
}
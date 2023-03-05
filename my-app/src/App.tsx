import React, { Component, FormEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import { PassThrough } from 'stream';

interface State {
  username: string;
  password: string;
  loginError: string;
}
class App extends Component<{}, State> {
  constructor(props: {}) {
      super(props);

      this.state = {
        username: '',
        password: '',
        loginError: '',
      }
  }
  //async  promist ad vissza?
  // melyik értéket adja vissza ezek közül?
  // mi és hol veszi fel a bejelntkezéshez tartozó jelszavat és felhasználó nevet
  // hol tudom megnézni mit tud a FromEvent osztály és a Component, illetve mi a component? ures tombot és state nevu osztályt tartalmazó class?
  // miért van a statenek setState metódusa honnan hivatkozik rá ha felül nincsen beimportálva


  handleLogin = async (e: FormEvent) => {
    e.preventDefault(); 
    const LoginData = {
      'username': this.state.username, //itt?
      'password': this.state.password,
    };
    const responsive = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(LoginData), // ez mi
    })
    if(!responsive.ok) {
        if(responsive.status == 401) {
            this.setState({ loginError: 'Wrong username or password'})
        }
    }
  }

  render() {
    return <div>
      <form onSubmit = {this.handleLogin}>
        <label>
          Username: <br/>
          <input type="text" value={this.state.username} onChange={(e)=> this.setState({username: e.target.value})}/>
        </label>
        <br />
        <label >
           Pssword:<br />
            <input type="password" value={this.state.password} onChange={(e)=> this.setState({password: e.target.value})}/>
          </label>
          <br/>
            <p>{this.state.loginError}</p>
          <input type="submit" value="Login" />
        </form>
    </div>
  }
}

export default App;

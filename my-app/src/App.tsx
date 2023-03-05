import React, { Component, FormEvent } from 'react';
import './App.css';

interface State {
  username: string;
  password: string;
  loginError: string;
  loggedIn: boolean;
  authorToken: string;
}
class App extends Component<{}, State> {
  constructor(props: {}) {
      super(props);

      this.state = {
        username: '',
        password: '',
        loginError: '',
        loggedIn: false,
        authorToken: '',
      }
  }
  //async  promist ad vissza?
  // melyik értéket adja vissza ezek közül?
  // mi és hol veszi fel a bejelntkezéshez tartozó jelszavat és felhasználó nevet
  // hol tudom megnézni mit tud a FromEvent osztály és a Component, illetve mi a component? ures tombot és state nevu osztályt tartalmazó class?
  // miért van a statenek setState metódusa honnan hivatkozik rá ha felül nincsen beimportálva


  handleLoadProfile =async () => { const responsive = await fetch('http://localhost:3000/auth/login');
    
  }
  handleLogin = async (e: FormEvent) => {
    e.preventDefault(); 
    const LoginData = {
      'username': this.state.username, //itt?
      'password': this.state.password,
    };
    const responsive = await fetch('http://localhost:3000/login', {
      method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(LoginData), // ez mi
    })
    if(!responsive.ok) {
        if(responsive.status == 401) {
            this.setState({ loginError: 'Wrong username or password'})
        } else ( this.setState({ loginError: 'Server problem'}))
        return;
      }
      const responseBody = await responsive.json();
      console.log(responseBody.token);
      this.setState({loggedIn: true})

  }

  render() {
    const { username, password, loggedIn, loginError } = this.state;
    if (loggedIn) {
      return <div>
        <p> <button>Logout</button></p>
        <p> <button onClick={this.handleLoadProfile}>Load profile data</button></p>
        <p> My profile:</p>
        <p> Username: [USER]</p>
        <p> User id:  [ID]</p>
      </div>
    } 
    return <div>
      <form onSubmit = {this.handleLogin}>
        <label>
          Username: <br/>
          <input type="text" value={username} onChange={(e)=> this.setState({username: e.target.value})}/>
        </label>
        <br />
        <label >
           Pssword:<br />
            <input type="password" value={password} onChange={(e)=> this.setState({password: e.target.value})}/>
          </label>
          <br/>
            <p>{ loginError }</p>
          <input type="submit" value="Login" />
        </form>
    </div>
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
const axios = require('axios');

class App extends Component {
  state = {
    clickedEvent: {},
    wantsToLogin: true
  };

  firsNameHandler = firstName => {
    this.setState({ firstName });
  };

  lastNameHandler = lastName => {
    this.setState({ lastName });
  };


  emailHandler = email => {
    this.setState({ email });
  };

  passwordHandler = password => {
    this.setState({ password });
  };

  phoneHandler = phone => {
    this.setState({ phone });
  };

  addressHandler = address => {
    this.setState({ address });
  };



  logIn = async () => {
    let body = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(body);
    let res;
    try {
      res = await axios.post("http://localhost:3001/api/users/login", body);
      if (res.status === 200) {
      
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", res.data.token);
        this.setState({
          loggedIn: true,
          token: res.data.token
        });
      }

      else{this.setState({wrongEmailOrPass:true})
      console.log("mn gowa login")}
    } catch {
      console.log("wrong email or password");
      this.setState({wrongEmailOrPass:true})
    }
  };




  componentWillMount() {
    this.setState({
      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token")
    });
  }

  signUp = async (first,last,email,password,phone,address) => {
    console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffff")
    let body = {
      firstName:first,
      lastName:last,
      email: email,
      password:password,
      phone:phone,
      address:address
     
    };
    console.log(body);
    let res;
    try {
      res = await axios.post("http://localhost:3001/api/users", body);
     
    } catch (error){
      console.log(error);
    }
  };

render(){

      return (
        <div>

          <SignIn
              signInMethod={this.logIn}
              mail={this.emailHandler}
              pass={this.passwordHandler}
            />
        </div>
        
      );
  }

}


export default App;

import React, { Component } from "react";
import "./App.css";
import StripeBtn from "./components/stripeBtn";

class App extends Component {  render() {
    return (
      <div className="App">
        <header className="App-header">
        {/* here send the price times * 100 because it is in cents */}
          {/* <StripeBtn price={500}/>  */}
        </header>
      </div>
      );
  }
}export default App;
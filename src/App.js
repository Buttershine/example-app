import React, { Component } from 'react';
import logo from './logo.svg';
import {getTicker} from './utility/httputil.js';
import TickerPanel from './tickerPanel/tickerPanel.jsx';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My React Application</h1>
        </header>
        <div class="row">
          <div>
            <div class="header">
            </div>
            <div class="panel panel-default">
            <TickerPanel data = {this.state.data}/>
            </div>
          </div>
        </div>
        <button onClick={this.handleClick}>Get Prices</button>
      </div>
    );
  }

  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    var _this = this;
    getTicker('https://api.coinmarketcap.com/v1/ticker/')
    .then(function(response){
      _this.setState({
        data: response.data
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

}

export default App;

//************************************************************
//              <div>{JSON.stringify(this.state.items)}</div> render a json string response
//
// //Set an object other than data
// componentDidMount() {
//   var _this = this;
//   getTicker('https://api.coinmarketcap.com/v1/ticker/')
//   .then(function(response){
//     _this.setState({
//       items: response.data
//     });
//   })
//   .catch(function(e) {
//     console.log("ERROR ", e);
//   })
// }
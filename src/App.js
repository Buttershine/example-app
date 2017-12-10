import React, { Component } from 'react';
import logo from './logo.svg';
import {getTicker} from './utility/httputil.js';
import TickerPanel from './tickerPanel/tickerPanel.jsx';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Some Awesome Crypto</h1>
        </header>
        <div class="row">
          <div class="pull-left button-panel">
            <DropdownButton title="Percentage Change" onSelect={this.onItemClick}>
              <MenuItem eventKey={1}>1h</MenuItem>
              <MenuItem eventKey={2}>24h</MenuItem>
              <MenuItem eventKey={3}>7d</MenuItem>
            </DropdownButton>
          </div>
        </div>
        <div class="row">
          <div>
            <div class="header">
            </div>
            <div class="panel panel-default">
            <TickerPanel data = {this.state.priceList}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  constructor() {
    super();
    this.state = {
      prevState: {},
      priceList: []
    };
  }

  getInitialState() {
    return {
      name: this.props.name
    };
  }

  componentDidMount() { //autoruns
    var _this = this;
    getTicker('https://api.coinmarketcap.com/v1/ticker/')
    .then(function(response){
      _this.setState({
        priceList: response.data //assigns the array to the priceList object
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }

  onItemClick = (evt) => {
    if(evt === 1) {
      var temp = this.state.priceList.sort(function(a, b) {
        return parseFloat(b.percent_change_1h) - parseFloat(a.percent_change_1h);    
      });
    } else if(evt === 2) {
      var temp = this.state.priceList.sort(function(a, b) {
      return parseFloat(b.percent_change_24h) - parseFloat(a.percent_change_24h);
      });
    } else if(evt === 3) {
      var temp = this.state.priceList.sort(function(a, b) {
      return parseFloat(b.percent_change_7d) - parseFloat(a.percent_change_7d);
      });
    }

      this.setState({
        priceList: temp //assigns the array to the priceList object
      });

  }

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
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, fetchQuote, fetchSecretQuote } from './actions/authActions'
import Navbar from './components/navbar'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import quotesApp from './reducers/authReducers'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'
import logo from './logo.svg';
import {getRequest} from './utility/httpUtil.js';
import TickerPanel from './tickerPanel/tickerPanel.jsx';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PercentageDropdown from "./components/dropdowns/percentageDropdown";
import PriceDropdown from "./components/dropdowns/priceDropdown";
import Button from "react-bootstrap/es/Button";


let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(quotesApp)

let rootElement = document.getElementById('root')
	
String.prototype.formatMoney = (c, d, t) => {
	var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

	console.log(Number.prototype);

class App extends Component {

  render() {
      const { dispatch, isAuthenticated, errorMessage } = this.props;

      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Some Awesome Crypto</h1>
        </header>
        <div class="row">
          <div class="col-xs-12 col-md-8">
            <div class="btn-group btn-group-justified">
              <div class="btn-group">
                <PercentageDropdown percentageSelect = {this.percentageSelect}/>
                <PriceDropdown priceSelect = {this.priceSelect}/>
              </div>
            </div>
                {/*<Button type={button} onClick={this.callBackend}/>*/}
          </div>
          <div class="col-xs-6 col-md-4">
            <div>
              <Navbar
                  isAuthenticated={isAuthenticated}
                  errorMessage={errorMessage}
                  dispatch={dispatch}
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div>
            <div class="header">
            </div>
            <div class="panel panel-default">
            <TickerPanel data = {this.state.coinList}/>
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
      coinList: []
    };
  }

  getInitialState() {
    return {
      name: this.props.name
    };
  }

  percentageSelect = (evt) => {
    var temp = {};
    if(evt === 1) {
      temp = this.state.coinList.sort(function(a, b) {
        return parseFloat(b.percent_change_1h) - parseFloat(a.percent_change_1h);    
      });
    } else if(evt === 2) {
      temp = this.state.coinList.sort(function(a, b) {
      return parseFloat(b.percent_change_24h) - parseFloat(a.percent_change_24h);
      });
    } else if(evt === 3) {
      temp = this.state.coinList.sort(function(a, b) {
      return parseFloat(b.percent_change_7d) - parseFloat(a.percent_change_7d);
      });
    }
    this.setState({
      coinList: temp //assigns the array to the priceList object
    });
  }

  priceSelect = (evt) => {
    var temp = {};
    if(evt === 1) {
      temp = this.state.coinList.sort(function(a, b) {
        return parseFloat(a.price_usd) - parseFloat(b.price_usd);    
      });
    } else if(evt === 2) {
      temp = this.state.coinList.sort(function(a, b) {
      return parseFloat(b.price_usd) - parseFloat(a.price_usd);
      });
    } 
    this.setState({
      coinList: temp //assigns the array to the priceList object
    });
  }

  componentDidMount() { //autoruns
    var _this = this;
    getRequest('https://api.coinmarketcap.com/v1/ticker/')
    .then(function(response) {
     //  var temp = {};
    	// response.data.forEach(function (coin) {
    	// 	var temp = (coin.market_cap_usd).formatMoney(2, '.', ',');
    	// 	response.data[response.data.findIndex(x => x.name==coin.name)].market_cap_usd = '$' + (coin.market_cap_usd).formatMoney(2, '.', ',');
    	// });
      _this.setState({
        coinList: response.data //assigns the array to the coinList object
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }

  callBackend() {
    getRequest()
  }

}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

    const { quotes, auth } = state
    const { quote, authenticated } = quotes
    const { isAuthenticated, errorMessage } = auth

    return {
        quote,
        isSecretQuote: authenticated,
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(App)

//************************************************************
// <PercentageDropdown onItemClick = {this.doParentToggle} /> : the onItemClick is the binding you reference in your child class e.g. onSelect={this.props.onItemClick.bind(this)} <DropdownButton title="Percentage Change" onSelect={this.props.onItemClick.bind(this)}>
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
//
// Leaving this in here for reference on how to gget child and parent state passed to each other.
//   render() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1 className="App-title">Some Awesome Crypto</h1>
//       </header>
//       <div class="row">
//         <div class="pull-left button-panel">
//           <Child parentToggle={this.doParentToggle} />
//           <PercentageDropdown onItemClick = {this.onItemClick} />
//         </div>
//       </div>
//       <div class="row">
//         <div>
//           <div class="header">
//           </div>
//           <div class="panel panel-default">
//           <TickerPanel data = {this.state.priceList}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// doParentToggle(){
//   console.log("hello");
// }


// {
//     "id": "bitcoin", 
//     "name": "Bitcoin", 
//     "symbol": "BTC", 
//     "rank": "1", 
//     "price_usd": "15576.5", 
//     "price_btc": "1.0", 
//     "24h_volume_usd": "13583700000.0", 
//     "market_cap_usd": "260642353325", 
//     "available_supply": "16733050.0", 
//     "total_supply": "16733050.0", 
//     "max_supply": "21000000.0", 
//     "percent_change_1h": "0.42", 
//     "percent_change_24h": "5.28", 
//     "percent_change_7d": "35.92", 
//     "last_updated": "1512951554"
// }
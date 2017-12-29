import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, fetchQuote, fetchSecretQuote } from './actions/authActions'
import AuthModal from './components/authentication/authModal'
import { ButtonGroup } from 'react-bootstrap';
import logo from './logo.svg';
import { getRequest } from './utility/httpUtil.js';
import TickerPanel from './tickerPanel/tickerPanel.jsx';
import PercentageDropdown from "./components/dropdowns/percentageDropdown";
import PriceDropdown from "./components/dropdowns/priceDropdown";
import LoginTopMenu from "./components/authentication/loginTopMenu";
import Logout from "./components/authentication/logout";

class App extends Component {

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props;
        return (
            <div className="App">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <LoginTopMenu
                    isAuthenticated={isAuthenticated}
                    dispatch={dispatch}
                />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Some Awesome Crypto</h1>
                </header>
                <AuthModal
                    isAuthenticated={isAuthenticated}
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                />
                <div class="row">
                    <div class="col-xs-12 col-md-8">
                        <div class="btn-group btn-group-justified">
                            <ButtonGroup>
                                <PercentageDropdown percentageSelect = {this.percentageSelect}/>
                                <PriceDropdown priceSelect = {this.priceSelect}/>
                            </ButtonGroup>
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

    //HTML Methods

    //Helper Methods
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

    makeRequest = async () => {

        const task1 = getRequest('https://api.coinmarketcap.com/v1/ticker/');
        const task2 = getRequest('https://min-api.cryptocompare.com/data/all/coinlist');

        return {
            result1: await task1,
            result2: await task2
        }
    }

    componentDidMount = async () => { //autoruns
        var _this = this;

        let response = await this.makeRequest();
        let coinData = [];
        response.result1.data.forEach(function(cmCoin) {
            // Object.keys(response.result2.data.Data).forEach(function(trait) {
            //     const val = response.result2.data.Data[key];
            //     // use val
            // });
            for(var key in response.result2.data.Data) {
                var value = response.result2.data.Data[key];
                if(cmCoin.name === value.CoinName) {
                    cmCoin.imageUrl = 'https://www.cryptocompare.com'+ value.ImageUrl;
                }
            }
            // for(var ccCoin in response.result2.data.Data[cmCoin.name]) {
            //     debugger;
            //     if(cmCoin.name == ccCoin.CoinName) {
            //         debugger;
            //     }
            // }
        });
        //    var temp = {};
        // response.data.forEach(function (coin) {
        //
        //     response.data[response.data.findIndex(x => x.name==coin.name)].market_cap_usd = '$' + (coin.market_cap_usd).formatMoney(2, '.', ',');
        // });
        _this.setState({
            coinList: response.result1.data //assigns the array to the coinList object
        });

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
//                            <div>{JSON.stringify(this.state.items)}</div> render a json string response
//
// //Set an object other than data
// componentDidMount() {
//     var _this = this;
//     getTicker('https://api.coinmarketcap.com/v1/ticker/')
//     .then(function(response){
//         _this.setState({
//             items: response.data
//         });
//     })
//     .catch(function(e) {
//         console.log("ERROR ", e);
//     })
// }
//
// Leaving this in here for reference on how to gget child and parent state passed to each other.
//     render() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <h1 className="App-title">Some Awesome Crypto</h1>
//             </header>
//             <div class="row">
//                 <div class="pull-left button-panel">
//                     <Child parentToggle={this.doParentToggle} />
//                     <PercentageDropdown onItemClick = {this.onItemClick} />
//                 </div>
//             </div>
//             <div class="row">
//                 <div>
//                     <div class="header">
//                     </div>
//                     <div class="panel panel-default">
//                     <TickerPanel data = {this.state.priceList}/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// doParentToggle(){
//     console.log("hello");
// }


// {
//         "id": "bitcoin",
//         "name": "Bitcoin",
//         "symbol": "BTC",
//         "rank": "1",
//         "price_usd": "15576.5",
//         "price_btc": "1.0",
//         "24h_volume_usd": "13583700000.0",
//         "market_cap_usd": "260642353325",
//         "available_supply": "16733050.0",
//         "total_supply": "16733050.0",
//         "max_supply": "21000000.0",
//         "percent_change_1h": "0.42",
//         "percent_change_24h": "5.28",
//         "percent_change_7d": "35.92",
//         "last_updated": "1512951554"
// }
import React, { Component } from 'react';

class TickerPanel extends React.Component {
    getInitialState() {
        return {
           data: {
              stuff: [] 
           }
        };
    }

    render() {
    if (!this.props.data) {
        return null;
    }

    return (
      <div className="TickerPanel">
        {
          this.props.data.map(function(coin) {
            return <div class="col-lg-3" key={coin.id}> 
                <div class="currency-tablet">
                    <h1>{coin.name}</h1>
                    <div class="">
                        <span class="col-lg-4 bold">Price: </span>
                        <span class="col-lg-4 bold">MarketCap: </span>
                        <span class="col-lg-4 bold">Rank: </span>
                    </div>
                    <div class="">
                        <span class="col-lg-4">${coin.price_usd} </span>
                        <span class="col-lg-4">{coin.market_cap_usd} </span>
                        <span class="col-lg-4">{coin.rank} </span>
                    </div>
                    <div class="panel">
                        <h3>Percent Change</h3>
                        <span className={"col-lg-4 " + (coin.percent_change_1h > 0 ? 'success' : 'warning')}>1h:{coin.percent_change_1h}% </span>
                        <span class="col-lg-4">24h:{coin.percent_change_24h}% </span>
                        <span class="col-lg-4">1w:{coin.percent_change_7d}% </span>
                    </div>
                </div>
            </div>
          })
        }
      </div>
    )}
};

export default TickerPanel;

// 24h_volume_usd
// "6678200000.0"
// available_supply
// "16718100.0"
// id
// "bitcoin"
// last_updated
// "1512345852"
// market_cap_usd
// "189171988740"
// max_supply
// "21000000.0"
// name
// "Bitcoin"
// percent_change_1h
// "0.92"
// percent_change_7d
// "19.23"
// percent_change_24h
// "1.98"
// price_btc
// "1.0"
// price_usd
// "11315.4"
// rank
// "1"
// symbol
// "BTC"
// total_supply
// "16718100.0"
// __proto__
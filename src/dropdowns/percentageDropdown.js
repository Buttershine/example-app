import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

 class PercentageDropdown extends React.Component {
   constructor(props){
     super(props);
   }
   render() {
     return(
        <DropdownButton title="Percentage Change" onSelect={this.props.percentageSelect.bind(this)}>
          <MenuItem eventKey={1}>1h</MenuItem>
          <MenuItem eventKey={2}>24h</MenuItem>
          <MenuItem eventKey={3}>7d</MenuItem>
        </DropdownButton>
     )
   }
 }

export default PercentageDropdown;

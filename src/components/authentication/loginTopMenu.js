import React from 'react';
import '../../App.css';
import {Button } from 'react-bootstrap'

const LoginTopMenu = () => {
    return (<div>
        <style type="text/css">{`
    .btn-custom {
 position:absolute;
   right:10px;
   top:5px;
   background-color: transparent;
   color: white;
    }
    `}</style>
        <Button bsStyle="custom">Logout</Button>
    </div>);
}

export default LoginTopMenu;
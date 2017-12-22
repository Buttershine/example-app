import React, { Component, PropTypes } from 'react'
import {Form, FormGroup, FormControl, Col, Button} from 'react-bootstrap'
import VertBar from '../miscellaneous/vertBar.js'

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { errorMessage } = this.props

        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={6}>
                            <FormControl ref='username' type='text' class="form-control" placeholder={"Username"}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={6}>
                            <FormControl ref='password' type='password' class="form-control" placeholder={"Password"}/>
                        </Col>
                    </FormGroup>
                        {/*{errorMessage &&*/}
                        {/*<p>{errorMessage}</p>*/}
                        {/*}*/}
                    <FormGroup>
                        <Col sm={12}>
                            <Button onClick={(event) => this.handleClick(event)} ref="login" className="btn btn-primary button-panel-button">Login</Button>
                            {/*<VertBar/>*/} <span> or </span>
                            <Button onClick={(event) => this.handleClick(event)} ref="register" className="btn btn-primary button-panel-button">Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }

    handleChange(e, prop){
        let change = {}
        debugger;
        change[e.target.name] = e.target.value;
        this.setState(change)
    }

    handleClick(event) {
        const username = this.refs.username
        const password = this.refs.password
        const creds = { username: username.value.trim(), password: password.value.trim() }
        this.props.onLoginClick(creds)
    }
}
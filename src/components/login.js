import React, { Component, PropTypes } from 'react'

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
                <div class="form-inline">
                    <div class="form-group .col-md-8">
                        <label class="login-panel-label">Username</label><input ref='username' type='text' class="form-control" placeholder={"Username"}/>
                        <label class="login-panel-label">Password</label><input ref='password' type='password' class="form-control" placeholder={"Password"}/>
                        {/*{errorMessage &&*/}
                        {/*<p>{errorMessage}</p>*/}
                        {/*}*/}
                    </div>
                    <div class=".col-md-4">
                        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary button-panel-button">
                            Login
                        </button>
                    </div>
                </div>
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
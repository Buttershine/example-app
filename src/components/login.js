import React, { Component, PropTypes } from 'react'

export default class Login extends Component {

    render() {
        const { errorMessage } = this.props

        return (
            <div>
                <div>
                    <span>User</span><input type='text' ref='username' className="form-control" style= {{'placeholder':'Username'}}/>
                </div>
                <div>
                    <span>Pass</span><input type='password' ref='password' className="form-control" style= {{'placeholder':'Password'}}/>
                </div>
                <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
                    Login
                </button>

                {errorMessage &&
                <p>{errorMessage}</p>
                }
            </div>
        )
    }

    handleClick(event) {
        const username = this.refs.username
        const password = this.refs.password
        const creds = { username: username.value.trim(), password: password.value.trim() }
        this.props.onLoginClick(creds)
    }
}
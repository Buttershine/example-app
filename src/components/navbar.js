import React, { Component, PropTypes } from 'react'
import Login from './login'
import Logout from './logout'
import { loginUser, logoutUser } from '.././actions/authActions'

export default class Navbar extends Component {

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props

        return (
            <div className='login-panel'>

                {!isAuthenticated &&
                <Login
                    errorMessage={errorMessage}
                    onLoginClick={ creds => dispatch(loginUser(creds)) }
                />
                }

                {isAuthenticated &&
                <Logout onLogoutClick={() => dispatch(logoutUser())} />
                }

            </div>
        )
    }

}
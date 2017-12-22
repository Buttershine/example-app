import React, { Component, PropTypes } from 'react'
import Login from './login'
import Logout from './logout'
import { Modal, Button, ModalBody, ModalFooter} from 'react-bootstrap';
import { loginUser, logoutUser } from '../../actions/authActions'

export default class AuthModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            authModalShow: true
        }

        this.closeModal = this.closeModal.bind(this);

    }

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props

        return (
            <div>
                <Modal show={this.state.authModalShow} onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Login or Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!isAuthenticated &&
                        <Login
                            errorMessage={errorMessage}
                            onLoginClick={ creds => dispatch(loginUser(creds)) }
                        />
                        }
                        {isAuthenticated &&
                        <Logout onLogoutClick={() => dispatch(logoutUser())} />
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    closeModal() {
        this.setState({ authModalShow: false });
    }

    openModal(){
        this.setState({ authModalShow: true });
    }

}
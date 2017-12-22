import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import quotesApp from './reducers/authReducers'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'
import './App.css';


let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(quotesApp)

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById('root')
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    )
});


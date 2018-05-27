import React from 'react';
import {connect} from 'react-redux';

import './map.css';
import './login.css'

const {login} = require('../actions/auth');

export class LoginForm extends React.Component {

    render() {
        return (
            <form
                className="login-form"
                onSubmit={e => {
                    e.preventDefault();
                    this.props.dispatch(login(e.target.username.value, e.target.password.value));
                }
                }>
                <label htmlFor="username" className="userInput">Username</label>
                    <input className="editField userField" name="username" type="text"></input>
                <label htmlFor="password" className="passInput">Password</label>
                    <input className="editField passField" name="password" type="password"></input>
                <button className="loginBtn">
                    Log in
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    spotList: state.spot,
    auth: state.auth
});

export default connect(mapStateToProps)(LoginForm);
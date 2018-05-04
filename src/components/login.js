import React from 'react';
import {login} from '../actions/auth';
import {connect} from 'react-redux';

import './map.css';
import './login.css'

export class LoginForm extends React.Component {
    onSubmit(values) {
        this.props.dispatch(login(values.username, values.password));
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={e => {e.preventDefault();
                    this.onSubmit({username: e.target.username.value, password: e.target.password.value})}
                }>
                <label htmlFor="username" className="userInput">Username</label>
                    <input className="editField" name="username" type="text"></input>
                <label htmlFor="password" className="passInput">Password</label>
                    <input className="editField" name="password" type="password"></input>
                <button className="editBtnSubmit loginBtn">
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
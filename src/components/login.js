import React from 'react';
import {login} from '../actions/auth';
import {connect} from 'react-redux';

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
                <label htmlFor="username">Username</label>
                    <input name="username" type="name"></input>
                <label htmlFor="password">Password</label>
                    <input name="password" type="password"></input>
                <button>
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
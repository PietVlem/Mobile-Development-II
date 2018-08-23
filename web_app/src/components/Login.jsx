import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import config from '../config/config.json';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { signInAction_FB, signInAction_GOOGLE, signInAction_LOCAL, signInAction_REGISTER } from '../actions/authActions';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    responseLocalSignUp(){
        this.props.signInAction_REGISTER(this.state.email, this.state.password);
    }
    responseLocal(){
        this.props.signInAction_LOCAL(this.state.email, this.state.password);
    }
    responseFacebook(response) {
        console.log(response);
        this.props.signInAction_FB(response);
    }
    responseGoogle(response) {
        console.log(response);
        this.props.signInAction_GOOGLE(response);
    }
    onFailure = (error) => {
        alert(error);
    }
    render() {
        return (
            <div className="login-wrapper">
                <div className="login">
                    <div>
                        <form>
                            <input
                                placeholder="Email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChangeEmail.bind(this)}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleChangePassword.bind(this)}
                            />
                            <button 
                            className="button button--full-width"
                            onClick={()=> this.responseLocal()}
                            >Login</button>
                            <button 
                            className="button button--full-width button--last"
                            onClick={()=> this.responseLocalSignUp()}
                            >Sign Up</button>
                        </form>
                    </div>
                    <p className="login-label-social">or log in with:</p>
                    <div className="login__social">
                        <div>
                            <FacebookLogin
                                appId={config.FACEBOOK_APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={this.responseFacebook.bind(this)}
                                render={renderProps => (
                                    <button className="button button--facebook" onClick={renderProps.onClick}>Facebook</button>
                                )} />
                        </div>
                        <div>
                            <GoogleLogin
                                clientId={config.GOOGLE_CLIENT_ID}
                                buttonText="Google"
                                className="button button--google"
                                onSuccess={this.responseGoogle.bind(this)}
                                onFailure={this.responseGoogle.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    signInAction_FB: PropTypes.func.isRequired,
    signInAction_GOOGLE: PropTypes.func.isRequired,
    signInAction_LOCAL: PropTypes.func.isRequired,
    signInAction_REGISTER: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}


export default connect(mapStateToProps, { signInAction_FB, signInAction_GOOGLE, signInAction_LOCAL, signInAction_REGISTER })(LoginComponent);
import React, { Component } from 'react';
import firebase from '../firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // ...
            }
            // The signed-in user info.
            var user = result.user;
            console.log('user is...', user);
            if (user) {
                window.location.assign('/');
            }
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    login = () => {
        if(this.state.password === '' || this.state.email === ''){
            alert("fields cannot be empty");
            return false;
        }
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        promise.catch(e => {
            this.setState({
                err: 'You are not Registered!!! '
            }, () => {
                alert("Login Error: User not Registered");
            });
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              window.location.assign('/');
            } else {
              // No user is signed in.
            }
        });
    };

    googleSignIn = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        const promise = firebase.auth().signInWithRedirect(provider);
        // console.log("hello......");
        // promise.catch(e =>{
        //     console.log(e.message)
        // });
    };

    render () {
        return (
            <div className="login-form">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="email"
                            name="email" 
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={ this.changeHandler }
                            value={ this.state.email }
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            className="form-control" 
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={ this.changeHandler }
                            value={ this.state.password }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={ this.login }>Login</button>
                    <div className="form-group" style={{ margin: '10px auto' }}>
                        <label htmlFor="option">Or</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={ this.googleSignIn }>Login using G+</button>
                </div>    
            </div>
        );
    }
}

export default Login;
import React, { Component } from 'react';
import SignUp from './SignUp'
import About from './About'
import { BrowserRouter as Router, Route , Redirect} from 'react-router-dom'
import * as firebase from 'firebase'

class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            signUp :false,
            err:'',
            about:false
        };
    }

    changeHandler=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    login =() => {
        if(this.state.password === '' || this.state.email === ''){
            alert("fields cannot be empty");
        } else {
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
            promise.catch(e => {
                this.setState({
                    err: 'You are not Registered!!! '
                }, () => {
                    alert("Login Error: User not Registered");
                });
            });
        }
    };

    signIn = () => {
        this.setState({
            signUp:true
        });
    };

    googleSignIn=()=> {
        let provider = new firebase.auth.GoogleAuthProvider();
        const promise = firebase.auth().signInWithRedirect(provider);
        promise.catch(e =>{
            console.log(e.message)
        })
    };

    onAboutClick = () =>{
        this.setState({
            about:true
        })
    }

    render() {
        console.log('this.state.about',this.state.about);
        return (
            <div className="login">
                {
                    this.state.about?
                        <About/>:
                        <div>
                            <div className="navbar">
                                <img className="userImage" src="data:image/png;base64,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"
                                     alt="hehe"/>
                                <span className="logo">Firebase Auth Demo</span>
                            </div>
                            {
                                this.state.signUp ?
                                    <SignUp />:
                                    <div className="loginForm">
                                        <div className="imgcontainer">
                                            <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" alt="Avatar" className="avatar"/>
                                        </div>
                                        <div className="container">
                                            <div><label><b>Username</b></label></div>
                                            <input className="emailInput"
                                                   type="text"
                                                   placeholder="Enter email"
                                                   name="email"
                                                   value={this.state.email}
                                                   onChange={this.changeHandler}
                                            />
                                            <div><label><b>Password</b></label></div>
                                            <input type="password"
                                                   className="pswdInput"
                                                   placeholder="Enter Password"
                                                   name="password"
                                                   value={this.state.password}
                                                   onChange={this.changeHandler}
                                            />
                                            <div className="login">
                                                <button className="loginButton" onClick={this.login}>Login</button>
                                                <button className="signInButton" onClick={this.signIn}>Sign Up</button>
                                                <button className="signInButton" onClick={this.googleSignIn}>Sign In with G+</button>
                                                <button className="signInButton" onClick={this.onAboutClick}>About Firebase</button>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                }


            </div>
        );
    }
}

export default Login;
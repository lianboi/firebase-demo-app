import React, { Component } from 'react';
import * as firebase from 'firebase'

class SignUp extends Component{
    constructor(){
        super();
        this.state ={
            email:'',
            password:'',
            confirmpassword:''
        }
    }

    register = () => {
        if(this.state.email === '' || this.state.password === '' || this.state.confirmpassword === ''){
            alert("Fields cannot be empty");
        }else if(this.state.password !== this.state.confirmpassword){
            alert(" Passwords are not identical")
        }
        else {
            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
            promise.catch(e => {
                console.log(e.message);
                alert(e.message)
            });
        }
    };

    reset = () => {
        this.setState({
            email: '',
            password: '',
            confirmpassword: ''
        });
    };

    changeHandler = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render(){
        return(
            <div className="login-form">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={ this.changeHandler } value={ this.state.email } />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={ this.changeHandler } value={ this.state.password } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Confirm Password</label>
                        <input type="password" name="confirmpassword" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" onChange={ this.changeHandler } value={ this.state.confirmpassword }/>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" />
                        Check me out
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={ this.register }>Submit</button>
                </div>    
            </div>
        );
    }
}

export default SignUp;
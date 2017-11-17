import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import * as firebase from 'firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import './bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from './components/About';
import Profile from './components/Profile';
import firebase from './firebase';

// const config = {
// 	apiKey: "AIzaSyAJxFK24Ejbh6cBV6jFOYGpLEUF-7TkP3w",
// 	authDomain: "fir-chat-app-2aa86.firebaseapp.com",
// 	databaseURL: "https://fir-chat-app-2aa86.firebaseio.com",
// 	projectId: "fir-chat-app-2aa86",
// 	storageBucket: "fir-chat-app-2aa86.appspot.com",
// 	messagingSenderId: "1050891722773"
// };

// firebase.initializeApp(config);

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      messages: {},
      login: false
    };
    this.db = firebase.database();
    this.ref = this.db.ref('chatrooms/room1');
    this.firebaseData();
    //this.addRoom = this.props.addRoom;
    this.handleChange = this.handleChange.bind(this);
    let thisApp = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        thisApp.setState({
          login: true
        });
      } else {
        // No user is signed in.
      }
    });
  }

  firebaseData () {
    let thisApp = this;
    this.ref.on('value', function (snapshot) {
      thisApp.setState({ messages: snapshot.val() || {} });
    });
    let db = this.db;
    db.ref('chatrooms/rooms').on('value', function (snapshot) {
      console.log('snapshot is....', snapshot);
      thisApp.setState({ chatrooms: snapshot.val() || [] });
    });
  }

  logOut () {
    firebase.auth().signOut();
    window.location.assign('/');
    console.log('logout..................');
  }

  addRoom (evt) {
    //add room button click
  }

  handleChange (evt) {
    this.setState({ value: evt.target.value });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header login={ this.state.login } logOut={ this.logOut }/>
          <div className='container'>
          <Route exact path='/' render={ (props) => (<Home logOut={ this.logOut } />) } />
          <Route exact path='/about' component={ About } />
          { !this.state.login ? <Route exact path='/sign-in' component={ Login } /> : '' }
          { !this.state.login ? <Route exact path='/sign-up' component={ SignUp } />: '' }
          <Route exact path='/chatroom/:roomkey' render={(props)=> <ChatRoom {...props} /> } />
          </div> 
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

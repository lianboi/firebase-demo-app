import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyAJxFK24Ejbh6cBV6jFOYGpLEUF-7TkP3w",
	authDomain: "fir-chat-app-2aa86.firebaseapp.com",
	databaseURL: "https://fir-chat-app-2aa86.firebaseio.com",
	projectId: "fir-chat-app-2aa86",
	storageBucket: "fir-chat-app-2aa86.appspot.com",
	messagingSenderId: "1050891722773"
};

firebase.initializeApp(config);

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      messages: {}
    };
    this.db = firebase.database();
    this.ref = this.db.ref('chatrooms/room1');
    this.firebaseData();
    //this.addRoom = this.props.addRoom;
    this.handleChange = this.handleChange.bind(this);
  }

  firebaseData () {
    let thisApp = this;
    this.ref.on('value', function (snapshot) {
      thisApp.setState({ messages: snapshot.val() || {} });
    });
  }

  addRoom (evt) {
    //add room button click
  }

  handleChange (evt) {
    this.setState({ value: evt.target.value });
  }

  sendMessage (evt) {
    let thisApp = this;
    thisApp.ref.push({ 
      time: firebase.database.ServerValue.TIMESTAMP,
      message: thisApp.state.value
    }).catch(function (err) {
      console.log('error updating message:', err);
    });
    this.inputBox.value = ""; 
    this.state.value = "";   
  }

  render() {
    let msgs = [];
    let messages = this.state.messages;
    Object.keys(this.state.messages || {}).forEach((key) => {
      msgs.push(<li key={ key }>{ messages[key].message }</li>)
    });
    return (
      <div className="App">
        <header className="App-header">
          Hello Newers!
        </header>
        <p className="App-intro">
          <strong> Your app config is:</strong><br/> {JSON.stringify(config)}
        </p>
        <p> 
          <button onClick={(e) => this.addRoom(e)}>add room</button>
        </p>
        <div className="chat-box">
          <ul>
            { msgs }
          </ul> 
        </div>
        <div>
          <input type="text" value={ this.state.value } onChange={ this.handleChange } ref={(input) => this.inputBox = input } />
          <button onClick={ (e) => this.sendMessage(e) }>send</button>           
        </div>
      </div>
    );
  }
}

export default App;

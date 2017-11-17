import React, { Component } from 'react';
import firebase from '../firebase';

class ChatRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
		let db = firebase.database();
		let thisApp = this;
		db.ref('/chatrooms'+props.match.roomkey).on('value', function (snapshot) {
			thisApp.setState({
				messages: snapshot.val()
			});
		});
	}
	render () {
		return (<div>{JSON.stringify(this.state.messages)}</div>);
	}
}

export default ChatRoom;
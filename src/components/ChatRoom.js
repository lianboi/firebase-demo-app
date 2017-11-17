import React, { Component } from 'react';
import firebase from '../firebase';

class ChatRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: {},
			newMessage: ''
		};
		this.props = props;
		let db = firebase.database();
		let thisApp = this;
		db.ref('/messages/'+props.match.params.roomkey).on('value', function (snapshot) {
			thisApp.setState({
				messages: snapshot.val()
			});
		});
		this.sendMessage = this.sendMessage.bind(this);
	}

	changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
	};
	
	sendMessage () {
		let db = firebase.database();
		db.ref('/messages/'+this.props.match.params.roomkey).push({
			message: this.state.newMessage,
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			user: {
				email: firebase.auth().currentUser.email,
				uid: firebase.auth().currentUser.uid
			}
		});
	}

	render () {
		let messages = [];
		console.log(this.state.messages);
		let thisApp = this;
		Object.keys(this.state.messages || {}).forEach(function(key, index) {
			console.log(key, index);
			let msg = thisApp.state.messages[key];
			console.log(msg);
			messages.push(<div key={index}><span>{msg.user.email}</span>:<br/><span>{msg.message}</span></div>)
		});
		return (
			<div className="col-md-12" style={{ margin: '0 auto'}}>
				<div className="col-md-6 col-sm-12">
						{ messages }
				</div>
				<div className="col-md-6 col-sm-12">
					<div className="form-group">
							<input 
								type="text"
								name="newMessage" 
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Room Name"
								onChange={ this.changeHandler }
								value={ this.state.newMessage }
							/>
							<p></p>
							<button type="submit" className="btn btn-primary" onClick={ this.sendMessage }>Send</button>
                    </div>
				</div>
			</div>
		);
	}
}

export default ChatRoom;
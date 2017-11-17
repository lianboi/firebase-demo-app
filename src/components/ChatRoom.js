import React, { Component } from 'react';
import firebase from '../firebase';

class ChatRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			newMessage: ''
		};
		console.log("props in chatrooms....", props);
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
		let thisApp = this;
		db.ref('/messages/'+thisApp.props.match.params.roomkey).push({
			message: this.state.newMessage
		});
	}

	render () {
		return (
			<div className="col-md-12" style={{ margin: '0 auto'}}>
				<div className="col-md-6 col-sm-12">
					{JSON.stringify(this.state.messages)}	
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
import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            chatrooms: [],
            roomname: ''
        };
    }

    componentDidMount() {
        let db = firebase.database();
        let thisApp = this;
        db.ref('/chatrooms').on('value', function (snapshot) {
            thisApp.setState({
                chatrooms: snapshot
            });
        });
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addRoom = () => {
        if (!this.state.roomname) {
            alert('room name cannot be empty');
            return false;
        }
        let db = firebase.database();
        db.ref('/chatrooms').push(this.state.roomname);
    }

    render () {
        let rooms = [];
        this.state.chatrooms.forEach((r) => {
            console.log("r.key is...", r.key);
            //rooms.push(<div>{r.val()}</div>)
            rooms.push(<div className="col-md-4" key={ r.key } ><Link to={ '/chatroom/'+ r.key } >{r.val()}</Link></div>);
        });
        return (
            <div className="col-md-12">
                <div className="col-md-12">
                    <p>chatrooms</p>
                    <div className="col-md-12" style={{ margin: '0 auto'}}>
                        { rooms }
                    </div>
                </div>
                <div className="col-md-6" style={{ margin: '0 auto'}}>
                     <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Room Name</label>
                        <input 
                            type="text"
                            name="roomname" 
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Room Name"
                            onChange={ this.changeHandler }
                            value={ this.state.roomname }
                        />
                        <p></p>
                        <button type="submit" className="btn btn-primary" onClick={ this.addRoom }>Add Room</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
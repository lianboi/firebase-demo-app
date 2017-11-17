import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            chatrooms: [],
            roomname: '',
            imageUploader:'',
            imageFile:'',
            imgUrl:''
        };
        firebase.auth().onAuthStateChanged(User => {
            if(User){
                this.setState({
                    user:User.providerData[0].email,
                    photo:User.providerData[0].photoURL,
                },()=>{console.log('user--',this.state.user,User)});
            }else{
                this.setState({
                    user:'',
                })
            }
        });
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

    onImageUploaderChange = (event) => {
        //let that = this;
        console.log("image uploader",event.target.value);

        let file = event.target.files[0];
        console.log('filename',file.name);
        this.setState({
            imgFileName: file.name
        })
        let storageRef = firebase.storage().ref('AppGallery/'+this.state.user+'/'+file.name);
        let task = storageRef.put(file);
        task.on('state_changed',(snapshot) => {
            console.log('snapshot value-- ',snapshot);
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({
                    imageFile: file,
                    imageUploader: percentage
                });
            },(error) =>{
                alert('error occuring during state changed',error);
            }/*,()=>{
            firebase.storage().ref('AppGallery/'+this.state.user+'/'+this.state.imgFileName).getDownloadURL().then(function(url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                    let blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.header({
                    Access-Control-Allow-Origin: *
                })
                xhr.send();

                // Or inserted into an <img> element:
                this.setState({imgUrl:url},()=>{console.log('imgUrl--',this.state.imgUrl)})
            }).catch(function(error) {
                // Handle any errors
            });
            }*/
        );

    };

    downloadImg = () => {
        firebase.storage().ref('AppGallery/'+this.props.user+'/'+this.state.imgFileName).getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                let blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element:
            this.setState({imgUrl:url})
        }).catch(function(error) {
            // Handle any errors
        });
    }

    render () {
        console.log('this.state-',this.state);
        let rooms = [];
        this.state.chatrooms.forEach((r) => {
            console.log("r.key is...", r.key);
            //rooms.push(<div>{r.val()}</div>)
            rooms.push(<div className="col-md-4" key={ r.key } ><Link to={ '/chatroom/'+ r.key } >{r.val()}</Link></div>);
        });
        return (
            <div className="col-md-12">
                <div className="col-md-12">
                    <div className="image-upload-div">
                        Upload an image:<input type="file"
                                                name=""
                                                accept="image/*"
                                                id="fileButton"
                                                ref="uploader"
                                                onChange={this.onImageUploaderChange.bind(this)}/><br/>

                        <progress value={this.state.imageUploader}
                                  max="100"
                                  id="uploader">{this.state.imageUploader}%</progress><br/>

                    </div>
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
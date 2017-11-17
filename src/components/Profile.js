import React, { Component } from 'react';
import firebase from '../firebase';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            imageUploader:'',
            imageFile:'',
            imgUrl:''
        };
    }

    componentWillMount(){
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

    render () {
        console.log('###',this.state);
        return (
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
            </div>
        )
    }
}

export default Profile;
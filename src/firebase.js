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

export default firebase;
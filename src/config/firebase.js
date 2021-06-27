import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyDdE-H-yzZKFZP_hXw_8NZc3jTDe4na0Xs',
	authDomain: 'react-app-curso-99c11.firebaseapp.com',
	projectId: 'react-app-curso-99c11',
	storageBucket: 'react-app-curso-99c11.appspot.com',
	messagingSenderId: '553053821500',
	appId: '1:553053821500:web:b5487568de64ae2ae1c139',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };

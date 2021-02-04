import * as firebase from 'firebase'
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDHh6wfzzc9xaWR-qatyEri53kuH6PxSVo",
    authDomain: "barter-system-91c00.firebaseapp.com",
    projectId: "barter-system-91c00",
    storageBucket: "barter-system-91c00.appspot.com",
    messagingSenderId: "977650822340",
    appId: "1:977650822340:web:061abcd9bb14ef88966d91"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
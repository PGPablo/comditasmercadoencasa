import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAmANwWOhCpdtn99NLVripfP1WZbv-tCQI",
    authDomain: "comiditasmercadoencasa-63f98.firebaseapp.com",
    databaseURL: "https://comiditasmercadoencasa-63f98.firebaseio.com",
    projectId: "comiditasmercadoencasa-63f98",
    storageBucket: "comiditasmercadoencasa-63f98.appspot.com",
    messagingSenderId: "768900633951",
    appId: "1:768900633951:web:f85a13a685708deb8c12ea",
    measurementId: "G-YX8HN2CJ5F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, firebase, db, storage}
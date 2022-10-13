import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBVksVe_PXtvDANva1pPwGwBjfDSdQf9B4",
  authDomain: "testlabel-94dfa.firebaseapp.com",
  projectId: "testlabel-94dfa",
  storageBucket: "testlabel-94dfa.appspot.com",
  messagingSenderId: "1029153695885",
  appId: "1:1029153695885:web:4e1a492dee6604f7f49ac4",
  measurementId: "G-0SVPB8BCNV"
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()

const timestamp = firebase.firestore.Timestamp
// Initialize Analytics and get a reference to the service
export {projectAuth, projectFirestore, timestamp}

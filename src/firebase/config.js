import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  //CONFIG OBJECT HERE

};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()

const timestamp = firebase.firestore.Timestamp
// Initialize Analytics and get a reference to the service
export {projectAuth, projectFirestore, timestamp}

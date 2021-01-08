import "firebase/app"
import firebase from 'firebase'
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUxeTGgltclAxvjiAeHiBtpY87IhNRxdo",
  authDomain: "fir-reactjs-upload.firebaseapp.com",
  databaseURL: "https://fir-reactjs-upload.firebaseio.com",
  projectId: "fir-reactjs-upload",
  storageBucket: "fir-reactjs-upload.appspot.com",
  messagingSenderId: "964837579438",
  appId: "1:964837579438:web:367b104cbe3f5bf5b4ab3f",
  measurementId: "G-XLGSVMGV4H",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };

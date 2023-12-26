// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6e3t_9fFOpvrJL4fRXBAsrDlyI6C0M5Y",
    authDomain: "mad-project-c5006.firebaseapp.com",
    projectId: "mad-project-c5006",
    storageBucket: "mad-project-c5006.appspot.com",
    messagingSenderId: "990838553838",
    appId: "1:990838553838:web:e3430be7da1e77ccd3c7ff",
    measurementId: "G-NBKMC3CGYK",
    databaseURL: "https://mad-project-c5006-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default app;
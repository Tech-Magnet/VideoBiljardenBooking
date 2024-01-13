/*import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";*/

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxv9AQ5b9Ig9HnCAzxfLcHfdojZiGMyNQ",
    authDomain: "videobiljardenorebrosite.firebaseapp.com",
    databaseURL: "https://videobiljardenorebrosite-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "videobiljardenorebrosite",
    storageBucket: "videobiljardenorebrosite.appspot.com",
    messagingSenderId: "1042889427467",
    appId: "1:1042889427467:web:bbbedfe2ce5eea96d8d50e",
    measurementId: "G-FPJBGKX7R0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if(user){ //Logged In
        window.location.pathname = "admin/";
    }
});

const loginEmailPassword = async () => {

    console.log("Logging In...");

    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;

    if(!loginEmail.includes("@")){
        loginEmail = loginEmail + "@orebrobiljarden.se";
    }

    if(loginPassword < 6){
        loginPassword = loginPassword + "123";
    }

    console.log(loginEmail);
    console.log(loginPassword);

    

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }catch (error){
        console.error("An Error Occured", error);
        document.getElementById('login-email').style.borderColor = "#ff0000";
        document.getElementById('login-password').style.borderColor = "#ff0000";
        document.getElementById('status-text').innerText = "Wrong Username/E-mail or Password";
        document.getElementById('status-text').style.color = "#ff0000";
        document.getElementById('status-text').style.display = "block";
    }
}

document.getElementById('btnLogin').addEventListener("click", loginEmailPassword);



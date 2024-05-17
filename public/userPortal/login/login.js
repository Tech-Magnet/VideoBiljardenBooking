import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getFirestore, collection, getDocs, doc, query, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

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
const firestore = getFirestore(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcgzkcpAAAAAGBLYci24KiGkfRRYmUbAW58_84W'),
  isTokenAutoRefreshEnabled: true
});

onAuthStateChanged(auth, (user) => {
  if(user){ //Logged In
    window.location.pathname = "";
  }
});

const loginEmailPassword = async () => {

  let loginEmail = document.getElementById('login-email').value;
  let loginPassword = document.getElementById('login-password').value;

  if(!loginEmail.includes("@")){
    
    const userRef = collection(firestore, "users");

    // Finds missing email from phone refence
    const q = query(userRef, where("phone", "==", loginEmail));

    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      loginEmail = doc.data().email;
    });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }catch (error){
    document.getElementById('login-email').style.borderColor = "#ff0000";
    document.getElementById('login-password').style.borderColor = "#ff0000";
    document.getElementById('status-text').innerText = "Wrong Username/E-mail or Password";
    document.getElementById('status-text').style.color = "#ff0000";
    document.getElementById('status-text').style.display = "block";
  }
}

document.getElementById('btnLogin').addEventListener("click", loginEmailPassword);



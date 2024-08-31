import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getFirestore, collection, getDocs, doc, query, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

const firebaseConfig = {
  /*API KEYS*/
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
    
    logEvent(analytics, 'user_logged_in', { 
      user_logged_in: true
    });

  }catch (error){
    document.getElementById('login-email').style.borderColor = "#ff0000";
    document.getElementById('login-password').style.borderColor = "#ff0000";
    document.getElementById('status-text').innerText = "Wrong Username/E-mail or Password";
    document.getElementById('status-text').style.color = "#ff0000";
    document.getElementById('status-text').style.display = "block";
  }
}

document.getElementById('btnLogin').addEventListener("click", loginEmailPassword);



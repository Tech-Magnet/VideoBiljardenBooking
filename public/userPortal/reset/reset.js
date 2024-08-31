import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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

const loginEmailPassword = async () => {

  let loginEmail = document.getElementById('login-email').value;

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
    const userCredential = await sendPasswordResetEmail(auth, loginEmail).then(() => {
      document.getElementById('login-email').style.borderColor = "#00ff00";
      document.getElementById('status-text').innerText = "Ett Lösenords återställing melj har skickets till din e-post";
      document.getElementById('status-text').style.color = "#ff0000";
      document.getElementById('status-text').style.display = "block";
    });

    logEvent(analytics, 'user_reset_password', { 
      user_reset_password: true
    });
    
  }catch (error){
    document.getElementById('login-email').style.borderColor = "#ff0000";
    document.getElementById('status-text').innerText = "Email eller Telefonnummer finns inte registrerat, Vänligen skapa ett nytt konto";
    document.getElementById('status-text').style.color = "#ff0000";
    document.getElementById('status-text').style.display = "block";
  }
}

document.getElementById('btnLogin').addEventListener("click", loginEmailPassword);



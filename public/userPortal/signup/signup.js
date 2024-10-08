import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

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

const signUpEmailPassword = async () => {

  let loginEmail = document.getElementById('login-email').value;
  let loginPhone  = document.getElementById('login-phone').value.replace('+46', '0');
  let loginPassword = document.getElementById('login-password').value;
  let loginName = document.getElementById('login-name').value;

  if(!loginEmail.includes('@') || loginPhone.length != 10 || loginPassword.length < 4 ){

    console.log(loginEmail.includes('@'));
    console.log(loginPhone.length != 10);
    console.log(loginPassword.length > 4);


    document.getElementById('login-email').style.borderColor = "#ff0000";
    document.getElementById('login-phone').style.borderColor = "#ff0000";
    document.getElementById('login-password').style.borderColor = "#ff0000";
    document.getElementById('status-text').innerText = "Ogiltig Email/Telefonnummer eller L&oumlsenord";
    document.getElementById('status-text').style.color = "#ff0000";
    document.getElementById('status-text').style.display = "block";
    return;
    
  }

  const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword).then(async(userCredential) => {
    await sendEmailVerification(userCredential.user);
    const userDocRef = doc(firestore, "users", userCredential.user.uid);
    await setDoc(userDocRef, {
      email: loginEmail,
      isAdmin: false,
      name: loginName,
      phone: loginPhone
    });

    logEvent(analytics, 'user_sign_up', { 
      user_sign_up: true
    });
    
  }).catch((error) => {
    document.getElementById('login-email').style.borderColor = "#ff0000";
    document.getElementById('login-phone').style.borderColor = "#ff0000";
    document.getElementById('login-password').style.borderColor = "#ff0000";
    document.getElementById('status-text').innerText = "Kunnde inte ska konto, var god att testa igen senare :(";
    document.getElementById('status-text').style.color = "#ff0000";
    document.getElementById('status-text').style.display = "block";
    console.error("Could not create account!")
  });
}

document.getElementById('btnLogin').addEventListener("click", signUpEmailPassword);

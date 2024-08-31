import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    /*API KEYS*/
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

    let loginEmail = document.getElementById('login-email').value;
    let loginPassword = document.getElementById('login-password').value;

    if(!loginEmail.includes("@")){
        loginEmail = loginEmail + "@orebrobiljarden.se";
    }

    if(loginPassword.length < 6){
        loginPassword = loginPassword + "123";
    }

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



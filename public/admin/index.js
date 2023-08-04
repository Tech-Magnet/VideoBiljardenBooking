import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCXcSxONLNgKtlBO2N7sCoPaNjwvOJRKJw",
    authDomain: "techmagnet-de444.firebaseapp.com",
    projectId: "techmagnet-de444",
    storageBucket: "techmagnet-de444.appspot.com",
    messagingSenderId: "614054724902",
    appId: "1:614054724902:web:6c1ac0d1052f6052862de7",
    measurementId: "G-QPRV2F0T7Y"
});
const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {
    const loginEmail = document.getElementById('txtName').value + "@orebrobiljarden.se";
    console.log(loginEmail);
    const loginPassword = document.getElementById('txtPassword').value + "123";
    console.log(loginPassword);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }catch (error){
        console.log(error);
    }    
}

document.getElementById('btnLogin').addEventListener("click", loginEmailPassword);


onAuthStateChanged(auth, user => {
    if (user != null){
        console.log("You are singed in!");
            console.log("successfully logged in");
            window.location.href='index2.html';
        //document.getElementById('locked').style.display = 'none';
        //document.getElementById('unlocked').style.display = 'inline';
    }else{
        if (window.location.href == 'index2.html'){
            console.log("You are not singed in");
            window.location.href='index.html';
        }
        //document.getElementById('locked').style.display = 'inline';
        //document.getElementById('unlocked').style.display = 'none';
    }
});
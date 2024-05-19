import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, getDoc, doc, getDocs, collection, where, orderBy, query } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";

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
const firestore = getFirestore(app);
const auth = getAuth(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcgzkcpAAAAAGBLYci24KiGkfRRYmUbAW58_84W'),
  isTokenAutoRefreshEnabled: true
});

window.onload = () => {
  if(auth.currentUser != null){ //Logged Not In
    window.location.pathname = "userPortal/login";
    return;
  }
}
  
onAuthStateChanged(auth, async (user) => {
  
  const userDoc = await getDoc(doc(firestore, "users", user.uid));
  document.getElementById('spanUserWelcome').innerText = userDoc.data().name.split(" ")[0];

  const bookingsRef = collection(firestore, "bookings");

  // Create a query against the collection.
  const bookingsByUser = query(bookingsRef, where("phone", "==", userDoc.data().phone), orderBy("week"), orderBy("sort"));
  const querySnapshot = await getDocs(bookingsByUser);

  querySnapshot.forEach((doc) => {

    let time = doc.data().time.toString();
    let endtime = doc.data().endtime.toString();

    let cardBase = document.createElement("div");
    cardBase.classList.add("bookingCard");

    let dayDisplay = document.createElement("h3");
    dayDisplay.innerHTML = "Dag: <span>" + doc.data().day + "</span>";

    let weekDisplay = document.createElement("h3");
    weekDisplay.innerHTML = "Vecka: <span>" + doc.data().week +"</span>";

    let timeDisplay = document.createElement("h3");
    timeDisplay.innerHTML = "Tid: <span>" + time.replace(".5", ".30") + "</span> - <span>" + endtime.replace(".5", ".30") + "</span>";

    let tableDisplay = document.createElement("h3");
    tableDisplay.innerHTML = "Bord <span>" + doc.data().table + "</span>";

    cardBase.appendChild(dayDisplay);
    cardBase.appendChild(weekDisplay);
    cardBase.appendChild(timeDisplay);
    cardBase.appendChild(tableDisplay);

    document.getElementById('bookingContainer').appendChild(cardBase);
  });
});

const logout = async () => {

  try {
    const userCredential = await signOut(auth);
    console.log("SUCCESSFULLY LOGGED OUT");
    window.location.pathname = "";
  }catch (error){
    console.error("An Error Occured", error);
  }
}

document.getElementById('btnLogOut').addEventListener("click", logout);

/*
<div class="bookingCard">
  <h3>Dag: <span id="spanDay">$day</span></h3>
  <h3>Vecka: <span id="spanWeek">$week</span></h3>
  <h3>Tid: <span id="spanTime">$time</span> - <span>$endtime</span></h3>
  <h3>Bord <span id="spanTable">2</span></h3>
</div>
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getFirestore, getDoc, doc, getDocs, deleteDoc, collection, where, orderBy, query } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js";
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
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const Performance = getPerformance(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcgzkcpAAAAAGBLYci24KiGkfRRYmUbAW58_84W'),
  isTokenAutoRefreshEnabled: true
});

onAuthStateChanged(auth, async (user) => {
  if(user){

    document.getElementById('form-phone').style.display = "none";
    document.getElementById('form-unbook-btn').style.display = "none";

    document.getElementById('spanUserLoggedIn').innerText = user.email;
    document.getElementById('loggedInMessage').style.display = "block";

    reloadResults();
  }
});

async function reloadResults(){

  document.getElementById('bookingContainer').innerHTML = "";

  let phone = "";
  
  if(!auth.currentUser) {
    phone = document.getElementById('txtPhone').value;
  }else{
    let userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid))
    phone = userDoc.data().phone;
  }
  
  const bookingsRef = collection(firestore, "bookings");
  
  // Create a query against the collection.
  const bookingsByUser = query(bookingsRef, where("phone", "==", phone), orderBy("week"), orderBy("sort"));
  const querySnapshot = await getDocs(bookingsByUser);

  querySnapshot.forEach((doc) => {

    let time = doc.data().time.toString();
    let endtime = doc.data().endtime.toString();

    let cardBase = document.createElement("div");
    cardBase.classList.add("bookingCard");
    cardBase.id = doc.id;
    cardBase.setAttribute("onClick", "window.removeBooking('" + doc.id + "', " + doc.data().time + ", " + doc.data().endtime + ", '" + doc.data().day + "', '" + doc.data().week + "', " + doc.data().table + ")");

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

}

export async function remove_booking(id, time, end_time, day, week, table) {

  logEvent(analytics, 'booking_removed', {
    booking_removed: 'true'
  });

  await deleteDoc(doc(firestore, "bookings", id));
  reloadResults();

  //Remove From Schedule Board (RTDB)

  let timeID; // <-- Parent ID


  //Find and Clear Parent
  onValue(ref(database, "schedule"), (snapshot) => {

    const data = snapshot.val();
    const entries = [];

    for (const key in data) {
      const entry = {
        namef: key,
        dataf: data[key]
      };
      entries.push(entry); 
    }

    for (let i = 0; i < entries.length; i++ ){

      let key = entries[i].namef;

      let time_db = entries[i].dataf.time;
      let end_time_db = entries[i].dataf.endTime;
      let day_db = entries[i].dataf.day;
      let week_db = entries[i].dataf.week;
      let table_db = entries[i].dataf.table;

      

      if(time_db == time && end_time_db == end_time && day_db == day && week_db == week && table_db == table){

        timeID = key;

        set(ref(database, "/schedule/" + key), {
          time: null,
          endTime: null,
          day: null,
          week: null,
          table: null
        });
      }
    }
  

    //Find and clear all time cards based on Parent ID
    onValue(ref(database, "schedule/time"), (snapshot) => {

      const data = snapshot.val();
      const entries = [];

      for (const key in data) {
        const entry = {
          namef: key,
          dataf: data[key]
        };
        entries.push(entry); 
      }

      for (let i = 0; i < entries.length; i++ ){
      
        let key = entries[i].namef;
        let id_db = entries[i].dataf.id;


        if(id_db == timeID){
        
          set(ref(database, "/schedule/time/" + key), {
            id: null,
            day: null,
            time: null,
            week: null,
            table: null
          });
        }
      }
    });
  });
}

document.getElementById('unbook-btn').addEventListener("click", reloadResults);
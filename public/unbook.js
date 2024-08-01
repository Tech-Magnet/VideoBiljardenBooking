import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";

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
const Performance = getPerformance(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LcgzkcpAAAAAGBLYci24KiGkfRRYmUbAW58_84W'),
    isTokenAutoRefreshEnabled: true
});

function remove_booking(){

  const phone_in = document.getElementById('txtPhone').value;
  const date_in = document.getElementById('txtDay').value;
  const week_in = document.getElementById('txtWeek').value;
  const table_in = document.getElementById('txtTable').value;

  console.log("Deleting Booking", phone_in);

  logEvent(analytics, 'booking_removed', {
    booking_made: 'false',
    day: date_in,
    table: table_in
  });


  //Admin
  console.log("Deleting Admin Entry");
  
  const dbref_admin = ref(database, "admin");

onValue(dbref_admin, (snapshot) => {

  const data = snapshot.val();
  const entries = [];

  for (const key in data) {
    const entry = {
        namef: key,
        dataf: data[key]
      };
    entries.push(entry); 
  }

  for (var i = 0; i < entries.length; i++ ){

    let key = entries[i].namef;
    let phone_db = entries[i].dataf.phone;
    let date_db = entries[i].dataf.day;
    let table_db = entries[i].dataf.table;

    let tmp_table_in = table_in;

    if(week_in == "n"){
      tmp_table_in = tmp_table_in + "_c";
    }

    if(phone_db == phone_in && date_db == date_in && table_db == tmp_table_in){

      set(ref(database, "/admin/" + key), {
        day: null,
        endtime: null,
        length: null,
        name: null,
        phone: null,
        table: null,
        time: null
      });
      console.log("TIME UNBOOKED FROM ADMIN", phone_in, date_in, table_in, week_in);
    }else{
      console.error("En error occured or no admin entry found")
    }
  }
});


  //Booking
  const dbref_booking = ref(database, "booking");

  onValue(dbref_booking, (snapshot) => {

    const data = snapshot.val();
    const entries = [];

    for (const key in data) {
      const entry = {
          namef: key,
          dataf: data[key]
        };
      entries.push(entry); 
    }

    for (var i = 0; i < entries.length; i++ ){

      let key = entries[i].namef;
      let phone_db = entries[i].dataf.phone;
      let date_db = entries[i].dataf.day;
      let table_db = entries[i].dataf.table;

      let tmp_table_in = table_in;

      if(week_in == "n"){
        tmp_table_in = tmp_table_in + "_c";      
      }

      if(phone_db == phone_in && date_db == date_in && table_db == tmp_table_in){

        set(ref(database, "/booking/" + key), {
          day: null,
          name: null,
          phone: null,
          table: null,
          time: null
        });
        console.log("TIME UNBOOKED FROM BOOKING", phone_in, date_in, table_in, week_in);
      }
    }
  });

  window.location.pathname == "";
}

document.getElementById('unbook-btn').addEventListener("click", remove_booking);
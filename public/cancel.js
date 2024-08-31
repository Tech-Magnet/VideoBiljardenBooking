import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-performance.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-check.js";

const firebaseConfig = {
    /*API KEYS*/
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
  
  const db_ref_admin = ref(database, "admin");

onValue(db_ref_admin, (snapshot) => {

  const data = snapshot.val();
  const entries = [];

  for (const key in data) {
    const entry = {
        name: key,
        data: data[key]
      };
    entries.push(entry); 
  }

  for (let i = 0; i < entries.length; i++ ){

    let key = entries[i].name;
    let phone_db = entries[i].data.phone;
    let date_db = entries[i].data.day;
    let table_db = entries[i].data.table;

    let tmp_table_in = table_in;

    if(week_in === "n"){
      tmp_table_in = tmp_table_in + "_c";
    }

    if(phone_db === phone_in && date_db === date_in && table_db === tmp_table_in){

      set(ref(database, "/admin/" + key), {
        day: null,
        endTime: null,
        length: null,
        name: null,
        phone: null,
        table: null,
        time: null
      });
      console.log("TIME UNBOOKED FROM ADMIN", phone_in, date_in, table_in, week_in);
    }else{
      console.error("En error occurred or no admin entry found");
    }
  }
});


  //Booking
  const db_ref_booking = ref(database, "booking");

  onValue(db_ref_booking, (snapshot) => {

    const data = snapshot.val();
    const entries = [];

    for (const key in data) {
      const entry = {
          name: key,
          data: data[key]
        };
      entries.push(entry); 
    }

    for (let i = 0; i < entries.length; i++ ){

      let key = entries[i].name;
      let phone_db = entries[i].data.phone;
      let date_db = entries[i].data.day;
      let table_db = entries[i].data.table;

      let tmp_table_in = table_in;

      if(week_in === "n"){
        tmp_table_in = tmp_table_in + "_c";
      }

      if(phone_db === phone_in && date_db === date_in && table_db === tmp_table_in){

        set(ref(database, "/booking/" + key), {
          day: null,
          name: null,
          phone: null,
          table: null,
          time: null
        });
        console.log("TIME UNBOOKED FROM BOOKING", phone_in, date_in, table_in, week_in);
        sessionStorage.setItem("lock", "0");
        document.getElementById("status_p").innerText = "Bokning Borttagen";
      }
    }
  });
}

function goBack() {
  console.log(sessionStorage.getItem("lock") === "0");
  
  if(sessionStorage.getItem("lock") === "0"){
    window.location.pathname = "";
  }else{
    console.log("ERROR");
  }
}

document.getElementById('cancel-btn').addEventListener("click", remove_booking);
document.getElementById('back-btn').addEventListener("click", goBack);

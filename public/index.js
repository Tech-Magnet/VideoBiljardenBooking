import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
//import { getDatabase, ref, push, set, onValue, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getFirestore, addDoc, collection, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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
//const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const Performance = getPerformance(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcgzkcpAAAAAGBLYci24KiGkfRRYmUbAW58_84W'),
  isTokenAutoRefreshEnabled: true
});

onAuthStateChanged(auth, (user) => {
  if(user) {
    document.getElementById('loggedInMessage').style.display = "block";
    document.getElementById('spanUserLoggedIn').innerText = user.email;
    document.getElementById('form-name').style.display = "none";
    document.getElementById('form-phone').style.display = "none";
    document.getElementById('form-email').style.display = "none";
  }
});

const TimeArr =  [];
const DayArr = [];
const TableArr = [];

function checkIfExixt(day, time, table) {

  let found = false;
  let CheckTime = time;

  for(let i = 0; i < DayArr.length; i++) {
    if (DayArr[i] == day && TimeArr[i] == CheckTime && TableArr[i] == table){
      console.log("SAME DATA AS ON FILE");
      found = true;
      return true;
    }
  }

  if(!found) {//If not find matching data in the database return false to symbolice that this time is avalibe
    return false;
  }
}



//WRITE TO DB
  
// Add an event listener to the form submit
document.getElementById("bookingForm").addEventListener("submit", async function  (event) {
  event.preventDefault();

  // Get the data from the input field
  let name = document.getElementById("txtName").value;
  let phone = document.getElementById("txtPhone").value;
  let day_raw = document.getElementById("txtDay").value;
  let time = parseFloat(document.getElementById("txtTime").value);
  let length = parseFloat(document.getElementById("txtLength").value);
  let table = document.getElementById("txtTable").value;
  let week = document.getElementById('txtWeek').value;
  let end_c = length / 2 
  let endtime = time + end_c;
  let length2 = length / 2;

  let day = day_raw.split(" ")[0]
  let sort = day_raw.split(" ")[1]

  let extraTime;
  if (day == "Måndag" || day == "Tisdag" || day == "Onsdag" || day == "Torsdag" || day == "Söndag") {
    extraTime = false;
  }else if(day == "Fredag" || day == "Lördag"){
    extraTime = true;
  }

  if(!auth.currentUser){
    if(name.length < 2){
      document.getElementById('txtName').style.borderColor = '#ff0000';
      alert("Ogiltigt Namn");
      return;
    }

    if(phone.length != 10){
      document.getElementById('txtPhone').style.borderColor = '#ff0000';
      alert("Ogiltight Telefon Nummer");
      return;
    }
  }

  if (extraTime == false){
    if (time == "13.0" || time == "13.5" || time == "14.0" || time == "14.5" || endtime >= 25) {
      alert("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig");
      console.log("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x01");
      return;
    }
  }else if (extraTime == true) {
    if(endtime >= 26){
      alert("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig");
      console.log("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x02");
      return;
    }
  }

  let timeSnapshot = time;

  for(let i = 0; i < length; i++){
    if(checkIfExixt(day, timeSnapshot, table) == true){
      alert("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig");
      console.error("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x03");
      return;
    }else{
      timeSnapshot = timeSnapshot + 0.5;
    }
  }

  logEvent(analytics, 'booking_made', {
    booking_made: 'true',
    name: name,
    day: day,
    table: table,
    length: length,
    logged_in: auth.currentUser != null
  });

  //const newPostKey_admin = push(child(ref(database), "/admin")).key;

  /*set(ref(database, "/admin/" + newPostKey_admin), {
    name: name,
    phone: phone,
    day: day,
    time: time,
    table: table,
    length: length2,
    endtime: endtime
  });*/

  if(auth.currentUser){
    console.log(auth.currentUser)

    let userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid))

    await addDoc(collection(firestore, "bookings"), {
      day: day,
      email: auth.currentUser.email,
      endtime: parseFloat(endtime),
      length: parseFloat(length2),
      name: userDoc.data().name,
      phone: userDoc.data().phone,
      sort:  sort,
      table: parseInt(table),
      time: parseFloat(time),
      week: week
    })
  }else{
    await addDoc(collection(firestore, "bookings"), {
      day: day,
      email: document.getElementById('txtEmail').value,
      endtime: parseFloat(endtime),
      length: parseFloat(length2),
      name: name,
      phone: phone,
      sort: parseInt(sort),
      table: parseInt(table),
      time: parseFloat(time) ,
      week: week
    }).then(() => {
      console.log("Documant Successfully Added");
    }).catch((error) => {
      console.error("An error occured ", error);
      alert(error);
    })
  }



  /*for(var i = 0; i < length; i++){

    // Write the data to the database
    const newPostKey_booking = push(child(ref(database), "/booking")).key;

      set(ref(database, "/booking/" + newPostKey_booking), {
        day: day,
        time: time,
        table: table
      });

    time = time + 0.5;
  }*/

  console.log("DATA INSERTED");
  document.getElementById('Status_p').innerText = 'Bokning tillagd';

  // Clear the input field after submitting
  document.getElementById("txtName").value = "";
  document.getElementById("txtPhone").value = "";
});




//READ FROM DATABASE

/*const dbref = ref(database, "booking");

onValue(dbref, (snapshot) => {

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

    if(entries[i].dataf.table == 'Bord_1'){
      var ID_BUILD = "TT_1_" + entries[i].dataf.time + "_" + entries[i].dataf.day;
      document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
    }else if(entries[i].dataf.table == 'Bord_2'){
      var ID_BUILD = "TT_2_" + entries[i].dataf.time + "_" + entries[i].dataf.day;
      document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
    }else if(entries[i].dataf.table == 'Bord_3'){
      var ID_BUILD = "TT_3_" + entries[i].dataf.time + "_" + entries[i].dataf.day;
      document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
    }else if(entries[i].dataf.table == 'Bord_1_c'){
      var ID_BUILD = "TT_1_" + entries[i].dataf.time + "_" + entries[i].dataf.day + "_c";
      document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
    }else if(entries[i].dataf.table == 'Bord_2_c'){
      var ID_BUILD = "TT_2_" + entries[i].dataf.time + "_" + entries[i].dataf.day + "_c";
      document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
    }else if(entries[i].dataf.table == 'Bord_3_c'){
      var ID_BUILD = "TT_3_" + entries[i].dataf.time + "_" + entries[i].dataf.day + "_c";
      document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
    }

    TimeArr.push(entries[i].dataf.time);
    DayArr.push(entries[i].dataf.day);
    TableArr.push(entries[i].dataf.table);
  }
});*/
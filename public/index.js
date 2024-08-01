import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAnalytics, logEvent} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { child, getDatabase, onValue, push, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {getPerformance} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js";
import {initializeAppCheck, ReCaptchaV3Provider} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";

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

const TimeArr = [];
const DayArr = [];
const TableArr = [];

function checkIfExist(day, time, table) {

    let found = false;
    for (let i = 0; i < DayArr.length; i++) {

        if (DayArr[i] === day && TimeArr[i] == time && TableArr[i] === table) {
            console.log("SAME DATA AS ON FILE");
            found = true;
            return true;
        }
    }

    if (!found) {//If not find matching data in the database return false to symbolic that this time is avalibe
        return false;
    }
}


//WRITE TO DB

// Add an event listener to the form submit
document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the data from the input field
    var name = document.getElementById("txtName").value;
    var phone = document.getElementById("txtPhone").value;
    var day = document.getElementById("txtDay").value;
    var time = parseFloat(document.getElementById("txtTime").value);
    var length = parseFloat(document.getElementById("txtLength").value);
    var table = document.getElementById("txtTable").value;
    var week = document.getElementById('txtWeek').value;
    var end_c = length / 2
    var endtime = time + end_c;
    var length2 = length / 2;


    let extraTime;
    if (day === "mon" || day === "tis" || day === "ons" || day === "tor" || day === "son") {
        extraTime = false;
    } else if (day === "fre" || day === "lor") {
        extraTime = true;
    }
    //adding the suffix to the table entry to symbolise that its for next week
    if (week === 'n') {
        table = table + "_c";
    }

    if (extraTime === false) {
        if (time === "13.0" || time === "13.5" || time === "14.0" || time === "14.5" || endtime >= 25) {
            alert("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig");
            console.log("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x01");
            return;
        }
    } else if (extraTime === true) {
        if (endtime >= 26) {
            alert("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig");
            console.log("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x02");
            return;
        }
    }

    if (name.length < 2) {
        document.getElementById('txtName').style.borderColor = '#ff0000';
        alert("Ogiltigt Namn");
        return;
    }

    if (phone.length !== 10) {
        document.getElementById('txtPhone').style.borderColor = '#ff0000';
        alert("Ogiltight Telefon Nummer");
        return;
    }

    var time_t = time;

    for (let i = 0; i < length; i++) {
        if (checkIfExist(day, time_t, table) === true) {
            alert("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig");
            console.log("Tyv&aumlrr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x03");
            return;
        } else {
            time_t = time_t + 0.5;
        }
    }

    logEvent(analytics, 'booking_made', {
        booking_made: 'true',
        name: name,
        day: day,
        table: table,
        length: length
    });

    const newPostKey_admin = push(child(ref(database), "/admin")).key;

    set(ref(database, "/admin/" + newPostKey_admin), {
        name: name,
        phone: phone,
        day: day,
        time: time,
        table: table,
        length: length2,
        endtime: endtime
    });

    console.log("Booking Added to admin table");

    for (var i = 0; i < length; i++) {

        // Write the data to the database
        const newPostKey_booking = push(child(ref(database), "/booking")).key;

        set(ref(database, "/booking/" + newPostKey_booking), {
            name: name,
            phone: phone,
            day: day,
            time: time,
            table: table
        });

        time = time + 0.5;
    }
    console.log("DATA INSERTED");
    document.getElementById('Status_p').innerText = 'Bokning tillagd';

    // Clear the input field after submitting
    document.getElementById("txtName").value = "";
    document.getElementById("txtPhone").value = "";
});


//READ FROM DATABASE

const dbref = ref(database, "booking");

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


    for (var i = 0; i < entries.length; i++) {

        if (entries[i].dataf.table === 'Bord_1') {
            let ID_BUILD = "TT_1_" + entries[i].dataf.time + "_" + entries[i].dataf.day;
            document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
        } else if (entries[i].dataf.table === 'Bord_2') {
            let ID_BUILD = "TT_2_" + entries[i].dataf.time + "_" + entries[i].dataf.day;
            document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
        } else if (entries[i].dataf.table === 'Bord_3') {
            let ID_BUILD = "TT_3_" + entries[i].dataf.time + "_" + entries[i].dataf.day;
            document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
        } else if (entries[i].dataf.table === 'Bord_4') {
            let ID_BUILD = "TT_4_" + entries[i].dataf.time + "_" + entries[i].dataf.day;
            document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
        } else if (entries[i].dataf.table === 'Bord_1_c') {
            let ID_BUILD = "TT_1_" + entries[i].dataf.time + "_" + entries[i].dataf.day + "_c";
            document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
        } else if (entries[i].dataf.table === 'Bord_2_c') {
            let ID_BUILD = "TT_2_" + entries[i].dataf.time + "_" + entries[i].dataf.day + "_c";
            document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
        } else if (entries[i].dataf.table === 'Bord_3_c') {
            let ID_BUILD = "TT_3_" + entries[i].dataf.time + "_" + entries[i].dataf.day + "_c";
            document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
        } else if (entries[i].dataf.table === 'Bord_4_c') {
            let ID_BUILD = "TT_4_" + entries[i].dataf.time + "_" + entries[i].dataf.day + "_c";
            document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
        }

        TimeArr.push(entries[i].dataf.time);
        DayArr.push(entries[i].dataf.day);
        TableArr.push(entries[i].dataf.table);
    }
});
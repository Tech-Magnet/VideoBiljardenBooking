import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getFirestore, getDoc, doc, collection, query, where, orderBy, getDocs} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js";

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
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const Performance = getPerformance(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcgzkcpAAAAAGBLYci24KiGkfRRYmUbAW58_84W'),
  isTokenAutoRefreshEnabled: true
});


onAuthStateChanged(auth, async (user) => {
  if(user){//Logged in
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    if(userDoc.data().isAdmin == true){
      document.getElementById('Admin-Div').style.display = "block";
    }
  }else{ //Not Logged In
    window.location.pathname = "admin/login/";
  }
});

const logout = async () => {

  try {
    const userCredential = await signOut(auth);
    console.log("SUCCESSFULLY LOGGED OUT");
    window.location.reload();
  }catch (error){
    console.error("An Error Occured", error);
  }
}

function remove_member(phoneToDelete){

    const dbref = ref(database, "members");

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

        let key = entries[i].namef;
        let data = entries[i].dataf.phone;

        if(data == phoneToDelete){

          set(ref(database, "/members" + '/' + key), {
            name: null,
            phone: null,
            next: null,
            last: null
          });
          console.log("MEMBER DELETED");
          window.reload();
        }
      }
    });
}

const AddMember = async () => {
  console.log("Adding New Member...");
  var name_m = document.getElementById('member_name').value;
  var phone_m = document.getElementById('member_phone').value;
  var last = document.getElementById('member_last_payment').value;
  var next = document.getElementById('member_next_payment').value;

  next = parseInt(next);

  if (name_m == "" || phone_m == ""){
    alert("Namn och Tel nr måste vara ifyllda");
    console.log("Data Transaction Cancelled");
    return;
  }

  if(phone_m.length != 10 || name_m < 2){
    alert("Ogilight Telefon Nummer eller Namn");
    console.log("Data Transaction Cancelled");
  }

  // Get the current date
  var currentDate;

  if(last == ""){
    currentDate = new Date();
  }else{
    currentDate = new Date(last);
  }

  // Calculate the next month's date
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(currentDate.getMonth() + next);

  // Handle cases where the day of the next month might not exist (e.g., Jan 31st to Feb 28th/29th)
  if (currentDate.getDate() > nextMonth.getDate()) {
      nextMonth.setDate(0); // This will set the date to the last day of the previous month
  }

  var next_m = nextMonth.toISOString().split('T')[0];
  var last_m = currentDate.toISOString().split('T')[0];

  //var next = current_date;
  console.log(name_m);
  console.log(phone_m);

  const newPostKey = push(child(ref(database), "/members")).key;

  set(ref(database, "/members" + '/' + newPostKey), {
    name: name_m,
    phone: phone_m,
    next: last_m,
    last: next_m
  });

  console.log("Member Added");
  window.reload();
}

document.getElementById('btnCreate_member').addEventListener("click", AddMember);


window.onload = async () => {

  //Week 1
  let tableBody1 = document.querySelector(".tb_1");//MONDAY
  let tableBody2 = document.querySelector(".tb_2");//TUESDAY
  let tableBody3 = document.querySelector(".tb_3");//WEDNESDAY
  let tableBody4 = document.querySelector(".tb_4");//THURSDAY
  let tableBody5 = document.querySelector(".tb_5");//FRIDAY
  let tableBody6 = document.querySelector(".tb_6");//SATURDAY
  let tableBody7 = document.querySelector(".tb_7");//SUNDAY
  
  /*
  //Week 2
  let tableBody1_2 = document.querySelector(".tb_1_2");//MONDAY
  let tableBody2_2 = document.querySelector(".tb_2_2");//TUESDAY
  let tableBody3_2 = document.querySelector(".tb_3_2");//WEDNESDAY
  let tableBody4_2 = document.querySelector(".tb_4_2");//THURSDAY
  let tableBody5_2 = document.querySelector(".tb_5_2");//FRIDAY
  let tableBody6_2 = document.querySelector(".tb_6_2");//SATURDAY
  let tableBody7_2 = document.querySelector(".tb_7_2");//SUNDAY
  */

  // Create a query against the collection.
  const bookingsByUser = query(collection(firestore, "bookings"), where("week", "==", "Denna Vecka"), orderBy("sort"));
  const querySnapshot = await getDocs(bookingsByUser);

  console.log(querySnapshot);

  querySnapshot.forEach((doc) => {

    console.log(doc.data());

    let day = doc.data().day;
    let endtime = doc.data().endtime;
    let length = doc.data().length;
    let name = doc.data().name;
    let phone = doc.data().phone;
    let table = doc.data().table;
    let time = doc.data().time;
    //Checks if booking is made by member
    const dbref = ref(database, "members");
    let isMember = "NEJ";

      onValue(dbref, (snapshot) => {
        
        let isMember = "NEJ";
        
        const data = snapshot.val();
        const entries = [];

        for (const key in data) {
          const entry = {
            namef: key,
            dataf: data[key]
          };
          entries.push(entry); 
        }

        isMember = "NEJ";

        for (var i = 0; i < entries.length; i++ ){

          let member_phone = entries[i].dataf.phone;

          if(member_phone == phone){
            isMember = "JA";
          }
        }
      });


      var newLine = document.createElement("tr");

      var nameLine = document.createElement("td");
      nameLine.innerText = name;
      
      var phoneLine = document.createElement("td");
      phoneLine.innerText = phone;

      var dayLine = document.createElement("td");
      dayLine.innerText = day;

      var timeLine = document.createElement("td");
      timeLine.innerText = time;

      var endLine = document.createElement("td");
      endLine.innerText = endtime;

      var lengthLine = document.createElement("td");
      lengthLine.innerText = length;

      var tableLine = document.createElement("td");
      tableLine.innerText = table;

      var memberLine = document.createElement("td");
      memberLine.innerText = isMember;

      newLine.appendChild(nameLine);
      newLine.appendChild(phoneLine);
      newLine.appendChild(dayLine);
      newLine.appendChild(timeLine);
      newLine.appendChild(endLine);
      newLine.appendChild(lengthLine);
      newLine.appendChild(tableLine);
      newLine.appendChild(memberLine);
      
      if(day == "Måndag"){
        tableBody1.appendChild(newLine);
      }else if(day == "Tisdag"){
        tableBody2.appendChild(newLine);
      }else if (day == "Onsdag"){
        tableBody3.appendChild(newLine);
      }else if(day == "Torsdag"){
        tableBody4.appendChild(newLine);
      }else if(day == "Fredag"){
        tableBody5.appendChild(newLine);
      }else if(day == "Lördag"){
        tableBody6.appendChild(newLine);
      }else if(day == "Söndag"){
        tableBody7.appendChild(newLine);
      }


  });

  //Display Members
  const dbref2 = ref(database, "members");

  onValue(dbref2, (snapshot) => {

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

      let name = entries[i].dataf.name;
      let phone = entries[i].dataf.phone;
      let last = entries[i].dataf.next;
      let next = entries[i].dataf.last;

      var newLine = document.createElement("tr");

      var nameLine = document.createElement("td");
      nameLine.innerText = name;

      var phoneLine = document.createElement("td");
      phoneLine.innerText = phone;

      var lastLine = document.createElement("td");
      lastLine.innerText = last;

      var nextLine = document.createElement("td");
      nextLine.innerText = next;

      var deleteLine = document.createElement("td");
      deleteLine.innerHTML = "<button id='delete-member' class='delete_member_btn' member_phone_number=" + phone + ">Radera</button>";

      newLine.appendChild(nameLine);
      newLine.appendChild(phoneLine);
      newLine.appendChild(lastLine);
      newLine.appendChild(nextLine);
      newLine.appendChild(deleteLine);

      document.getElementById("pay_tb_1").appendChild(newLine);
    }
  });

  document.getElementById('btnLogOut').addEventListener("click", logout);


  //Adds a delay for the delete buttons to be correctly added
  setTimeout(function() {

    const elements = document.getElementsByClassName('delete_member_btn');
    
    for (let i = 0; i < elements.length; i++){

      elements[i].addEventListener('click', function () {
      remove_member(elements[i].getAttribute('member_phone_number'));
      });
      
    }
    console.log("Elements Loaded");
  }, 1000);

}
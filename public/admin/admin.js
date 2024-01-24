import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js";

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
const Performance = getPerformance(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LcgzkcpAAAAAGBLYci24KiGkfRRYmUbAW58_84W'),
    isTokenAutoRefreshEnabled: true
});


onAuthStateChanged(auth, (user) => {
    if(user){//Logged in
        document.getElementById('Admin-Div').style.display = "block";
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
  console.log("Deleting Member", phoneToDelete);

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

      console.log(entries);



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
    next: next_m,
    last: last_m
  });

  console.log("Member Added");
  window.reload();
}

document.getElementById('btnCreate_member').addEventListener("click", AddMember);


window.onload = () => {

  //Week 1
  var tableBody1 = document.querySelector(".tb_1");//MONDAY
  var tableBody2 = document.querySelector(".tb_2");//TUESDAY
  var tableBody3 = document.querySelector(".tb_3");//WEDNESDAY
  var tableBody4 = document.querySelector(".tb_4");//THURSDAY
  var tableBody5 = document.querySelector(".tb_5");//FRIDAY
  var tableBody6 = document.querySelector(".tb_6");//SATURDAY
  var tableBody7 = document.querySelector(".tb_7");//SUNDAY
  
  /*
  //Week 2
  var tableBody1_2 = document.querySelector(".tb_1_2");//MONDAY
  var tableBody2_2 = document.querySelector(".tb_2_2");//TUESDAY
  var tableBody3_2 = document.querySelector(".tb_3_2");//WEDNESDAY
  var tableBody4_2 = document.querySelector(".tb_4_2");//THURSDAY
  var tableBody5_2 = document.querySelector(".tb_5_2");//FRIDAY
  var tableBody6_2 = document.querySelector(".tb_6_2");//SATURDAY
  var tableBody7_2 = document.querySelector(".tb_7_2");//SUNDAY
  */

  const dbref = ref(database, "admin");

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
      //Data
      let day = entries[i].dataf.day;
      let endtime = entries[i].dataf.endtime;
      let length = entries[i].dataf.length;
      let name = entries[i].dataf.name;
      let phone = entries[i].dataf.phone;
      let table = entries[i].dataf.table;
      let time = entries[i].dataf.time;

      const dbref = ref(database, "members");

      onValue(dbref, (snapshot) => {

        const data = snapshot.val();
        const entries2 = [];

        for (const key in data) {
          const entry = {
              namef: key,
              dataf: data[key]
            };
          entries2.push(entry); 
        }


        let isMember = "NEJ";

        for (var i = 0; i < entries2.length; i++ ){

          let key = entries2[i].namef;
          let data = entries2[i].dataf.phone;

      

          if(data == phone){
            isMember = "JA";
          }

      
        }

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

        var weekLine = document.createElement("td");
        weekLine.innerText = "none";

        var memberLine = document.createElement("td");
        memberLine.innerText = isMember;

        newLine.appendChild(nameLine);
        newLine.appendChild(phoneLine);
        newLine.appendChild(dayLine);
        newLine.appendChild(timeLine);
        newLine.appendChild(endLine);
        newLine.appendChild(lengthLine);
        newLine.appendChild(tableLine);
        //newLine.appendChild(weekLine);
        newLine.appendChild(memberLine);

        if(!table.includes("_c")){
          if(day == "mon"){
            tableBody1.appendChild(newLine);
          }else if(day == "tis"){
            tableBody2.appendChild(newLine);
          }else if (day == "ons"){
            tableBody3.appendChild(newLine);
          }else if(day == "tor"){
            tableBody4.appendChild(newLine);
          }else if(day == "fre"){
            tableBody5.appendChild(newLine);
          }else if(day == "lor"){
            tableBody6.appendChild(newLine);
          }else if(day == "son"){
            tableBody7.appendChild(newLine);
          }
        }

      });
    }
  });











  //Add Members

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
      let last = entries[i].dataf.last;
      let next = entries[i].dataf.next;

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


/*window.onload = () => {

    const membersArr = [];
    var memberStatus = false;

    //MEMBERS TABLE
    database.ref("members").on("child_added", function (snapshot) {
      var members = snapshot.val();
      var tablebody_m = document.querySelector(".pay_tb_1");//Table Members
      var newRow = document.createElement("tr");
      
      //CREATES THE ELEMTS IN THE TABLE
      var m_nameCell = document.createElement("td");
      var m_phoneCell = document.createElement("td");
      var m_nextCell = document.createElement("td");
      var m_lastCell = document.createElement("td");
      var m_removeCell = document.createElement("td");

      var m_removeLink = document.createElement("a");
        m_removeLink.style.color = "#ff0000";
        m_removeLink.style.textDecoration = "underline";
        m_removeLink.className = "removeMember";
        m_removeLink.textContent = "Ta Bort";

      var expDate = new Date(members.last);

      if(expDate >= new Date()){

        m_nameCell.textContent = members.name;
        m_phoneCell.textContent = members.phone;
        m_nextCell.textContent = members.next;
        m_lastCell.textContent = members.last;
        m_removeLink.onclick = function(){remove_member(members.phone)};

        membersArr.push(members.phone);

        //PREPARING FOR ADDING TO NEW ROW OF TABLE
        newRow.appendChild(m_nameCell);
        newRow.appendChild(m_phoneCell);
        newRow.appendChild(m_nextCell);
        newRow.appendChild(m_lastCell);
        newRow.appendChild(m_removeCell);
        m_removeCell.appendChild(m_removeLink);

        //ADDS IT TO THE TABLE
        tablebody_m.appendChild(newRow);
}*/







/*

<script>


        //MEMBERS TABLE
        database.ref("members").on("child_added", function (snapshot) {
            var members = snapshot.val();
            var tablebody_m = document.querySelector(".pay_tb_1");//Table Members
            var newRow = document.createElement("tr");
            
            //CREATES THE ELEMTS IN THE TABLE
            var m_nameCell = document.createElement("td");
            var m_phoneCell = document.createElement("td");
            var m_nextCell = document.createElement("td");
            var m_lastCell = document.createElement("td");
            var m_removeCell = document.createElement("td");

            var m_removeLink = document.createElement("a");
              m_removeLink.style.color = "#ff0000";
              m_removeLink.style.textDecoration = "underline";
              m_removeLink.className = "removeMember";
              m_removeLink.textContent = "Ta Bort";

            var expDate = new Date(members.last);

            if(expDate >= new Date()){

              m_nameCell.textContent = members.name;
              m_phoneCell.textContent = members.phone;
              m_nextCell.textContent = members.next;
              m_lastCell.textContent = members.last;
              m_removeLink.onclick = function(){remove_member(members.phone)};

              membersArr.push(members.phone);

              //PREPARING FOR ADDING TO NEW ROW OF TABLE
              newRow.appendChild(m_nameCell);
              newRow.appendChild(m_phoneCell);
              newRow.appendChild(m_nextCell);
              newRow.appendChild(m_lastCell);
              newRow.appendChild(m_removeCell);
              m_removeCell.appendChild(m_removeLink);

              //ADDS IT TO THE TABLE
              tablebody_m.appendChild(newRow);

            }else{
              //DELETES EXPIRED NODES

              //CALCUTE PREVIUS MONTH
              // Create a new Date object
              var currentDate = new Date();

              // Get the year and month
              var year = currentDate.getFullYear();
              var month = currentDate.getMonth();

              // Format the date as "YYYY-MM"
              var formattedDate = year + "-" + (month < 10 ? "0" : "") + month;

              if(formattedDate == year + "-00"){
                year = year - 1;
                formattedDate = year + "-12";
              }


              //DELETING NODES
              var database = firebase.database();
              const nodeRef = database.ref('members');

              const substringToMatch = formattedDate;

              // Create a query to find child nodes where the attribute contains the substring
              const query = nodeRef.orderByChild('last').startAt(substringToMatch).endAt(substringToMatch + '\uf8ff');

              query.once('value')
                .then((snapshot) => {
                  snapshot.forEach((childSnapshot) => {
                    // Delete the child node
                    childSnapshot.ref.remove()
                      .then(() => {
                        console.log('Child node deleted:', childSnapshot.key);
                      })
                      .catch((error) => {
                        console.error('Error deleting child node:', error);
                      });
                  });
                })
                .catch((error) => {
                  console.error('Error querying data:', error);
                });
            }
        });

            

        database.ref("admin").on("child_added", function (snapshot) {
          var book = snapshot.val();
        
          var newRow = document.createElement("tr");
        
          var nameCell = document.createElement("td");
          var phoneCell = document.createElement("td");
          var dayCell = document.createElement("td");
          var timeCell = document.createElement("td");
          var endTimeCell = document.createElement("td");
          var lengthCell = document.createElement("td");
          var tableCell = document.createElement("td");
          var WeekCell = document.createElement("td");
          var memberCell = document.createElement("td");
          
          
          nameCell.textContent = book.name;
          phoneCell.textContent = book.phone;
          dayCell.textContent = book.day;
          timeCell.textContent = book.time;
          lengthCell.textContent = book.length;
          var name = book.name;
          var endTime = book.endtime;
          var tableVar = book.table;

          if (endTime == '25'){
            endTimeCell.textContent = '1';
          }else{
            endTimeCell.textContent = book.endtime;
          }

          if (tableVar.endsWith('_c')){
            tableVar = tableVar.replace("_c", "");
            tableCell.textContent = tableVar;
            WeekCell.textContent = 'Nästa';
          }
          else{
            tableCell.textContent = tableVar;
            WeekCell.textContent = 'Denna';
          }

          if (membersArr.includes(book.phone)){
            memberCell.textContent = "JA";
          }
          else{
            memberCell.textContent = "NEJ";
          }
        
          newRow.appendChild(nameCell);
          newRow.appendChild(phoneCell);
          newRow.appendChild(dayCell);
          newRow.appendChild(timeCell);
          newRow.appendChild(endTimeCell);
          newRow.appendChild(lengthCell);
          newRow.appendChild(tableCell);
          newRow.appendChild(WeekCell);
          newRow.appendChild(memberCell);

          if(book.day == 'mon'){
            if(WeekCell.textContent == 'Denna'){
              tableBody1.appendChild(newRow);
            }else {
              tableBody1_2.appendChild(newRow);
            }
          }else if(book.day == 'tis') {
            if(WeekCell.textContent == 'Denna'){
              tableBody2.appendChild(newRow);
            }else {
              tableBody2_2.appendChild(newRow);
            }
          }else if(book.day == 'ons') {
            if(WeekCell.textContent == 'Denna'){
              tableBody3.appendChild(newRow);
            }else {
              tableBody3_2.appendChild(newRow);
            }
          }else if(book.day == 'tor') {
            if(WeekCell.textContent == 'Denna'){
              tableBody4.appendChild(newRow);
            }else {
              tableBody4_2.appendChild(newRow);
            }
          }else if(book.day == 'fre') {
            if(WeekCell.textContent == 'Denna'){
              tableBody5.appendChild(newRow);
            }else {
              tableBody5_2.appendChild(newRow);
            }
          }else if(book.day == 'lor') {
            if(WeekCell.textContent == 'Denna'){
              tableBody6.appendChild(newRow);
            }else {
              tableBody6_2.appendChild(newRow);
            }
          }else if(book.day == 'son') {
            if(WeekCell.textContent == 'Denna'){
              tableBody7.appendChild(newRow);
            }else {
              tableBody7_2.appendChild(newRow);
            }
          }
        });
    </script>


*/
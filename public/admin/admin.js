import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, collection, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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

export async function removeMember(uid){
  const currentDate = new Date();
  //remove isMember tag from userDoc
  await updateDoc(doc(firestore, "users", uid), {
    "isMember": false,
    "memberExpiryDate": currentDate
  });

  let memberArray = [];

  const memberDoc = await getDoc(doc(firestore, "users", "members"));
  for(let i = 0; i < memberDoc.data().members.length; i++){
    if(memberDoc.data().members[i].uid != uid){
      memberArray.push(memberDoc.data().members[i]);
    }
  }

  await updateDoc(doc(firestore, "users", "members"), {
    "members": memberArray
  });
}

const addMember = async () => {
  console.log("Adding New Member...");

  const name = document.getElementById("memberName").value;
  const phone = document.getElementById("memberPhone").value;
  let last = document.getElementById("memberLast").value;
  const length = parseInt(document.getElementById("member_length").value);

  if(phone.length != 10 || name < 2){
    alert("Ogilight Telefon Nummer eller Namn");
    console.log("Data Transaction Cancelled");
    return;
  }
  
  if(last == ""){
    last = new Date();
  }else{
    last = new Date(last);
  }

  const expiryDate = new Date(last.getFullYear(), last.getMonth() + length, last.getDate());

  const membersDoc  = await getDoc(doc(firestore, "users", "members"))

  let membersArray = [];

  //checks if member list is empty
  for (let i = 0; i < membersDoc.data().members.length; i++){
    membersArray.push(membersDoc.data().members[i]);
  }

  const membersUserDocs = query(collection(firestore, "users"), where("phone", "==", phone));
  const querySnapshot = await getDocs(membersUserDocs);
  let memberId;

  if(querySnapshot.empty){

    const generatedDocId =  await generateUniqeDocId();
    memberId = generatedDocId;

    await setDoc(doc(firestore, "users", generatedDocId),{
      "name": name,
      "phone": phone,
      "isMember": true,
      "memberExpiryDate": expiryDate
    });
  }else{
    //adds isMember tag to user Docs
    querySnapshot.forEach( async (document) => {
      memberId = document.id;
      updateDoc(doc(firestore, "users", document.id), {
        "isMember": true,
        "memberExpiryDate": expiryDate
      });
    });
  }

  membersArray.push({
    name: name,
    phone: phone,
    lastDate: last,
    expiryDate: expiryDate,
    uid: memberId
  });

  await updateDoc(doc(firestore, "users", "members"), {
    "members": membersArray
  });

  
  
  console.log("Member Added");
}

document.getElementById('btnCreate_member').addEventListener("click", addMember);
  
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

  //Display Bookings
  /*const bookingsByUser = query(collection(firestore, "bookings"), where("week", "==", "Denna Vecka"), orderBy("sort"), orderBy("time"));
  const unsubscribe = onSnapshot(bookingsByUser, (querySnapshot) => {

    //Clears Current Table
    tableBody1.innerHTML = "";
    tableBody2.innerHTML = "";
    tableBody3.innerHTML = "";
    tableBody4.innerHTML = "";
    tableBody5.innerHTML = "";
    tableBody6.innerHTML = "";
    tableBody7.innerHTML = "";

    querySnapshot.forEach( async (doc) => {

      let isMember = "ERRoR Could Not Read :(";

      let day = doc.data().day;
      let endtime = doc.data().endtime;
      let length = doc.data().length;
      let name = doc.data().name;
      let phone = doc.data().phone;
      let table = doc.data().table;
      let time = doc.data().time;

      //Checks if booking is made by member
      const memberQuery = query(collection(firestore, "users"), where("phone", "==", phone), where("isMember", "==", true))
      const querySnapshot = await getDocs(memberQuery);

      if(!querySnapshot.empty){
        isMember = "JA";
      }else{
        isMember = "NEJ"
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
  });*/

  //Display Members

  const unsub = onSnapshot(doc(firestore, "users", "members"), (doc) => {
    document.getElementById("membersList").innerHTML = "";
    doc.data().members.forEach((member) => {

      const name = member.name;
      const phone = member.phone;
      const uid = member.uid;
      const lastDate = member.lastDate.toDate().toISOString().split('T')[0];
      const expiryDate = member.expiryDate.toDate().toISOString().split('T')[0];;
  
      let newLine = document.createElement("tr");
  
      let nameLine = document.createElement("td");
      nameLine.innerText = name;
  
      let phoneLine = document.createElement("td");
      phoneLine.innerText = phone;
  
      let lastLine = document.createElement("td");
      lastLine.innerText = lastDate;
  
      let expiryLine = document.createElement("td");
      expiryLine.innerText = expiryDate;
  
      let deleteLine = document.createElement("td");
      deleteLine.innerHTML = "<button id='delete-member' class='delete_member_btn' onclick='window.removeMember(" + '"' +  uid + '"' + ")'>Radera</button>";
  
      newLine.appendChild(nameLine);
      newLine.appendChild(phoneLine);
      newLine.appendChild(lastLine);
      newLine.appendChild(expiryLine);
      newLine.appendChild(deleteLine);
  
      document.getElementById("membersList").appendChild(newLine);
  
    });
    
  });
  const membersDoc = await getDoc(doc(firestore, "users", "members"));
  

  document.getElementById('btnLogOut').addEventListener("click", logout);

  //Adds a delay for the delete buttons to be correctly added
  /*setTimeout(function() {

    const elements = document.getElementsByClassName('delete_member_btn');
    
    for (let i = 0; i < elements.length; i++){

      elements[i].addEventListener('click', function () {
      remove_member(elements[i].getAttribute('member_phone_number'));
      });
    }
  }, 1000);*/

}

async function generateUniqeDocId (){
  let generatedID = Math.random().toString(36).slice(2, 15);
  generatedID = "temp_" + generatedID;

  const docSnap = await getDoc(doc(firestore, "users", generatedID));

  if (docSnap.exists()) {
    return generateUniqeDocId();
  }else{
    return(generatedID);
  }
}
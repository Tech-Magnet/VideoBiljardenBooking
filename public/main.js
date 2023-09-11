function checkIfExixt(day, time, table){

  let found = false;
  var CheckTime = time;

    for(i = 0; i < DayArr.length; i++){

      if (DayArr[i] == day && TimeArr[i] == CheckTime && TableArr[i] == table){
        console.log("SAME DATA AS ON FILE");
        found = true;
        return true;
      }
    }

  if (!found){//If not find matching data in the database return false to symbolice that this time is avalibe
    return false;
  }
}



/*WRITE TO DB*/

// Get a reference to the database
var database = firebase.database();
  
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
  var endtime2 = endtime + length;
  


  var extraTime;
  if (day == "mon" || day == "tis" || day == "ons" || day == "tor" || day == "son"){
    extraTime = false;
  }else if(day == "fre" || day == "lor"){
    extraTime = true;
  }
  //adding the suffix to the table entry to symbolice that its for next week
  if(week == 'n'){
    table = table + "_c";
  }

  if (extraTime == false){
    if (time == "13.0" || time == "13.5" || time == "14.0" || time == "14.5" || endtime >= 25){
      alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig");
      console.log("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x01");
      return;
    }
  }else if (extraTime == true){
    if(endtime >= 26){
      alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig");
      console.log("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x02");
      return;
    }
  }

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
var time_t = time;
  for(let i = 0; i < length; i++){
    if(checkIfExixt(day, time_t, table) == true){
      alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig");
      console.log("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x03");
      return;
    }else{
      time_t = time_t + 0.5;
    }
  }

  
    database.ref("admin").push().set({
      name: name,
      phone: phone,
      day: day,
      time: time,
      table: table,
      length: length2,
      endtime: endtime2
    });

    for(var i = 0; i < length; i++){
      // Write the data to the database
      database.ref("booking").push().set({
        name: name,
        phone: phone,
        day: day,
        time: time,
        table: table
      });

      time = time + 0.5;
      console.log(time);
    }
    console.log("DATA INSERTED");
    document.getElementById('Status_p').innerText = 'Bokning tillagd';

    // Clear the input field after submitting
      document.getElementById("txtName").value = "";
      document.getElementById("txtPhone").value = "";
});










/*READ FROM DATABASE*/

// Get a reference to the database
var database = firebase.database();
// Get a reference to the table body
var tableBody = document.querySelector("#bookingTable tbody");

const TimeArr =  [];
const DayArr = [];
const TableArr = [];

// Attach a listener to the "messages" node to get real-time updates
database.ref("booking").on("child_added", function (snapshot) {
  var book = snapshot.val();

  if(book.table == 'Bord_1'){
    var ID_BUILD = "TT_1_" + book.time + "_" + book.day;
    document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
  }else if(book.table == 'Bord_2'){
    var ID_BUILD = "TT_2_" + book.time + "_" + book.day;
    document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
  }else if(book.table == 'Bord_3'){
    var ID_BUILD = "TT_3_" + book.time + "_" + book.day;
    document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
  }else if(book.table == 'Bord_1_c'){
    var ID_BUILD = "TT_1_" + book.time + "_" + book.day + "_c";
    document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
  }else if(book.table == 'Bord_2_c'){
    var ID_BUILD = "TT_2_" + book.time + "_" + book.day + "_c";
    document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
  }else if(book.table == 'Bord_3_c'){
    var ID_BUILD = "TT_3_" + book.time + "_" + book.day + "_c";
    document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
  }

  TimeArr.push(book.time);
  DayArr.push(book.day);
  TableArr.push(book.table);
});
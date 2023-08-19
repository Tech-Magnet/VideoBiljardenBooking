// Function to import specified columns from the table into separate arrays
function importColumnsToArrays(tableId, columnIndices) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName('tr');
  const columnArrays = [];
  // Initialize separate arrays for each specified column
  for (let i = 0; i < columnIndices.length; i++) {
    columnArrays.push([]);
  }
  // Iterate through the rows and extract values for each specified column
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName('td');
    for (let j = 0; j < columnIndices.length; j++) {
      const columnIndex = columnIndices[j];
      if (cells.length > columnIndex) {
        columnArrays[j].push(cells[columnIndex].innerText);
      }
    }
  }
  return columnArrays;
}

function GetArrays(index){
  // Usage example: Importing columns 0, 1, and 2 into separate arrays
  const tableId = 'bookingTable';
  const columnIndices = [0, 1, 2];
  const [arrayColumn0, arrayColumn1, arrayColumn2] = importColumnsToArrays(tableId, columnIndices);

  if(index == 0){
    return arrayColumn0;
  }else if (index == 1){
    return arrayColumn1
  }else if (index == 2){
    return arrayColumn2;
  }
}


function checkIfExixt(day, time, table){
  const arrayColumn0 = GetArrays(0);
  const arrayColumn1 = GetArrays(1);
  const arrayColumn2 = GetArrays(2);

  let found = false;

  for(i = 0; i < arrayColumn0.length; i++){
    if (arrayColumn0[i] == day && arrayColumn1[i] == time && arrayColumn2[i] == table){
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
  var time = document.getElementById("txtTime").value;
  var length = document.getElementById("txtLength").value;
  var table = document.getElementById("txtTable").value;
  var week = document.getElementById('txtWeek').value;
  var endtime = parseInt(time) + parseInt(length);

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
    if (time == "13" || time == "14" || endtime >= 25){
      alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x01");
      return;
    }
  }else if (extraTime == true){
    if(endtime >= 26){
      alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x02");
      return;
    }
  }


  if(checkIfExixt(day, time, table) == true){
   alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x03");
   return;
  }else if(checkIfExixt(day, time, table) == false){
    database.ref("admin").push().set({
      name: name,
      phone: phone,
      day: day,
      time: time,
      table: table,
      length: length,
      endtime: endtime
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

      time = time - 1 + 2;
    }
    console.log("DATA INSERTED");
    document.getElementById('Status_p').innerText = 'Bokning tillagd';

    // Clear the input field after submitting
      document.getElementById("txtName").value = "";
      document.getElementById("txtPhone").value = "";
  }
});










/*READ FROM DATABASE*/

// Get a reference to the database
var database = firebase.database();
// Get a reference to the table body
var tableBody = document.querySelector("#bookingTable tbody");

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
    var ID_BUILD = "TT_2_" + book.time + "_" + book.day + "_c";
    document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
  }else if(book.table == 'Bord_2_c'){
    var ID_BUILD = "TT_2_" + book.time + "_" + book.day + "_c";
    document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
  }else if(book.table == 'Bord_3_c'){
    var ID_BUILD = "TT_2_" + book.time + "_" + book.day + "_c";
    document.getElementById(ID_BUILD).style.backgroundColor = "#3268a8";
  }
});
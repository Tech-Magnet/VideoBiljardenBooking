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
  console.log("ENDTIME: " + endtime);
  var extraTime;
  if (day == "mon" || day == "tis" || day == "ons" || day == "tor" || day == "son"){
    extraTime = false;
  }else if(day == "fri" || day == "sat"){
    extraTime == true;
  }

  //adding the suffix to the table entry to symbolice that its for next week
  if(week == 'n'){
    table = table + "_c";
  }

  if (extraTime == false && time == "13" || time == "14" || endtime >= 24){
    alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x01");
    return;
  }else if (extraTime == true && endtime >= 25){
    alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x01");
    return;
  }


  if(checkIfExixt(day, time, table) == true){
   alert("Tyverr men tiden du har valt &aumlr inte tillg&aumlnglig Error:0x02");
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
  
  // Create a new table row
  var newRow = document.createElement("tr");

  // Create table cells
  //var nameCell = document.createElement("td");
  //var phoneCell = document.createElement("td");
  var dayCell = document.createElement("td");
  var timeCell = document.createElement("td");
  var tableCell = document.createElement("td");

  // Set the content of the cells with the data from Firebase
  //nameCell.textContent = book.name;
  //phoneCell.textContent = book.phone;
  dayCell.textContent = book.day;
  timeCell.textContent = book.time;
  tableCell.textContent = book.table;

  // Append the cells to the row
  //newRow.appendChild(nameCell);
  //newRow.appendChild(phoneCell);
  newRow.appendChild(dayCell);
  newRow.appendChild(timeCell);
  newRow.appendChild(tableCell);

  // Append the row to the table body
  tableBody.appendChild(newRow);
  Start();
});


function Start(){

  //console.log("Start")
  const arrayColumn0 = GetArrays(0);
  const arrayColumn1 = GetArrays(1);
  const arrayColumn2 = GetArrays(2);
  //console.log(arrayColumn0);
  //console.log(arrayColumn1);
  //console.log(arrayColumn2);

  for (i = 0; i < arrayColumn2.length; i++){
    if(arrayColumn2[i] == "Bord_1"){
      if(arrayColumn0[i] == "son"){//SUNDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_sun";
        //console.log(ID_BUILD);
        
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "mon"){//MONDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_mon";
        //console.log(ID_BUILD);
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tis"){//TUESDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_tue";
        //console.log(ID_BUILD);
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "ons"){//WEDNESDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_wed";
        //console.log(ID_BUILD);
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tor"){//THURSDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_thu";
        //console.log(ID_BUILD);
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "fre"){//FRIDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_fri";
        //console.log(ID_BUILD);
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "lor"){//SATURDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_sat";
        //console.log(ID_BUILD);
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }
    }else if(arrayColumn2[i] == "Bord_2"){
      if(arrayColumn0[i] == "son"){//SUNDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_sun";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "mon"){//MONDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_mon";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tis"){//TUESDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_tue";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "ons"){//WEDNESDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_wed";
        console.log(document.getElementById('TT_NEW_13_wed_c').style.backgroundColor);
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tor"){//THURSDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_thu";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "fre"){//FRIDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_fri";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "lor"){//SATURDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_sat";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }
    }else if(arrayColumn2[i] == "Bord_2_c"){
      if(arrayColumn0[i] == "son"){//SUNDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_sun_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "mon"){//MONDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_mon_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tis"){//TUESDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_tue_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "ons"){//WEDNESDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_wed_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tor"){//THURSDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_thu_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "fre"){//FRIDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_fri_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "lor"){//SATURDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_sat_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }
    }else if(arrayColumn2[i] == "Bord_1_c"){
      if(arrayColumn0[i] == "son"){//SUNDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_sun_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "mon"){//MONDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_mon_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tis"){//TUESDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_tue_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "ons"){//WEDNESDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_wed_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "tor"){//THURSDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_thu_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "fre"){//FRIDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_fri_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == "lor"){//SATURDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_sat_c";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }
    }
  }
}
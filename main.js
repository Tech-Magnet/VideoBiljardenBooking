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
  const tableId = 'dbTable';
  const columnIndices = [0, 1, 2];
  const [arrayColumn0, arrayColumn1, arrayColumn2] = importColumnsToArrays(tableId, columnIndices);

  //console.log("ARRAY DATE: " + arrayColumn0);
  //console.log("ARRAY TIME: " + arrayColumn1);
  //console.log("ARRAY TABL: " + arrayColumn2);

  if(index == 0){
    return arrayColumn0;
  }else if (index == 1){
    return arrayColumn1
  }else if (index == 2){
    return arrayColumn2;
  }
}


function CheckForExistDB(date, time, table){
  const arrayColumn0 = GetArrays(0);
  const arrayColumn1 = GetArrays(1);
  const arrayColumn2 = GetArrays(2);

  let found = false

  for(i = 0; i < arrayColumn0.length; i++){
    if (arrayColumn0[i] == date && arrayColumn1[i] == time && arrayColumn2[i] == table){
      console.log("SAME DATA AS ON FILE");
      found = true;
      return true;
    }
  }
  if (!found){
    //console.log("NOT THE SAME AS ON FILE");
    //console.log("ENTRY: " + date + ", " + time + ", " + table);
    return false;
  }
}

// Function to handle form submission
function CheckSubmit() {
  //importing values from form on index.php
  var name = document.getElementById('txtName').value;
  var phone = document.getElementById('txtPhone').value;
  var date = document.getElementById('txtDate').value;
  var time = document.getElementById('txtTime').value;
  var table = document.getElementById('txtTable').value;
  var length = document.getElementById('txtLength').value;

  if(length <= 0){
    document.getElementById('txtLength').value = 1;
  }

  //console.log("NAME: " + name);
  //console.log("PHONE: " + phone);
  //console.log("DATE: " + date);
  //console.log("TIME: " + time);
  //console.log("TABLE: " + table);
  //console.log("");
  //console.log("");
  //console.log("");

  if(CheckForExistDB(date, time, table)){
    alert("Ledsen men Tiden du har valt är inte tillgänging, var god och välj en annan tid");
  }else if(!CheckForExistDB(date, time, table)){
    //console.log("Submit");
    const form = document.getElementById('myForm');
    form.submit();
  }
}
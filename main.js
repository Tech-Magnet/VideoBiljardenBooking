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

    console.log('Array for Column 0:', arrayColumn0);
    console.log('Array for Column 1:', arrayColumn1);
    console.log('Array for Column 2:', arrayColumn2);


      for(let i = 0; i < arrayColumn2.length; i++){
        if (arrayColumn2[i] == "new"){
          arrayColumn2[i] = 1;
          console.log("ARRAY CONVERION: " + arrayColumn2[i]);
        }
        else if(arrayColumn2[i] == "old"){
          arrayColumn2[i] = 2
          console.log("ARRAY CONVERION: " + arrayColumn2[i]);
        }
        else{
          console.log("ERROR converting table array to bool system");
          console.log("ARRAY CONVERION: " + arrayColumn2[i]);
        }
      }


      if(index == 0){
        return arrayColumn0;
      }else if(index == 1){
        return arrayColumn1;
      }else if(index == 2){
        return arrayColumn2;
      }
}
  
function checkIfBookingExists(date, time, table) {
    const arrayColumn0 = GetArrays(0);
    const arrayColumn1 = GetArrays(1);
    const arrayColumn2 = GetArrays(2);
    for (let i = 0; i < arrayColumn0.length; i++) {
        console.log("ARRAY DATE: " + arrayColumn0[i]);
        console.log("ARRAY TIME: " + arrayColumn1[i]);
        console.log("ARRAY TABLE: " + arrayColumn2[i]);
      if (
        arrayColumn0[i] === date &&
        arrayColumn1[i] === time &&
        arrayColumn2[i] == table
      ) {
        console.log("true");
        return true;
      }else if (
        arrayColumn0[i] == date &&
        arrayColumn1[i] == time &&
        arrayColumn2[i] === table
        )
      {
        console.log("false");
        return false;
      }else{
        console.log("ERROR could not diffrientiate values");
        return true;
      }
    }
  }

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get the input values
    const bookingDate = document.getElementById('txtDate').value;
    const bookingTime = document.getElementById('txtTime').value + ":00";
    const selectedTable = document.querySelector('input[name="txtTable"]:checked').value;
    var table_bool = 0;
    if (selectedTable == "new"){
      table_bool = 1;
      console.log(table_bool);
    }else if(selectedTableValue == "old"){
      table_bool = 2;
      console.log(table_bool);
    }else{
      console.log("ERROR table could not be decided");
      console.log(table_bool);
    }
    console.log("Date: " + bookingDate);
    console.log("Time: " + bookingTime);
    console.log("Table: " + selectedTable);

    if (!selectedTable) {
      alert('Please select a table.');
      return;
    }

    const selectedTableValue = selectedTable.value;

    // Check if the booking already exists in the arrays
    if (checkIfBookingExists(bookingDate, bookingTime, table_bool)) {
      alert('This booking already exists. Please choose a different date, time, or table.');
    } else {

      //Stores open hours in whole hours (NT = Normal Time (Sun-Thu), HT = Holiday Time (Fri - Sat))
      const whitelist_NT = [
        "15:00:00",
        "16:00:00", 
        "17:00:00",
        "18:00:00",
        "19:00:00",
        "20:00:00",
        "21:00:00",
        "22:00:00",
        "23:00:00"
        ];
      const whitelist_HT = [
        "13:00:00",
        "14:00:00",
        "15:00:00",
        "16:00:00",
        "17:00:00",
        "18:00:00",
        "19:00:00",
        "20:00:00",
        "21:00:00",
        "22:00:00",
        "23:00:00",
        "00:00:00"
      ];




      
      //Gets the day for open hours
      var day = new Date(date);
      var weekday = day.getDay();
      console.log(weekday);
      //0 = Sun
      //1 = Mon
      //2 = Tue
      //3 = Wed
      //4 = Thur
      //5 = Fri
      //6 = Sat
      if (weekday == 0 || weekday == 1 || weekday == 2 || weekday == 3 || weekday == 4){
        if (whitelist_NT.includes(time) == true){
          return false;
        }else {
          alert("Tiden du har valt &aumlr inte tillg&aumlnglig, var god och v&aumllj en annan tid, l&aumlgg m&aumlrke till att du kan bara v&aumlja hela timar");
          return true;
        }
      }else if(weekday == 5 || weekday == 6){
        if(whitelist_HT.includes(time) == true){
          return false;
        }else{
          alert("Tiden du har valt &aumlr inte tillg&aumlnglig, var god och v&aumllj en annan tid, l&aumlgg m&aumlrke till att du kan bara v&aumlja hela timar");
          return true;
        }
      }








      // If the booking is unique, you can proceed with your logic to save it to the database or perform any other actions.
      console.log('Booking is unique. Proceed with form submission or other actions.');
      // Your additional logic goes here...
      // For example, you can call a function here to submit the form or handle the data as required.
      const form = document.getElementById('myForm');
      form.submit();
    }
  }
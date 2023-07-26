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
      }
    }
    console.log("false");
    return false;
  }

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get the input values
    const bookingDate = document.getElementById('txtDate').value;
    const bookingTime = document.getElementById('txtTime').value + ":00";
    const selectedTable = document.querySelector('input[name="txtTable"]:checked').value;
    console.log("Date: " + bookingDate);
    console.log("Time: " + bookingTime);
    console.log("Table: " + selectedTable);

    if (!selectedTable) {
      alert('Please select a table.');
      return;
    }

    const selectedTableValue = selectedTable.value;

    // Check if the booking already exists in the arrays
    if (checkIfBookingExists(bookingDate, bookingTime/*, selectedTableValue*/)) {
      alert('This booking already exists. Please choose a different date, time, or table.');
    } else {
      // If the booking is unique, you can proceed with your logic to save it to the database or perform any other actions.
      console.log('Booking is unique. Proceed with form submission or other actions.');
      // Your additional logic goes here...
      // For example, you can call a function here to submit the form or handle the data as required.
      const form = document.getElementById('myForm');
      //form.submit();
    }
  }
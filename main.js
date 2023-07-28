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
function GetArrays(){
  // Usage example: Importing columns 0, 1, and 2 into separate arrays
  const tableId = 'dbTable';
  const columnIndices = [0, 1, 2];
  const [arrayColumn0, arrayColumn1, arrayColumn2] = importColumnsToArrays(tableId, columnIndices);
}







// Function to handle form submission
function CheckSubmit() {
  //importing values from form on index.php
  var name = document.getElementById('txtName').value;
  var phone = document.getElementById('txtPhone').value;
  var date = document.getElementById('txtDate').value;
  var time = document.getElementById('txtTime').value;
  var table = document.getElementById('txtTable').value;
}
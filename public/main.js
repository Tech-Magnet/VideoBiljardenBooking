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
  
  // Write the data to the database
  database.ref("booking").push().set({
    name: name,
    phone: phone,
    day: day
  });
  
  // Clear the input field after submitting
  document.getElementById("txtName").value = "";
  document.getElementById("txtPhone").value = "";
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
  var nameCell = document.createElement("td");
  var phoneCell = document.createElement("td");
  var dayCell = document.createElement("td");

  // Set the content of the cells with the data from Firebase
  nameCell.textContent = book.name;
  phoneCell.textContent = book.phone;
  dayCell.textContent = book.day;

  // Append the cells to the row
  newRow.appendChild(nameCell);
  newRow.appendChild(phoneCell);
  newRow.appendChild(dayCell);

  // Append the row to the table body
  tableBody.appendChild(newRow);
});
/*WRITE TO DB*/
// Get a reference to the database
var database = firebase.database();
  
// Add an event listener to the form submit
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  // Get the data from the input field
  var data = document.getElementById("dataInput").value;
  
  // Write the data to the database
  database.ref("messages").push().set({
    text: data,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  });
  
  // Clear the input field after submitting
  document.getElementById("dataInput").value = "";
});


/*READ FROM DATABASE*/
// Get a reference to the database
var database = firebase.database();
// Get a reference to the table body
var tableBody = document.querySelector("#messagesTable tbody");

// Attach a listener to the "messages" node to get real-time updates
database.ref("messages").on("child_added", function (snapshot) {
  var message = snapshot.val();
  
  // Create a new table row
  var newRow = document.createElement("tr");

  // Create two table cells for "text" and "timestamp"
  var textCell = document.createElement("td");
  var timestampCell = document.createElement("td");

  // Set the content of the cells with the data from Firebase
  textCell.textContent = message.text;
  timestampCell.textContent = new Date(message.timestamp).toLocaleString();

  // Append the cells to the row
  newRow.appendChild(textCell);
  newRow.appendChild(timestampCell);

  // Append the row to the table body
  tableBody.appendChild(newRow);
});
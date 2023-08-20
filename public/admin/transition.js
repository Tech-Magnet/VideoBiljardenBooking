
var database = firebase.database();

var valuesToSearch = ["bord_1", "value2", "value3", "value4", "value5", "value6"];
var combinedSnapshot = {};

// Loop through the values and create and execute a query for each one
var promises = valuesToSearch.map(function(value) {
var query = bookingRef.orderByChild("table").equalTo(value);

  return query.once("value")
    .then(function(snapshot) {
      // Merge the data from each query into combinedSnapshot
      console.log(combinedSnapshot);
      Object.assign(combinedSnapshot, snapshot.val());
      //console.log(combinedSnapshot);
    })
    .catch(function(error) {
      console.error("Error querying data:", error);
    });
});

// Wait for all queries to complete
Promise.all(promises)
  .then(function() {
    // Now, combinedSnapshot contains the data matching any of the specified values
    console.log("Combined data:", combinedSnapshot);
  })
  .catch(function(error) {
    console.error("Error querying data:", error);
  });